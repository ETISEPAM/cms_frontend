<template>
    <q-list v-if="page === 'contentTypePage'">
        <q-expansion-item
            group="typeExpand"
            v-for="type in typeArray"
            :key="type.id"
            expand-icon="none"
            class="q-py-xs"
            clickable
            ripple
            expand-separator
        >
            <template v-slot:header>
                <q-item-section avatar class="q-pl-sm">
                    <q-avatar color="primary" text-color="white">
                        <!-- {{ type.name.charAt(0) }} -->
                        T
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ type.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ type.description }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-icon name="edit" />
                </q-item-section>
            </template>

            <q-expansion-item
                group="fieldExpand"
                v-for="field in type.fields"
                :key="field.id"
                :header-inset-level="1"
                :content-inset-level="1"
                expand-separator
                class="field-expand"
                popup
            >
                <template v-slot:header>
                    <div class="col row items-center">
                        <q-icon
                            :name="
                                field.dataType === 'String' ? 'text_fields' :
                                    (field.dataType === 'Number' ? 'numbers' :
                                        (field.dataType === 'Boolean' ? 'toggle_off' :
                                            (field.dataType === 'Date' ? 'calendar_today' :
                                                (field.dataType === 'File' ? 'upload_file' : ''))))"
                        />
                        <q-item-section class="col q-pl-sm">
                            <q-item-label>{{ field.label }}</q-item-label>
                        </q-item-section>
                    </div>
                </template>

                <q-card>
                    <q-card-section>
                        <q-list class="fields no-border">
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Label:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.label }}
                                    <q-popup-edit v-model="field.label" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            type="text"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    name="text_fields"
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Data type:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.dataType }}
                                    <q-popup-edit v-model="field.dataType" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            type="text"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    name="text_fields"
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Default value:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.default ? field.default : 'N/A' }}
                                    <q-popup-edit v-model="field.default" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            :type="field.dataType === 'Date' ? 'date' : 'number'"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    :name="field.dataType === 'Date' ? 'calendar_today' : 'numbers'"
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Minimum value:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.minVal ? field.minVal : 'N/A' }}
                                    <q-popup-edit v-model="field.minVal" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            :type="field.dataType === 'Date' ? 'date' : 'number'"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    :name="field.dataType === 'Date' ? 'calendar_today' : 'numbers'"
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Maximum value:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.maxVal ? field.maxVal : 'N/A' }}
                                    <q-popup-edit v-model="field.maxVal" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            :type="field.dataType === 'Date' ? 'date' : 'number'"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    :name="field.dataType === 'Date' ? 'calendar_today' : 'numbers'"
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Is mandatory:</span>
                                </div>
                                <q-btn
                                    flat
                                    dense
                                    class="q-pa-none"
                                >
                                    {{ field.isMandatory == null ? 'N/A' : (field.isMandatory ? 'TRUE' : 'FALSE') }}
                                </q-btn>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-expansion-item>
    </q-list>
    <q-list v-else-if="page === 'contentPage'">
        <q-item v-for="content in contentArray" :key="content.id" class="q-py-md" clickable v-ripple>
            <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                    <!-- {{ content.name.charAt(0) }} -->
                    C
                </q-avatar>
            </q-item-section>

            <q-item-section>
                 <q-item-label>{{ typeArray.find((type) => type.id == content.typeId).name }}</q-item-label>
                 <q-item-label caption lines="1">{{ content.contents }}</q-item-label>
             </q-item-section>

             <q-item-section side>
                 <q-icon name="edit" />
             </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { ContentStore } from 'stores/content-store.js';

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
    },
    data() {
        return {
            tempField: {
                label: null,
                dataType: null,
                default: null,
                minVal: null,
                maxVal: null,
                isMandatory: null,
            },
        };
    },
    async setup() {
        let typeArray;
        let contentArray;

        const contentStore = ContentStore();

        contentStore.$subscribe((mutation) => {
            console.log(mutation.payload);
        }, { detached: true });

        if (!contentStore.typeList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            typeArray = response.data;
            contentStore.typeList = typeArray;
        } else {
            typeArray = contentStore.typeList;
        }

        if (!contentStore.contentList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            contentArray = response.data;
            contentStore.contentList = contentArray;
        } else {
            contentArray = contentStore.contentList;
        }

        return {
            typeArray,
            contentArray,
        };
    },
});
</script>

<style lang="sass" scoped>
.field-expand
    background: rgb(35, 35, 35)
    padding: 0                      // q-px-none is overriden by quasar on utility class

.fields
    .q-item
        display: flex
        justify-content: space-between
        align-items: center
        text-align: right

    .q-item:nth-of-type(2n)
        background: rgb(40, 40, 40)

    span
        padding-right: 2rem
        color: teal
        font-weight: 700
</style>
