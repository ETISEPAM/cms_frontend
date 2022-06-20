<template>
    <q-list v-if="page === 'contentTypePage'">
        <q-expansion-item
            group="typeExpand"
            v-for="type in typeStore.list"
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
                                    @keyup.enter="
                                        type.name = (name ? name : type.name);
                                        type.description = (description ? description : type.description);
                                        updateTypeHeader(type.id, type.name, type.description);
                                        name = '';
                                        description = '';
                                    "
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
                                    @keyup.enter="
                                        type.name = (name ? name : type.name);
                                        type.description = (description ? description : type.description);
                                        updateTypeHeader(type.id, type.name, type.description);
                                        name = '';
                                        description = '';
                                    "
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
                @hide="
                    if (fieldsChanged) {
                        fieldsChanged = false;
                        updateTypeFields(type.id, [...type.fields]);
                    }
                "
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

                            color="teal"
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
                                            @keyup.enter="scope.set(); fieldsChanged = true;"
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
                                            @update:model-value="field.dataType = newVal; newVal = ''; fieldsChanged = true;"
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
                            <q-item v-if="field.dataType !== 'File'">
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Default value:</span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.default }}
                                    <q-popup-edit v-model="field.default" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            v-if="field.dataType !== 'Boolean'"
                                            :type="
                                                field.dataType === 'Date' ? 'date' :
                                                    (field.dataType === 'String' || field.dataType === 'Boolean' ? 'text' : 'number')

                                            "
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set(); fieldsChanged = true;"
                                        >
                                            <template v-slot:prepend>
                                                <q-icon
                                                    :name="
                                                        field.dataType === 'Date' ? 'calendar_today' :
                                                            (field.dataType === 'String' || field.dataType === 'Boolean' ? 'text_fields' :
                                                                'numbers')

                                                    "
                                                    color="teal"
                                                />
                                            </template>
                                        </q-input>

                                        <q-select
                                            v-else
                                            filled
                                            clearable
                                            v-model="field.default"
                                            use-input
                                            hide-selected
                                            fill-input
                                            dense
                                            options-dense
                                            input-debounce="0"
                                            :options="boolOptions"
                                            label="Default value"
                                            emit-value
                                            map-options
                                            @update:model-value="fieldsChanged = true"
                                            class="col-12 col-sm-6 col-md-4 col-lg-3"
                                        >
                                        </q-select>
                                    </q-popup-edit>
                                </div>
                            </q-item>
                            <q-item v-if="field.dataType !== 'Boolean'">
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>
                                        {{
                                            field.dataType == 'String' ? 'Minimum length:' :
                                                (field.dataType === 'File' ? 'Minimum required:' : 'Minimum value:')
                                        }}
                                    </span>
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
                                            @keyup.enter="scope.set(); fieldsChanged = true;"
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
                            <q-item v-if="field.dataType !== 'Boolean'">
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>
                                        {{
                                            field.dataType === 'String' ? 'Maximum length:' :
                                                (field.dataType === 'File' ? 'Maximum allowed:' : 'Maximum value:')
                                        }}
                                    </span>
                                </div>
                                <div class="cursor-pointer">
                                    {{ field.maxVal }}
                                    <q-popup-edit v-model="field.maxVal" :cover="false" :offset="[0, 10]" v-slot="scope">
                                        <q-input
                                            :type="field.dataType === 'Date' ? 'date' : 'number'"
                                            color="teal"
                                            v-model="scope.value"
                                            dense
                                            autofocus
                                            @keyup.enter="scope.set(); fieldsChanged = true;"
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
                                    color="teal"
                                    v-on:click="field.isMandatory = !field.isMandatory; fieldsChanged = true;"
                                >
                                    {{ field.isMandatory }}
                                </q-btn>
                            </q-item>
                            <q-item>
                                <div class="row items-center">
                                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                    <span>Is unique:</span>
                                </div>
                                <q-btn
                                    color="teal"
                                    v-on:click="field.isUnique = !field.isUnique; fieldsChanged = true;"
                                >
                                    {{ field.isUnique }}
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
            v-for="content in contentStore.list"
            :key="content.id"
            expand-icon-class="hidden"
            class="q-py-xs"
            clickable
            ripple
            expand-separator
            @hide="
                if (contentsChanged) {
                    contentsChanged = false;
                    updateContents(content.id, [...content.contents]);
                }
            "
        >
            <template v-slot:header>
                <q-item-section avatar class="q-pl-sm">
                    <q-avatar color="primary" text-color="white">
                        C
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ typeStore.list.find((type) => type.id === content.typeId).name }}</q-item-label>
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
                                    @keyup.enter="
                                        content.tag = (tag ? tag : content.tag);
                                        updateContentHeader(content.id, content.tag);
                                        tag = '';
                                    "
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
                        <q-item v-for="field in content.contents" :key="field.id">
                            <div class="row items-center">
                                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                                <span>{{ field.label }}</span>
                            </div>
                            <div class="cursor-pointer">
                                {{ field.value }}
                                <q-popup-edit v-model="field.value" :cover="false" :offset="[0, 10]" v-slot="scope">
                                    <q-input
                                        :type="field.dataType === 'Number' ? 'number' :
                                            (field.dataType === 'Date' ? 'date' :
                                                (field.dataType === 'File' ? 'file' : 'text'))"
                                        :clickable="field.dataType === 'Boolean'"
                                        :readonly="field.dataType ==='Boolean'"
                                        color="teal"
                                        v-model="scope.value"
                                        dense
                                        autofocus
                                        @keyup.enter="scope.set(); contentsChanged = true;"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon
                                                :name="
                                                    field.dataType === 'String' ? 'text_fields' :
                                                        (field.dataType === 'Number' ? 'numbers' :
                                                            (field.dataType === 'Boolean' ? 'toggle_off' :
                                                                (field.dataType === 'Date' ? 'calendar_today' :
                                                                    (field.dataType === 'File' ? 'upload_file' : ''))))"
                                                color="teal"
                                            />
                                        </template>
                                        <template v-if="field.dataType === 'Boolean'" v-slot:append>
                                            <q-icon
                                                name="arrow_circle_left"
                                                color="teal"
                                                class="cursor-pointer"
                                                @click="scope.value = !scope.value; field.value = !field.value; contentsChanged = true;"
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
import { TypeStore } from 'stores/type-store.js';

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
    },
    data() {
        return {
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            name: '',
            description: '',
            tag: '',
            newVal: '',
            contentsChanged: false,
            fieldsChanged: false,
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
        };
    },
    methods: {
        async updateTypeHeader(id, pName, pDescription) {
            console.log('update type header');
            axios
                .patch(
                    `http://127.0.0.1:3000/contentType/${id}`,
                    {
                        name: pName,
                        description: pDescription,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
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
        async updateTypeFields(id, pFields) {
            console.log('update contents');
            axios
                .patch(
                    `http://127.0.0.1:3000/contentType/${id}`,
                    {
                        fields: pFields,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
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

        &:nth-of-type(2n)
            background: rgb(40, 40, 40)

        div
            min-width: 40%

        span
            padding-right: 2rem
            color: teal
            font-weight: 700
</style>
