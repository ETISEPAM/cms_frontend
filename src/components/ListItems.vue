/**
 * Displays contents of the list tabs of content, content type, and client management pages
 * sending get and patch requests with axios
 * iconName() setup an icon depends on the field type
 * updateContentHeader() updates the information displayed in content list headers both in the db and in state management
 * updateContents() updates the information displayed in content list item tables headers both in the db and in state management
 * updateTypeFields() updates the information displayed in content type list item tables headers both in the db and in state management
 * addTypeField() adds a new field to the content type whose item table the add field button was pressed under
 * resetNew() resets the new field variable
 * clone() creates a deep copy
 * filter() filters the dropdown menu options depending on provided input
 */
<template>
    <div class="q-pa-sm row justify-between items-center">
        <div class="col-10 q-pl-md row items-center">
            <q-pagination v-model="current" color="teal" :max="10" :max-pages="6" input />
        </div>
        <SortFilterMenu />
    </div>
    <q-list v-if="page === 'contentTypePage'">
        <q-expansion-item group="typeExpand" v-for="type in typeStore.list" :key="type.id" expand-icon-class="hidden"
            class="q-py-xs" clickable ripple @hide="resetNew">
            <template v-slot:header>
                <ListHeaders
                    :page="page"
                    :type="type"
                    v-on:deleted="deleteType(type.id)"
                />
            </template>

            <q-expansion-item group="fieldExpand" v-for="field in type.fields" :key="field.id" :header-inset-level="1"
                :content-inset-level="1" expand-separator
                :class="themeController ? 'field-expand-dark' : 'field-expand-light'" popup @hide="
    fieldsChanged = false;
                " @before-show="resetNew(); newField = { ...field }">
                <template v-slot:header>
                    <div class="col row items-center">
                        <q-icon :name="iconName(field.dataType)" color="teal" />
                        <q-item-section class="col q-pl-sm">
                            <q-item-label>{{ field.label }}</q-item-label>
                        </q-item-section>
                    </div>
                </template>

                <q-card>
                    <q-card-section>
                        <TypeItemTable :key="newField" :field="newField" :themeController="themeController"
                            v-on:changed="
                                (modified) => {
                                    fieldsChanged = true;
                                    newField = { ...modified };
                                }
                            " />
                    </q-card-section>
                    <q-card-section class="row q-pt-none">
                        <q-btn color="primary" :label="data[language.getLanguage].saveIt" type="button" outline
                            v-on:click="fieldsChanged ? (updateTypeFields(type.id, { ...newField }), resetNew) : null"
                            class="col-12" />
                    </q-card-section>
                </q-card>
            </q-expansion-item>
            <q-expansion-item group="fieldExpand" expand-icon-class="hidden" v-model="addField">
                <template v-slot:header>
                    <q-item-section class="row justify-center">
                        <q-btn color="primary" :label="data[language.getLanguage].addField" class="col-12"
                            v-on:click="addField = true">
                            <q-popup-proxy @before-show="resetNew" :breakpoint="4092">
                                <q-card class="row q-pt-sm q-px-sm"
                                    :class="themeController ? 'add-field-dark' : 'add-field-light'">
                                    <q-card-section class="col-12 q-px-sm q-pt-sm">
                                        <div class="text-weight-bold text-h6">
                                            {{ data[language.getLanguage].addingFieldTo }} {{ type.name }}
                                        </div>
                                    </q-card-section>
                                    <q-card-section class="row col-12 q-px-sm q-py-none">
                                        <AddFieldForm :themeController="themeController" v-on:ready="
                                            (toAdd) => {
                                                newField = { ...toAdd };
                                            }
                                        " />
                                        <q-item class="col-12 row justify-center q-pa-none q-my-md">
                                            <q-btn color="primary" :label="data[language.getLanguage].saveIt"
                                                type="button" v-on:click="
    type.fields = [...type.fields, { ...newField }];
addTypeField(type.id, type.fields);
resetNew();
addField = false;
                                                " class="col-9" />
                                        </q-item>
                                    </q-card-section>
                                </q-card>
                            </q-popup-proxy>
                        </q-btn>
                    </q-item-section>
                </template>
            </q-expansion-item>
        </q-expansion-item>
    </q-list>
    <q-list v-else-if="page === 'contentPage'">
        <q-expansion-item group="contentExpand" v-for="content in contentStore.list" :key="content.id"
            expand-icon-class="hidden" class="q-py-xs" clickable ripple expand-separator @hide="
                contentsChanged = false
            " @before-show="
    contentCopy = clone(content.contents)
