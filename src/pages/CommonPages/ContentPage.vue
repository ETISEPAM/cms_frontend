<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary" narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="list" label="List" class="col"></q-tab>
                    <q-tab name="create" label="Create" class="col"></q-tab>
                </div>
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="q-py-xs inset-shadow">
                <q-tab-panel name="list">
                    <div class="text-h6 q-py-md">CONTENT PAGE</div>
                </q-tab-panel>

                <q-tab-panel name="create">
                    <q-card class="no-box-shadow">
                        <q-card-section>
                            <q-carousel
                                v-model="slide"
                                transition-prev="slide-right"
                                transition-next="slide-left"
                                swipeable
                                animated
                                padding
                                arrows
                            >
                                <!-- DO NOT DELETE UNTIL YOU FIGURE IT OUT -->

                                <!-- <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                                    <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
                                    <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
                                </template> -->

                                <q-carousel-slide name="title-form" class="column justify-around">
                                    <q-form class="form q-gutter-lg q-pr-sm flex column justify-around">
                                        <q-input filled v-model="type.title" label="Title">
                                            <template v-slot:prepend>
                                                <q-icon name="text_fields" />
                                            </template>
                                        </q-input>
                                        <q-input
                                            v-model="type.description"
                                            filled
                                            label="Description"
                                            type="textarea"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon name="description" />
                                            </template>
                                        </q-input>
                                    </q-form>
                                </q-carousel-slide>
                                <q-carousel-slide name="publish-form" class="flex justify-end">
                                    <q-form class="form column no-wrap justify-around items-end">
                                        <q-checkbox v-model="type.isPublished" label="Publish" color="teal" left-label />
                                        <q-checkbox v-model="type.dpAuthor" label="Display author information" color="teal" left-label />
                                        <q-checkbox v-model="type.dpDate" label="Display date information" color="teal" left-label />
                                        <q-checkbox v-model="type.dpSig" label="Display signature" color="teal" left-label />
                                    </q-form>
                                </q-carousel-slide>
                            </q-carousel>
                        </q-card-section>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ContentPage',
    setup() {
        return {
            slide: ref('title-form'),
            tab: ref('list'),
        };
    },
    data() {
        return {
            type: {
                title: '',
                description: '',
                isPublished: false,
                dpAuthor: false,
                dpDate: false,
                dpSig: false,
            },
        };
    },
});
</script>

<style lang="sass" scoped>
.page
    height: 100%
    margin: 0

    .q-tab-panel
        padding: 0
</style>
