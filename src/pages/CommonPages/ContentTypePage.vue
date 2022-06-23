<template>
    <q-page class="page">
        <q-card class="card">
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
                            <ListItems page='contentTypePage' />
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
                        <q-form class="row wrap justify-center col q-gutter-lg q-py-lg">
                            <q-input filled v-model="type.name" :label="data[language.getLanguage].title"
                                class="col-9 col-lg-6">
                                <template v-slot:prepend>
                                    <q-icon name="text_fields" />
                                </template>
                            </q-input>
                            <q-input v-model="type.description" filled :label="data[language.getLanguage].description"
                                type="textarea" class="col-9 col-lg-6">
                                <template v-slot:prepend>
                                    <q-icon name="description" />
                                </template>
                            </q-input>
                            <div class="button col-9 col-lg-6 row justify-end">
                                <q-btn color="teal" :label="data[language.getLanguage].create" rounded
                                    v-on:click="create" />
                            </div>
                        </q-form>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ListItems from 'components/ListItems.vue';
import axios from 'axios';
import { TypeStore } from 'stores/type-store';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'TypePage',
    components: {
        ListItems,
    },
    setup() {
        return {
            tab: ref('list'),           // INITIAL TAB ON PAGE
        };
    },
    data() {
        return {
            type: {
                name: '',               // CONTENT TYPE
                description: '',
            },
            typeStore: TypeStore(),
            data,
            language,
        };
    },
    methods: {
        create() {
            axios
                .post(
                    'http://127.0.0.1:3000/contentType',
                    {
                        name: this.type.name,                   // POST INPUT CONTENT TYPE TO DATABASE WITH NO FIELDS BY DEFAULT
                        description: this.type.description,
                        fields: [],
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    this.typeStore.$patch({ list: [...this.typeStore.list, response.data] });   // UPDATE CONTENT STORE TYPE LIST
                })                                                                                  // WITHOUT SENDING ANOTHER GET REQUEST
                .catch((err) => {                                                                   // TO THE BACK-END
                    console.log(err.response.data);
                });

            this.type.name = '';
            this.type.description = '';                     // RESET FORM VALUES
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
    .card
        background-color: inherit

        .q-tab-panel
            padding: 0

            .q-carousel
                min-height: 100%
</style>