">
            <template v-slot:header>
                <ListHeaders :key="content.tag" :page="page" :content="{ ...content }" :themeController="themeController"
                    :typeName="typeStore.list.find((type) => type.id === content.typeId).name"
                    v-on:changed="
                        (modified) => {
                            content.tag = [...modified];
                        }
                    "
                    v-on:deleted="deleteContent(content.id)"
                />
            </template>

            <q-card>
                <q-card-section>
                    <ContentItemTable :key="contentCopy" :content="contentCopy" :themeController="themeController"
                        v-on:changed="
                            (modified) => {
                                contentsChanged = true;
                                contentCopy = [...modified];
                            }
                        " />
                </q-card-section>
                <q-card-section class="row q-pt-none">
                    <q-btn color="primary" outline
                        v-on:click="contentsChanged ? updateContents(content.id, [...contentCopy]) : null"
                        class="col-12">
                        {{ data[language.getLanguage].saveIt }}
                    </q-btn>
                </q-card-section>
            </q-card>
        </q-expansion-item>
    </q-list>
    <q-list v-else-if="page === 'clientPage'">
        <q-expansion-item group="userExpand" v-for="user in userStore.list" :key="user.id"
            expand-icon-class="hidden" class="q-py-xs" clickable ripple expand-separator
            @before-show="userChanged = false; newBio = user.bio; logEvent(user.bio);"
        >
            <template v-slot:header>
                <ListHeaders
                    :page="page"
                    :user="{ ...user }"
                    :themeController="themeController"
                    v-on:deleted="deleteUser(user.id)"
                />
            </template>

            <q-card>
                <q-card-section class="q-px-md">
                    <div class="cursor-pointer">
                        {{ newBio }}
                    </div>
                    <q-popup-edit v-model="newBio" :cover="false" v-slot="scope" touch-position
                        @update:model-value="userChanged = true">
                        <q-input type="text" color="teal" v-model="scope.value" dense autofocus autogrow
                            @keyup.enter="scope.set()">
                            <template v-slot:prepend>
                                <q-icon name="text_fields" color="teal" />
                            </template>
                        </q-input>
                    </q-popup-edit>
                </q-card-section>
                <q-card-section class="row q-pt-none">
                    <q-btn color="primary" outline v-on:click="userChanged ? updateBio(user.id, newBio) : null"
                        class="col-12">
                        {{ data[language.getLanguage].saveIt }}
                    </q-btn>
                </q-card-section>
            </q-card>
        </q-expansion-item>
    </q-list>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import { UserStore } from 'stores/user-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';
import SortFilterMenu from './SortFilterMenu.vue';
import ListHeaders from './ListHeaders.vue';
import TypeItemTable from './TypeItemTable.vue';
import AddFieldForm from './AddFieldForm.vue';
import ContentItemTable from './ContentItemTable.vue';

