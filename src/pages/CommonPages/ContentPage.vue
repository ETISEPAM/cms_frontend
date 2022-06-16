<template>
    <q-page class="page">
        <q-card>
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
                            <ListItems page='contentPage'/>
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

                            <q-carousel-slide name="landing-form">
                                <q-form class="row q-gutter-lg q-pr-sm">
                                    <div class="col-12 row">

                                        <!-- DROPDOWN AUTOCOMPLETE SELECTION MENU -->

                                        <q-select
                                            filled
                                            clearable
                                            v-model="model"
                                            use-input
                                            hide-selected
                                            fill-input
                                            input-debounce="0"
                                            :options="options"
                                            @filter="filter"
                                            label="Content Type"
                                            emit-value
                                            map-options
                                            @update:model-value="content.typeId = model"
                                            class="col-12 col-sm-6 col-md-4 col-lg-3"
                                        >
                                            <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                    No results
                                                </q-item-section>
                                            </q-item>
                                            </template>
                                        </q-select>
                                        <div v-if="!content.typeId" class="col-12 flex items-center">
                                            <q-icon name="error_outline" class="q-pr-sm q-pt-sm" />
                                            <span class="q-pt-sm">Please select a content type.</span>
                                        </div>
                                    </div>

                                    <div v-if="content.typeId" class="col row wrap justify-center q-gutter-md">
                                        <q-field
                                            v-for="field in typeArray.find((type) => type.id === content.typeId).fields"
                                            :key="field.id"
                                            :label="field.label"
                                            stack-label
                                            filled
                                            clearable
                                            class="col-11 col-md-5 col-lg-4"
                                        >
                                            <!--
                                                DYNAMIC FORM GENERATED BELOW BASED ON FIELD DATA TYPE
                                            -->

                                            <template v-if="field.dataType === 'String'" v-slot:before>
                                                <q-icon name="text_fields" />
                                            </template>
                                            <template v-else-if="field.dataType === 'Number'" v-slot:before>
                                                <q-icon name="numbers" />
                                            </template>
                                            <template v-else-if="field.dataType === 'Boolean'" v-slot:before>
                                                <q-icon name="toggle_off" />
                                            </template>
                                            <template v-else-if="field.dataType === 'Date'" v-slot:before>
                                                <q-icon name="calendar_today" />
                                            </template>
                                            <template v-else-if="field.dataType === 'File'" v-slot:before>
                                                <q-icon name="upload_file" />
                                            </template>
                                            <template v-if="field.dataType === 'String'" v-slot:control>
                                                <div class="self-center full-width no-outline">String field</div>
                                            </template>
                                            <template v-else-if="field.dataType === 'Number'" v-slot:control>
                                                <div class="self-center full-width no-outline">Integer field</div>
                                            </template>
                                            <template v-else-if="field.dataType === 'Boolean'" v-slot:control>
                                                <q-btn-toggle
                                                    v-model="content.bool"
                                                    toggle-color="teal"
                                                    :options="[
                                                        {label: 'Yes', value: true},
                                                        {label: 'No', value: false},
                                                    ]"
                                                    clearable
                                                    unelevated
                                                    dense
                                                    flat
                                                    size="md"
                                                />
                                            </template>
                                            <template v-else-if="field.dataType === 'Date'" v-slot:control>
                                                <div class="text-overline">{{ content.date }}</div>
                                                <q-popup-proxy transition-show="scale" transition-hide="scale" :breakpoint="800">
                                                    <q-date v-model="content.date" />
                                                </q-popup-proxy>
                                            </template>
                                            <template v-else-if="field.dataType === 'File'" v-slot:control>
                                                <q-file
                                                    v-model="file"
                                                    label="Select file"
                                                    padding="md"
                                                />
                                            </template>
                                        </q-field>
                                    </div>
                                </q-form>
                            </q-carousel-slide>
                            <q-carousel-slide name="options-form" class="row wrap justify-end items-center q-pa-none">
                                <q-form class="col-12 column no-wrap justify-center self-end q-gutter-sm">
                                    <q-checkbox v-model="content.isPublished" label="Publish" color="teal" left-label />
                                    <q-checkbox v-model="content.dpAuthor" label="Display author information" color="teal" left-label />
                                    <q-checkbox v-model="content.dpDate" label="Display date information" color="teal" left-label />
                                </q-form>
                                <div class="button flex justify-end">
                                    <q-btn color="teal" label="Create" rounded v-on:click="create" />
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
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import ListItems from 'components/ListItems.vue';

const contentStore = ContentStore();

export default defineComponent({
    name: 'ContentPage',
    components: {
        ListItems,
    },
    data() {
        return {
            content: {
                typeId: 0,
                date: '2022/01/01',         // CONTENT DEFAULT VALUES (WILL BE UPDATED)
                bool: false,
                isPublished: false,
                dpAuthor: false,
                dpDate: false,
            },
        };
    },
    setup() {
        const options = ref(
            contentStore.typeList.map((type) => {
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
            typeArray: contentStore.typeList,
            filter(val, update) {
                update(() => {
                    options.value = contentStore.typeList
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
});
</script>

<style lang="sass" scoped>
.page
    height: 100%
    margin: 0

    .q-tab-panel
        padding: 0
</style>
