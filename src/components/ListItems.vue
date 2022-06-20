<template>
    <q-list v-if="page === 'contentTypePage'">
        <q-expansion-item
            group="typeExpand"
            v-for="type in contentStore.typeList"
            :key="type.id"
            expand-icon-class="hidden"
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
                    <q-icon name="edit" class="cursor-pointer"/>
                    <q-popup-proxy cover :breakpoint="500">
                        <q-card class="q-pa-md">
                            <div class="column">
                                <q-input
                                    type="text"
                                    color="teal"
                                    v-model="name"
                                    filled
                                    autofocus
                                    :placeholder="type.name"
                                    @keyup.enter="type.name = name; name = '';"
                                >
                                    <template v-slot:prepend>
                                        <q-icon
                                            name="text_fields"
                                            color="teal"
                                        />
                                    </template>
                                </q-input>

                                <q-input
                                    type="textarea"
                                    color="teal"
                                    v-model="description"
                                    filled
                                    :placeholder="type.description"
                                    @keyup.enter="type.description = description; description = '';"
                                >
                                    <template v-slot:prepend>
                                        <q-icon
                                            name="text_fields"
                                            color="teal"
                                        />
                                    </template>
                                </q-input>
                            </div>
                        </q-card>
                    </q-popup-proxy>
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
                                    <q-popup-edit v-model="field.dataType" :cover="false" :offset="[0, 10]">
                                        <q-select
                                            filled
                                            clearable
                                            v-model="newVal"
                                            use-input
                                            hide-selected
                                            fill-input
                                            dense
                                            behavior="menu"
                                            :options="options"
                                            @filter="filter"
                                            label="Data Type"
                                            emit-value
                                            map-options
                                            @update:model-value="field.dataType = newVal; newVal = '';"
                                            class="col-12 col-sm-6 col-md-4 col-lg-3"
                                            :placeholder="field.dataType"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
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
        <q-expansion-item
            group="contentExpand"
            v-for="content in contentStore.contentList"
            :key="content.id"
            expand-icon-class="hidden"
            class="q-py-xs"
            clickable
            ripple
            expand-separator
        >
            <template v-slot:header>
                <q-item-section avatar class="q-pl-sm">
                    <q-avatar color="primary" text-color="white">
                        C
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ contentStore.typeList.find((type) => type.id === content.typeId).name }}</q-item-label>
                    <q-item-label caption lines="1">{{ content.tag }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-icon name="edit" class="cursor-pointer"/>
                    <q-popup-proxy cover :breakpoint="500">
                        <q-card class="q-pa-md">
                            <div class="column">
                                <q-input
                                    type="text"
                                    color="teal"
                                    v-model="tag"
                                    filled
                                    :placeholder="content.tag"
                                    @keyup.enter="content.tag = tag; tag = '';"
                                >
                                    <template v-slot:prepend>
                                        <q-icon
                                            name="text_fields"
                                            color="teal"
                                        />
                                    </template>
                                </q-input>
                            </div>
                        </q-card>
                    </q-popup-proxy>
                </q-item-section>
            </template>

            <q-card>
                <q-card-section>
                    <q-list class="fields no-border">
                        <q-item v-for="key in Object.keys(content.contents)" :key="key">
                            <div class="row items-center">
                                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                <span>{{ key }}</span>
                            </div>
                            <div class="cursor-pointer">
                                {{ content.contents[key] }}
                                <q-popup-edit v-model="content.contents[key]" :cover="false" :offset="[0, 10]" v-slot="scope">
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
                    </q-list>
                </q-card-section>
            </q-card>
        </q-expansion-item>
    </q-list>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
    },
    data() {
        return {
            contentStore: ContentStore(),
            name: '',
            description: '',
            tag: '',
            newKey: '',
            newVal: '',
        };
    },
    async setup() {
        const contentStore = ContentStore();

        // contentStore.$subscribe(async (mutation, state) => {
        //     console.log(mutation, mutation.events, state);
        //     await axios.patch(
        //         `http://127.0.0.1:3000/contentType/${mutation.events.target.id}`,
        //         {
        //             [mutation.events.key]: mutation.events.newValue,
        //         },
        //     );
        // }, { detached: true });

        if (!contentStore.typeList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                contentStore.typeList = response.data;
            }
        }

        if (!contentStore.contentList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                contentStore.contentList = response.data;
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
        return {
            options,
            filter(val, update) {
                update(() => {
                    options.value = optionTemplate.value
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
        };
    },
});
</script>

<style lang="sass" scoped>
.hidden
    display: none
.field-expand
    background: rgb(35, 35, 35)
    padding: 0                      // q-px-none is overriden by quasar on utility class

.fields
    .q-item
        display: flex
        justify-content: space-between
        align-items: center
        text-align: right

    // .add-field
    //     background: rgb(80, 80, 80)

    .q-item:nth-of-type(2n)
        background: rgb(40, 40, 40)

    span
        padding-right: 2rem
        color: teal
        font-weight: 700
</style>
