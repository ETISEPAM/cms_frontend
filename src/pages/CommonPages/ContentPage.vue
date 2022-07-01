/**
 * Contains two tabs: List -list contents and Create - create new contents
 * deleteTag() - deletes selected tag from the tag input field under the create tab
 * filter() filters the dropdown menu options depending on provided input
 * create() send post requests with axios and update state management
 */
<template>
    <q-page class="page">
        <q-card>
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="list" :label="data[language.getLanguage].list" class="col"></q-tab>
                    <q-tab name="create" :label="data[language.getLanguage].create" class="col"></q-tab>
                </div>
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="q-pt-xs inset-shadow">
                <q-tab-panel name="list">
                    <Suspense>
                        <template #default>
                            <ListItems page='contentPage' />
                        </template>
                        <template #fallback>
                            <q-list>
                                <q-item class="row">
                                    <q-item-section avatar class="row flex-center">
                                        <q-skeleton type="QAvatar" />
                                    </q-item-section>

                                    <q-item-section class="row col-8">
                                        <q-item-label class="row">
                                            <q-skeleton type="text" class="col-6" />
                                        </q-item-label>
                                        <q-item-label caption>
                                            <q-skeleton type="QRange" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </template>
                    </Suspense>
                </q-tab-panel>

                <q-tab-panel name="create">
                    <q-card class="no-box-shadow">
                        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable
                            animated padding arrows :control-color="themeController ? 'white' : 'black'">
                            <!-- DO NOT DELETE UNTIL YOU FIGURE IT OUT -->

                            <!-- <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                                <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
                                <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
                            </template> -->

                            <q-carousel-slide name="landing-form">
                                <q-form class="row q-gutter-lg q-pr-sm q-pb-lg">
                                    <div class="col-12 row">

                                        <!-- DROPDOWN AUTOCOMPLETE SELECTION MENU -->

                                        <q-select filled clearable v-model="model" use-input hide-selected fill-input
                                            input-debounce="0" :options="options" @filter="filter"
                                            :label="data[language.getLanguage].contentType" emit-value map-options
                                            @update:model-value="content.typeId = model"
                                            class="col-12 col-sm-6 col-md-4 col-lg-3">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        {{ data[language.getLanguage].noResults }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                        <div v-if="!content.typeId" class="col-12 flex items-center">
                                            <q-icon name="error_outline" class="q-pr-sm q-pt-sm" />
                                            <span class="q-pt-sm">{{ data[language.getLanguage].selectCT }}</span>
                                        </div>
                                    </div>

                                    <div v-if="content.typeId" class="col row wrap justify-center q-gutter-md">
                                        <div v-for="field in typeStore.list.find((type) => type.id === content.typeId).fields"
                                            :key="field.id" class="col-11 col-md-5 col-lg-4">
                                            <div v-if="field.dataType === 'String'">
                                                <q-input v-model="newContent[field.label]" :label="field.label"
                                                    type="text" clearable filled dense>
                                                    <template v-slot:prepend>
                                                        <q-icon name="text_fields" />
                                                    </template>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'Number'">
                                                <q-input v-model="newContent[field.label]" :label="field.label"
                                                    type="number" clearable filled dense>
                                                    <template v-slot:prepend>
                                                        <q-icon name="numbers" />
                                                    </template>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'Boolean'">
                                                <q-field :label="field.label" stack-label dense class="row q-pa-none">
                                                    <template v-slot:prepend>
                                                        <q-icon name="toggle_off" />
                                                    </template>
                                                    <q-btn-toggle v-model="newContent[field.label]" unelevated
                                                        :text-color="themeController ? 'white' : 'black'"
                                                        toggle-color="primary" :options="[
                                                            { label: data[language.getLanguage].yes, value: true },
                                                            { label: data[language.getLanguage].no, value: false },
                                                        ]" spread dense class="col-12 q-pt-sm" />
                                                </q-field>
                                            </div>
                                            <div v-else-if="field.dataType === 'Date'">
                                                <q-input v-model="newContent[field.label]" :label="field.label"
                                                    clearable filled dense>
                                                    <template v-slot:prepend>
                                                        <q-icon name="calendar_today" />
                                                    </template>
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale"
                                                        :breakpoint="800">
                                                        <q-date v-model="newContent[field.label]" />
                                                    </q-popup-proxy>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'File'">
                                                <q-file v-model="newContent[field.label]" :label="field.label" clearable
                                                    filled dense>,
                                                    <template v-slot:prepend>
                                                        <q-icon name="upload_file" />
                                                    </template>
                                                </q-file>
                                            </div>
                                        </div>
                                    </div>
                                </q-form>
                            </q-carousel-slide>
                            <q-carousel-slide name="options-form" class="row wrap justify-end items-center q-pa-none">
                                <q-form class="col-12 column">
                                    <div class="cursor-pointer q-pb-xs">
                                        <span class="text-center">{{ data[language.getLanguage].tags }}</span>
                                        <q-icon name="add" color="teal" class="q-pl-sm" size="sm" />
                                        <q-popup-edit v-model="newTag" :cover="false" :offset="[0, 10]" v-slot="scope">
                                            <q-input type="text" color="teal" v-model="scope.value" dense autofocus
                                                @keyup.enter="scope.set(); content.tag.push(newTag); newTag = '';">
                                                <template v-slot:prepend>
                                                    <q-icon name="text_fields" color="teal" />
                                                </template>
                                            </q-input>
                                        </q-popup-edit>
                                    </div>
                                    <div class="q-pa-sm" :class="themeController ? 'tag-pool-dark' : 'tag-pool-light'">
                                        <q-list v-if="content.tag.length" class="row">
                                            <q-item v-for="tag in content.tag" :key="tag"
                                                class="row items-center q-pa-sm">
                                                <q-badge color="primary" :label="tag" rounded class="tag-badge" />
                                                <q-btn fab-mini color="red" class="badge-delete q-ml-xs q-pa-xs" dense
                                                    v-on:click="deleteTag(tag)">
                                                    <q-icon name="clear" size="8px" />
                                                </q-btn>
                                            </q-item>
                                        </q-list>
                                        <div v-else>
                                            {{ data[language.getLanguage].noTagsAssigned }}
                                        </div>
                                    </div>
                                </q-form>
                                <q-form class="col-12 column no-wrap self-center q-gutter-sm text-right">
                                    <q-checkbox v-model="content.isPublished"
                                        :label="data[language.getLanguage].publish" color="teal" left-label />
                                    <q-checkbox v-model="content.dpAuthor"
                                        :label="data[language.getLanguage].displayInfo" color="teal" left-label />
                                    <q-checkbox v-model="content.dpDate" :label="data[language.getLanguage].displayDate"
                                        color="teal" left-label />
                                </q-form>
                                <div class="button flex justify-end">
                                    <q-btn color="teal" :label="data[language.getLanguage].create" rounded
                                        v-on:click="
                                            try {
                                                create();
                                            } catch (error) {
                                                // eslint-disable-next-line
                                                alertFunc('Please check that your field input values are consistent with their respective minimum and maximum value requirements.');
                                            }
                                        "
                                    />
                                </div>
                            </q-carousel-slide>
                        </q-carousel>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import ListItems from 'components/ListItems.vue';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';
