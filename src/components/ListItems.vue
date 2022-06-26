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
                <ListHeaders :page="page" :type="type" />
            </template>

            <q-expansion-item group="fieldExpand" v-for="field in type.fields" :key="field.id" :header-inset-level="1"
                :content-inset-level="1" expand-separator
                :class="themeController ? 'field-expand-dark' : 'field-expand-light'" popup
                @hide="
                    fieldsChanged = false;
                "
                @before-show="resetNew(); newField = { ...field }">
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
                        <ItemTables
                            :key="newField"
                            :field="newField"
                            :themeController="themeController"
                            v-on:changed="
                                (modified) => {
                                    fieldsChanged = true;
                                    newField = { ...modified };
                                }
                            "
                        />
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
                                        <q-input type="text" color="primary" v-model="newField.label"
                                            :label="data[language.getLanguage].label" filled clearable dense
                                            class="col-12">
                                            <template v-slot:prepend>
                                                <q-icon name="text_fields" color="teal" />
                                            </template>
                                        </q-input>
                                        <q-select filled clearable v-model="newField.dataType" use-input hide-selected
                                            fill-input dense behavior="menu" input-debounce="0" :options="options"
                                            @filter="filter" :label="data[language.getLanguage].dataType"
                                            color="primary" emit-value map-options class="col-12 q-my-md">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        {{ data[language.getLanguage].noResults }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                            <template v-slot:option="scope">
                                                <q-item v-bind="scope.itemProps">
                                                    <q-icon :name="scope.opt.icon" class="q-pr-sm" />
                                                    <q-item-section>
                                                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                        <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                        <q-input v-if="newField.dataType !== 'Boolean'" :type="
                                            newField.dataType === 'Date' ? 'date' :
                                                (newField.dataType === 'String' || newField.dataType === 'Boolean' ? 'text' : 'number')

                                        " color="primary" :label="data[language.getLanguage].defaultValue" stack-label
                                            :disabled="!newField.dataType" v-model="newField.default" filled clearable
                                            dense class="col-12">
                                            <template v-slot:prepend>
                                                <q-icon :name="iconName(newField.dataType)" color="teal" />
                                            </template>
                                        </q-input>

                                        <q-select v-else filled clearable v-model="newField.default" use-input
                                            hide-selected fill-input dense options-dense input-debounce="0"
                                            :options="boolOptions" color="primary"
                                            :label="data[language.getLanguage].defaultValue" emit-value map-options
                                            class="col-12 q-px-none" behavior="menu">
                                        </q-select>
                                        <q-input :type="newField.dataType === 'Date' ? 'date' : 'number'"
                                            color="primary" :label="
                                                newField.dataType == 'String' ? data[language.getLanguage].minimumLenght :
                                                    (newField.dataType === 'File' ? data[language.getLanguage].minRequired :
                                                        data[language.getLanguage].minValue)
                                            " stack-label v-model="newField.minVal" filled clearable dense
                                            class="col-12 q-py-md">
                                            <template v-slot:prepend>
                                                <q-icon :name="
                                            newField.dataType === 'Date' ? 'calendar_today' :
                                                (!newField.dataType ? 'question_mark' : 'numbers')" color="teal" />
                                            </template>
                                        </q-input>
                                        <q-input :type="newField.dataType === 'Date' ? 'date' : 'number'"
                                            color="primary" :label="
                                                newField.dataType == 'String' ? data[language.getLanguage].maxLenght :
                                                    (newField.dataType === 'File' ? data[language.getLanguage].maxAllowed :
                                                        data[language.getLanguage].maxValue)
                                            " stack-label v-model="newField.maxVal" filled clearable dense
                                            class="col-12">
                                            <template v-slot:prepend>
                                                <q-icon :name="
                                            newField.dataType === 'Date' ? 'calendar_today' :
                                                (!newField.dataType ? 'question_mark' : 'numbers')" color="teal" />
                                            </template>
                                        </q-input>
                                        <q-item class="col-12 form-item row justify-between q-my-md"
                                            :class="themeController ? 'q-item-dark' : 'q-item-light'">
                                            <q-item-section>
                                                <span>
                                                    {{ data[language.getLanguage].isMandatory }}
                                                </span>
                                            </q-item-section>

                                            <q-item-section>
                                                <q-btn-toggle v-model="newField.isMandatory" unelevated spread
                                                    toggle-color="secondary" :options="[
                                                        { label: data[language.getLanguage].yes, value: true },
                                                        { label: data[language.getLanguage].no, value: false },
                                                    ]" />
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="col-12 form-item row justify-between"
                                            :class="themeController ? 'q-item-dark' : 'q-item-light'">
                                            <q-item-section>
                                                <span>
                                                    {{ data[language.getLanguage].isUnique }}
                                                </span>
                                            </q-item-section>

                                            <q-item-section>
                                                <q-btn-toggle v-model="newField.isUnique" unelevated spread
                                                    toggle-color="secondary" :options="[
                                                        { label: data[language.getLanguage].yes, value: true },
                                                        { label: data[language.getLanguage].no, value: false },
                                                    ]" />
                                            </q-item-section>
                                        </q-item>
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
                if (contentsChanged) {
    contentsChanged = false;
}
            ">
            <template v-slot:header>
                <ListHeaders
                    :page="page"
                    :content="content"
                    :themeController="themeController"
                    :typeName="typeStore.list.find((type) => type.id === content.typeId).name"
                />
            </template>

            <q-card>
                <q-card-section>
                    <q-list class="fields no-border">
                        <q-item v-for="field in content.contents" :key="field.id" class="row"
                            :class="themeController ? 'q-item-dark' : 'q-item-light'">
                            <div class="row no-wrap items-center">
                                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                <span>{{ field.label }}</span>
                            </div>
                            <div class="q-pb-sm q-pl-lg cursor-pointer">
                                {{ field.value }}
                                <q-popup-edit v-model="field.value" :cover="false" :offset="[0, 10]" v-slot="scope">
                                    <q-input :type="field.dataType === 'Number' ? 'number' :
                                (field.dataType === 'Date' ? 'date' :
                                    (field.dataType === 'File' ? 'file' : 'text'))"
                                        :clickable="field.dataType === 'Boolean'"
                                        :readonly="field.dataType === 'Boolean'" color="teal" v-model="scope.value"
                                        dense autofocus @keyup.enter="scope.set(); contentsChanged = true;">
                                        <template v-slot:prepend>
                                            <q-icon :name="iconName(field.dataType)" color="teal" />
                                        </template>
                                        <template v-if="field.dataType === 'Boolean'" v-slot:append>
                                            <q-icon name="arrow_circle_left" color="teal" class="cursor-pointer"
                                                @click="scope.value = !scope.value; field.value = !field.value; contentsChanged = true;" />
                                        </template>
                                    </q-input>
                                </q-popup-edit>
                            </div>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-section class="row q-pt-none">
                    <q-btn color="primary" outline
                        v-on:click="contentsChanged ? updateContents(content.id, [...content.contents]) : null"
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
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';
import SortFilterMenu from './SortFilterMenu.vue';
import ListHeaders from './ListHeaders.vue';
import ItemTables from './ItemTables.vue';

const language = useLanguageStore();

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
    },
    components: {
        SortFilterMenu,
        ListHeaders,
        ItemTables,
    },
    data() {
        const theme = useThemeStore();
        return {
            contentStore: ContentStore(),
            theme,
            themeController: theme.getTheme,
            typeStore: TypeStore(),
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
            axios
                .patch(
                    `http://127.0.0.1:3000/content/${id}`,
                    {
                        contents: pContents,
                    },
                )
                .then((response) => {
                    console.log(response.data);
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

.add-field-dark
    min-width: 256px
    .form-item
        background: rgb(35, 35, 35)

        span
            color: teal
            font-weight: 700

.add-field-light
    min-width: 256px
    .form-item
        background: rgb(230, 230, 230)

        span
            color: teal
            font-weight: 700

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
