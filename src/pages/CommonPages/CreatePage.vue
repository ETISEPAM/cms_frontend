<template>
    <q-page class="page flex flex-center">
        <q-card>
            <q-card-section>
                <q-carousel
                    v-model="slide"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    swipeable
                    animated
                    control-color="white"
                    padding
                    arrows
                    height="300px"
                    class="text-white shadow-1 rounded-borders"
                >
                    <!-- DO NOT DELETE UNTIL YOU FIGURE IT OUT -->

                    <!-- <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                        <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
                        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
                    </template> -->

                    <q-carousel-slide name="title-form" class="column justify-around content-center">
                        <q-form class="form q-gutter-lg flex column justify-around">
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
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CreatePage',
    setup() {
        return {
            slide: ref('title-form'),
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
    width: 100%
    margin: 0

    .q-card
        width: 60%

        .form
            width: 80%
            height: 100%
</style>