const language = useLanguageStore();

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
    },
    components: {
        SortFilterMenu,
        ListHeaders,
        TypeItemTable,
        AddFieldForm,
        ContentItemTable,
    },
    data() {
        const theme = useThemeStore();
        return {
            userStore: UserStore(),
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            themeController: theme.getTheme,
            userChanged: false,
            contentsChanged: false,
            fieldsChanged: false,
            newField: {
                label: null,
                dataType: null,
                default: null,
                minVal: null,
                maxVal: null,
                isMandatory: null,
                isUnique: null,
            },
            newBio: '',
            contentCopy: ref(null),
            addField: false,
            data,
            language,
        };
    },
    async setup() {
        const contentStore = ContentStore();
        const typeStore = TypeStore();

        if (!typeStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                typeStore.list = response.data;
            }
        }

        if (!contentStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                contentStore.list = response.data;
            }
        }

        const optionTemplate = ref([
            {
                label: 'String',
                value: 'String',
                description: 'Text field.',
                icon: 'text_fields',
            },
            {
                label: 'Number',
                value: 'Number',
                description: 'Number field.',
                icon: 'numbers',
            },
            {
                label: 'Boolean',
                value: 'Boolean',
                description: 'True or false.',
                icon: 'toggle_off',
            },
            {
                label: 'Date',
                value: 'Date',
                description: 'Datepicker.',
                icon: 'calendar_today',
            },
            {
                label: 'File',
                value: 'File',
                description: 'Filepicker.',
                icon: 'upload_file',
            },
        ]);
        const options = ref(optionTemplate.value);
        const boolOptions = [
            {
                label: 'True',
                value: true,
            },
            {
                label: 'False',
                value: false,
            },
        ];
        return {
            options,
            boolOptions,
            filter(val, update) {
                update(() => {
                    options.value = optionTemplate.value
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
            current: ref(1),
        };
    },
    methods: {
        async updateBio(id, pBio) {
            console.log('update bio');
            this.userStore.list.find((user) => user.id === id).bio = pBio;

            axios
                .patch(
                    `http://127.0.0.1:3000/user/${id}`,
                    {
                        bio: pBio,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
        async updateContentHeader(id, pTag) {
            console.log('update type header');
            axios
                .patch(
                    `http://127.0.0.1:3000/content/${id}`,
                    {
                        tag: pTag,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
        async updateContents(id, pContents) {
            console.log('update contents');

            const content = this.contentStore.list.find((element) => element.id === id);

            axios
                .patch(
                    `http://127.0.0.1:3000/content/${id}`,
                    {
                        contents: pContents,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    content.contents = [...response.data.contents];
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
        async updateTypeFields(id, pField) {
            console.log('update types');

            const type = this.typeStore.list.find((element) => element.id === id);
            const fieldList = [...type.fields];
            fieldList[fieldList.indexOf(fieldList.find((field) => field.label === pField.label))] = pField;

            this.fieldsChanged = false;
            axios
                .patch(
                    `http://127.0.0.1:3000/contentType/${id}`,
                    {
                        fields: [...fieldList],
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    type.fields = { ...response.data.fields };
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
        async addTypeField(id, toAdd) {
            console.log('add type');
            // if validation
            axios
                .patch(
                    `http://127.0.0.1:3000/contentType/${id}`,
                    {
                        fields: toAdd,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
        async deleteType(typeId) {
            axios
                .delete(`http://127.0.0.1:3000/contentType/${typeId}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });

            this.typeStore.list = this.typeStore.list.filter((type) => type.id !== typeId);
        },
        async deleteContent(contentId) {
            axios
                .delete(`http://127.0.0.1:3000/content/${contentId}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });

            this.contentStore.list = this.contentStore.list.filter((content) => content.id !== contentId);
        },
        async deleteUser(userId) {
            axios
                .delete(`http://127.0.0.1:3000/user/${userId}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });

            this.userStore.list = this.userStore.list.filter((user) => user.id !== userId);
        },
        resetNew() {
            this.newField.label = null;
            this.newField.dataType = null;
            this.newField.default = null;
            this.newField.minVal = null;
            this.newField.maxVal = null;
            this.newField.isMandatory = null;
            this.newField.isUnique = null;
        },
        iconName(type) {
            return (
                type === 'String' ? 'text_fields'
                    : type === 'Number' ? 'numbers'
                        : type === 'Boolean' ? 'toggle_off'
                            : type === 'Date' ? 'calendar_today'
                                : type === 'File' ? 'upload_file'
                                    : 'help'
            );
        },
        clone(content) {
            const clone = [];
            content.forEach((item) => {
                const temp = {
                    id: item.id,
                    dataType: item.dataType,
                    label: item.label,
                    value: item.value,
                };

                clone.push({ ...temp });
            });

            return clone;
        },
        logEvent(toLog) {
            console.log(toLog);
        },
    },
});
</script>

<style lang="sass" scoped>
.hidden
    display: none

.field-expand-dark
    background: rgb(35, 35, 35)
    padding: 0                      // q-px-none is overriden by quasar on utility class
.field-expand-light
    background: rgb(230, 230, 230)
    padding: 0                      // q-px-none is overriden by quasar on utility class

.add-field-dark, .add-field-light
    min-width: 256px

.fields
    .q-item-dark
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(40, 40, 40)

        span
            color: teal
            font-weight: 700

    .q-item-light
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(240, 240, 240)

        span
            color: teal
            font-weight: 700
</style>