import { useQuasar } from 'quasar';

const language = useLanguageStore();

export default defineComponent({
    name: 'ContentPage',
    components: {
        ListItems,
    },
    data() {
        const theme = useThemeStore();
        return {
            content: {
                typeId: 0,
                input: [],
                isPublished: false,
                dpAuthor: false,
                dpDate: false,
                tag: [],
            },
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            data,
            language,
            newTag: '',
            newContent: [],
            theme,
            themeController: theme.getTheme,
        };
    },
    setup() {
        const typeStore = TypeStore();

        const options = ref(
            typeStore.list.map((type) => {
                const option = {
                    label: type.name,           // LABEL IS DISPLAYED ON THE DROPDOWN SELECT MENU
                    value: type.id,             // VALUE IS ACTUAL VALUE OF INPUT
                };

                return option;
            }),
        );
        const model = ref(null);

        return {
            q: useQuasar(),
            slide: ref('landing-form'),         // INITIAL SLIDE OF CAROUSEL IN CREATE TAB
            tab: ref('list'),                   // INITIAL TAB IN PAGE
            model,
            options,
            filter(val, update) {
                update(() => {
                    options.value = typeStore.list
                        .map((type) => {
                            const option = {
                                label: type.name,
                                value: type.id,
                            };

                            return option;          // AUTOCOMPLETE FILTERING
                        })
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
        };
    },
    methods: {
        create() {
            const fieldList = this.typeStore.list.find((type) => (type.id === this.model)).fields;
            const keyList = Object.keys(this.newContent);

            let valid = true;
            keyList.forEach((key) => {
                const itemField = fieldList.find((field) => field.label === key);
                console.log(this.newContent[key], itemField.default, itemField.minVal, itemField.maxVal);

                if (itemField.dataType === 'String') {
                    if (this.newContent[key].length <= itemField.minVal || this.newContent[key].length >= itemField.maxVal) {
                        valid = false;
                        console.log('string', this.newContent[key].length, itemField.minVal, itemField.maxVal);
                    }
                } else if (itemField.dataType === 'Number' || itemField.dataType === 'Date') {
                    if (this.newContent[key] <= itemField.minVal || this.newContent[key] >= itemField.maxVal) {
                        valid = false;
                        console.log('number or date', this.newContent[key], itemField.minVal, itemField.maxVal);
                        console.log(this.newContent[key] <= itemField.minVal);
                        console.log(this.newContent[key] >= itemField.maxVal);
                    }
                }

                if (!valid) throw new Error('Invalid input');

                this.content.input.push(
                    {
                        dataType: itemField.dataType,
                        label: itemField.label,
                        value: this.newContent[key],
                    },
                );
            });

            axios
                .post(
                    'http://127.0.0.1:3000/content',
                    {
                        typeId: this.content.typeId,
                        contents: this.content.input,
                        isPublished: this.content.isPublished,
                        showAuthor: this.content.dpAuthor,
                        showDate: this.content.dpDate,
                        tag: this.content.tag,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    this.contentStore.$patch({ list: [...this.contentStore.list, { ...response.data }] });
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

            this.resetNew();
        },
        deleteTag(tag) {
            this.content.tag = this.content.tag.filter((element) => element !== tag);
        },
        resetNew() {
            this.model = ref(null);
            this.content.typeId = 0;
            this.content.input = [];
            this.content.isPublished = false;
            this.content.dpAuthor = false;
            this.content.dpDate = false;
            this.content.tag = [];
            this.newContent = [];
        },
        alertFunc(alertMessage) {
            this.q.dialog({
                title: '<strong>Alert</strong>',
                message: alertMessage,
                html: true,
            }).onOk(() => {
                // console.log('OK')
            }).onCancel(() => {
                // console.log('Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            });
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
    .q-card
        background-color: inherit
        .q-tab-panel
            padding: 0
            .tag-pool-dark
                height: 84px
                background: rgb(20, 20, 20)
                overflow: auto
                .q-item
                    min-height: 0
                .tag-badge
                    padding: 0 12px
                    height: 18px
                .badge-delete
                    min-width: 0
                    min-height: 0
            .tag-pool-light
                height: 84px
                background: rgb(235, 235, 235)
                overflow: auto
                .q-item
                    min-height: 0
                .tag-badge
                    padding: 0 12px
                    height: 18px
                .badge-delete
                    min-width: 0
                    min-height: 0
            .q-placeholder
                max-width: 0
</style>
