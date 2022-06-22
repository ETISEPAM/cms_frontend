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
                                <q-item class="row wrap">
                                    <q-item-section avatar class="row flex-center col-2">
                                        <q-skeleton type="QAvatar" />
                                    </q-item-section>

                                    <q-item-section class="row col-6">
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
                            animated padding arrows>
                            <!-- DO NOT DELETE UNTIL YOU FIGURE IT OUT -->

                            <!-- <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                                <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
                                <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
                            </template> -->

                            <q-carousel-slide name="landing-form">
                                <q-form class="row q-gutter-lg q-pr-sm q-pb-md">
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
                                                <q-input v-model="content.input[field.label]" :label="field.label"
                                                    type="text" clearable filled>
                                                    <template v-slot:before>
                                                        <q-icon name="text_fields" />
                                                    </template>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'Number'">
                                                <q-input v-model="content.input[field.label]" :label="field.label"
                                                    type="number" clearable filled>
                                                    <template v-slot:before>
                                                        <q-icon name="numbers" />
                                                    </template>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'Boolean'">
                                                <q-field filled>
                                                    <template v-slot:before>
                                                        <q-icon name="toggle_off" />
                                                    </template>
                                                    <template v-slot:prepend>
                                                        <div class="text-caption">{{ field.label }}</div>
                                                    </template>
                                                    <q-btn-toggle v-model="content.input[field.label]" color="teal"
                                                        toggle-color="primary" flat :options="[
                                                            { label: 'YES', value: true },
                                                            { label: 'NO', value: false },
                                                        ]" spread />
                                                </q-field>
                                            </div>
                                            <div v-else-if="field.dataType === 'Date'">
                                                <q-input v-model="content.input[field.label]" :label="field.label"
                                                    clearable filled>
                                                    <template v-slot:before>
                                                        <q-icon name="calendar_today" />
                                                    </template>
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale"
                                                        :breakpoint="800">
                                                        <q-date v-model="content.input[field.label]" />
                                                    </q-popup-proxy>
                                                </q-input>
                                            </div>
                                            <div v-else-if="field.dataType === 'File'">
                                                <q-file v-model="content.input[field.label]" :label="field.label"
                                                    clearable filled>,
                                                    <template v-slot:before>
                                                        <q-icon name="upload_file" />
                                                    </template>
                                                </q-file>
                                            </div>
                                        </div>
                                    </div>
                                </q-form>
                            </q-carousel-slide>
                            <q-carousel-slide name="options-form" class="row wrap justify-end items-center q-pa-none">
                                <q-form class="col-12 column no-wrap justify-center self-end q-gutter-sm text-right">
                                    <q-checkbox v-model="content.isPublished"
                                        :label="data[language.getLanguage].publish" color="teal" left-label />
                                    <q-checkbox v-model="content.dpAuthor"
                                        :label="data[language.getLanguage].displayInfo" color="teal" left-label />
                                    <q-checkbox v-model="content.dpDate" :label="data[language.getLanguage].displayDate"
                                        color="teal" left-label />
                                </q-form>
                                <div class="button flex justify-end">
                                    <q-btn color="teal" :label="data[language.getLanguage].create" rounded
                                        v-on:click="create" />
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

const language = useLanguageStore();

export default defineComponent({
    name: 'ContentPage',
    components: {
        ListItems,
    },
    data() {
        return {
            content: {
                typeId: 0,
                input: {},
                isPublished: false,
                dpAuthor: false,
                dpDate: false,
                tag: 'default tag',
            },
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            data,
            language,
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
                    this.contentStore.$patch({ list: [...this.contentStore.list, response.data] });
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

            this.content.typeId = 0;
            this.content.input = {};
            this.content.isPublished = false;
            this.content.dpAuthor = false;
            this.content.dpDate = false;
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    margin: 0

    .q-card
        background-color: inherit

    .q-tab-panel
        padding: 0

        .q-placeholder
            max-width: 0
</style>
