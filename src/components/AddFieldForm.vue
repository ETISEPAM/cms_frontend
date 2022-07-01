/**
 * Add Field to Content Type Form Component
 * iconName() setup an icon depends on the field type
 * filter() filters the dropdown menu options depending on provided input
 */
<template>
    <q-input type="text" color="primary" v-model="toAdd.label" :label="data[language.getLanguage].label" filled
        clearable dense class="col-12 q-my-xs" debounce="500"
        :rules="[val => !!val || data[language.getLanguage].fieldRequired]">
        <template v-slot:prepend>
            <q-icon name="text_fields" color="teal" />
        </template>
    </q-input>
    <q-select filled clearable v-model="toAdd.dataType" use-input hide-selected fill-input dense behavior="menu"
        input-debounce="0" :options="options" @filter="filter" :label="data[language.getLanguage].dataType"
        color="primary" emit-value map-options class="col-12 q-my-xs">
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    {{ data[language.getLanguage].noResults }}
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
    <q-input v-if="toAdd.dataType && toAdd.dataType !== 'Boolean' && toAdd.dataType !== 'File'" :type="
        toAdd.dataType === 'Date' ? 'date' :
            (toAdd.dataType === 'String' || toAdd.dataType === 'Boolean' ? 'text' : 'number')

    " color="primary" :label="data[language.getLanguage].defaultValue" stack-label :disabled="toAdd.dataType === null"
        v-model="toAdd.default" filled clearable dense class="col-12 q-my-xs" debounce="500">
        <template v-slot:prepend>
            <q-icon :name="iconName(toAdd.dataType)" color="teal" />
        </template>
    </q-input>

    <q-select v-else-if="toAdd.dataType === 'Boolean'" filled clearable v-model="toAdd.default" use-input hide-selected
        fill-input dense options-dense input-debounce="0" :options="boolOptions" color="primary"
        :label="data[language.getLanguage].defaultValue" emit-value map-options class="col-12 q-px-none q-my-xs"
        behavior="menu">
    </q-select>
    <q-input v-if="toAdd.dataType && toAdd.dataType !== 'Boolean'" :type="toAdd.dataType === 'Date' ? 'date' : 'number'"
        color="primary" :label="
            toAdd.dataType == 'String' ? data[language.getLanguage].minimumLenght :
                (toAdd.dataType === 'File' ? data[language.getLanguage].minRequired :
                    data[language.getLanguage].minValue)
        " stack-label v-model="toAdd.minVal" filled clearable dense class="col-12 q-my-xs" debounce="500">
        <template v-slot:prepend>
            <q-icon :name="
        toAdd.dataType === 'Date' ? 'calendar_today' :
            (!toAdd.dataType ? 'question_mark' : 'numbers')" color="teal" />
        </template>
    </q-input>
    <q-input v-if="toAdd.dataType && toAdd.dataType !== 'Boolean'" :type="toAdd.dataType === 'Date' ? 'date' : 'number'"
        color="primary" :label="
            toAdd.dataType == 'String' ? data[language.getLanguage].maxLenght :
                (toAdd.dataType === 'File' ? data[language.getLanguage].maxAllowed :
                    data[language.getLanguage].maxValue)
        " stack-label v-model="toAdd.maxVal" filled clearable dense class="col-12 q-my-xs" debounce="500">
        <template v-slot:prepend>
            <q-icon :name="
        toAdd.dataType === 'Date' ? 'calendar_today' :
            (!toAdd.dataType ? 'question_mark' : 'numbers')" color="teal" />
        </template>
    </q-input>
    <q-item class="col-12 row justify-between q-my-xs" :class="themeController ? 'form-item-dark' : 'form-item-light'">
        <q-item-section>
            <span>
                {{ data[language.getLanguage].isMandatory }}
            </span>
        </q-item-section>

        <q-item-section>
            <q-btn-toggle v-model="toAdd.isMandatory" unelevated spread toggle-color="secondary" :options="[
                { label: data[language.getLanguage].yes, value: true },
                { label: data[language.getLanguage].no, value: false },
            ]" />
        </q-item-section>
    </q-item>
    <q-item class="col-12 row justify-between q-my-xs" :class="themeController ? 'form-item-dark' : 'form-item-light'">
        <q-item-section>
            <span>
                {{ data[language.getLanguage].isUnique }}
            </span>
        </q-item-section>

        <q-item-section>
            <q-btn-toggle v-model="toAdd.isUnique" unelevated spread toggle-color="secondary" :options="[
                { label: data[language.getLanguage].yes, value: true },
                { label: data[language.getLanguage].no, value: false },
            ]" />
        </q-item-section>
    </q-item>
    <q-item class="col-12 row justify-center q-pa-none q-my-md">
        <q-btn color="primary" :label="data[language.getLanguage].saveIt" type="button" v-on:click="
            try {
    $emit('save', toAdd);
} catch (e) {
    alert = true;
}
        " class="col-9" />
        <AlertDialog :key="alert" :prop="alert" />
    </q-item>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import AlertDialog from 'components/AlertDialog.vue';

const language = useLanguageStore();

export default defineComponent({
    name: 'AddFieldForm',
    props: ['themeController'],
    emits: {
        save: (toAdd) => {
            let valid = false;

            if (toAdd.dataType === 'String') {
                valid = toAdd.minVal <= toAdd.default.length && toAdd.default.length <= toAdd.maxVal;
            } else if (toAdd.dataType === 'File') {
                valid = toAdd.minVal <= toAdd.maxVal;
            } else {
                valid = toAdd.minVal <= toAdd.default && toAdd.default <= toAdd.maxVal;
            }

            if (valid) return true;
            throw new Error('Invalid input');
        },
    },
    data() {
        return {
            toAdd: {
                label: null,
                dataType: null,
                default: null,
                minVal: null,
                maxVal: null,
                isMandatory: null,
                isUnique: null,
            },
            alert: ref(false),
        };
    },
    setup() {
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
            data,
            language,
            boolOptions,
            options,
            filter(val, update) {
                update(() => {
                    options.value = optionTemplate.value
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
        };
    },
    components: {
        AlertDialog,
    },
    methods: {
        iconName(type) {
            return (
                type === 'String' ? 'text_fields'
                    : type === 'Number' ? 'numbers'
                        : type === 'Boolean' ? 'toggle_off'
                            : type === 'Date' ? 'calendar_today'
                                : type === 'File' ? 'upload_file'
                                    : 'help'
            );
        },
    },
});
</script>

<style lang="sass" scoped>
.form-item-dark, .form-item-light
    span
        color: teal
        font-weight: 700

.form-item-dark
    background: rgb(35, 35, 35)

.form-item-light
    background: rgb(230, 230, 230)
</style>
