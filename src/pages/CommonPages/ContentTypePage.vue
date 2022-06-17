<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary" narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="list" label="List" class="col"></q-tab>
                    <q-tab name="create" label="Create" class="col"></q-tab>
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
                        <q-form class="row wrap justify-center col q-gutter-lg q-py-lg">
                            <q-input filled v-model="type.name" label="Title" class="col-9 col-lg-6">
                                <template v-slot:prepend>
                                    <q-icon name="text_fields" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="type.description"
                                filled
                                label="Description"
                                type="textarea"
                                class="col-9 col-lg-6"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="description" />
                                </template>
                            </q-input>
                            <div class="button col-9 col-lg-6 row justify-end">
                                <q-btn color="teal" label="Create" rounded v-on:click="create" />
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
import { ContentStore } from 'stores/content-store.js';
import axios from 'axios';

const contentStore = ContentStore();

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
                    contentStore.$patch({ typeList: [...contentStore.typeList, response.data] });   // UPDATE CONTENT STORE TYPE LIST
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
    .q-card
        background-color: inherit

        .q-tab-panel
            padding: 0

            .q-carousel
                min-height: 100%
</style>
