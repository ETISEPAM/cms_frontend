<template>
    <q-list class="fields no-border">
        <q-item :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <label class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ data[language.getLanguage].label }}</span>
            </label>
            <div class="cursor-pointer">
                {{ modified.label }}
                <q-popup-edit v-model="modified.label" :cover="false" :offset="[0, 10]"
                    v-slot="scope">
                    <q-input type="text" color="teal" v-model="scope.value" dense autofocus
                        @keyup.enter="scope.set(); $emit('changed', modified);">
                        <template v-slot:prepend>
                            <q-icon name="text_fields" color="teal" />
                        </template>
                    </q-input>
                </q-popup-edit>
            </div>
        </q-item>
        <q-item :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ data[language.getLanguage].dataType }}</span>
            </div>
            <div class="cursor-pointer">
                {{ modified.dataType }}
                <q-popup-edit v-model="modified.dataType" :cover="false" :offset="[0, 10]">
                    <q-select filled clearable v-model="newVal" use-input hide-selected fill-input
                        dense behavior="menu" :options="options" @filter="filter"
                        :label="data[language.getLanguage].dataType" emit-value map-options
                        @update:model-value="modified.dataType = newVal; newVal = ''; $emit('changed', modified);">
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
                </q-popup-edit>
            </div>
        </q-item>
        <q-item v-if="modified.dataType !== 'File'" :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ data[language.getLanguage].defaultValue }}</span>
            </div>
            <div class="cursor-pointer">
                {{ modified.default }}
                <q-popup-edit v-model="modified.default" :cover="false" :offset="[0, 10]"
                    v-slot="scope">
                    <q-input v-if="modified.dataType !== 'Boolean'" :type="
                        modified.dataType === 'Date' ? 'date' :
                            (modified.dataType === 'String' || modified.dataType === 'Boolean' ? 'text' : 'number')
                    " color="teal" v-model="scope.value" dense autofocus
                        @keyup.enter="scope.set(); $emit('changed', modified);">
                        <template v-slot:prepend>
                            <q-icon :name="
                                modified.dataType === 'Date' ? 'calendar_today' :
                                    (modified.dataType === 'String' || modified.dataType === 'Boolean' ?
                                        'text_fields' : 'numbers')
                            "
                            color="teal" />
                        </template>
                    </q-input>

                    <q-select v-else filled clearable v-model="modified.default" use-input
                        hide-selected fill-input dense options-dense input-debounce="0"
                        :options="boolOptions" :label="data[language.getLanguage].defaultValue"
                        emit-value map-options @update:model-value="$emit('changed', modified)">
                    </q-select>
                </q-popup-edit>
            </div>
        </q-item>
        <q-item v-if="modified.dataType !== 'Boolean'" :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>
                    {{
                            modified.dataType == 'String' ? data[language.getLanguage].minimumLenght :
                                (modified.dataType === 'File' ? data[language.getLanguage].minRequired :
                                    data[language.getLanguage].minValue)
                    }}
                </span>
            </div>
            <div class="cursor-pointer">
                {{ modified.minVal }}
                <q-popup-edit v-model="modified.minVal" :cover="false" :offset="[0, 10]"
                    v-slot="scope">
                    <q-input :type="modified.dataType === 'Date' ? 'date' : 'number'" color="teal"
                        v-model="scope.value" dense autofocus
                        @keyup.enter="scope.set(); $emit('changed', modified);">
                        <template v-slot:prepend>
                            <q-icon
                                :name="modified.dataType === 'Date' ? 'calendar_today' : 'numbers'"
                                color="teal" />
                        </template>
                    </q-input>
                </q-popup-edit>
            </div>
        </q-item>
        <q-item v-if="modified.dataType !== 'Boolean'" :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>
                    {{
                            modified.dataType === 'String' ? data[language.getLanguage].maxLenght :
                                (modified.dataType === 'File' ? data[language.getLanguage].maxAllowed :
                                    data[language.getLanguage].maxValue)
                    }}
                </span>
            </div>
            <div class="cursor-pointer">
                {{ modified.maxVal }}
                <q-popup-edit v-model="modified.maxVal" :cover="false" :offset="[0, 10]"
                    v-slot="scope">
                    <q-input :type="modified.dataType === 'Date' ? 'date' : 'number'" color="teal"
                        v-model="scope.value" dense autofocus
                        @keyup.enter="scope.set(); $emit('changed', modified);">
                        <template v-slot:prepend>
                            <q-icon
                                :name="modified.dataType === 'Date' ? 'calendar_today' : 'numbers'"
                                color="teal" />
                        </template>
                    </q-input>
                </q-popup-edit>
            </div>
        </q-item>
        <q-item :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ data[language.getLanguage].isMandatory }}</span>
            </div>
            <q-btn-toggle
                v-model="modified.isMandatory"
                unelevated
                toggle-color="secondary"
                :options="[
                    { label: data[language.getLanguage].yes, value: true },
                    { label: data[language.getLanguage].no, value: false },
                ]"
                @update:model-value="$emit('changed', modified)"
            />
        </q-item>
        <q-item :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row items-center q-pb-sm">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ data[language.getLanguage].isUnique }}</span>
            </div>
            <q-btn-toggle
                v-model="modified.isUnique"
                unelevated
                toggle-color="secondary"
                :options="[
                    { label: data[language.getLanguage].yes, value: true },
                    { label: data[language.getLanguage].no, value: false },
                ]"
                @update:model-value="$emit('changed', modified)"
            />
        </q-item>
    </q-list>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'TypeItemTable',
    props: ['field', 'themeController'],
    emits: ['changed'],
    data() {
        return {
            newVal: '',
            modified: { ...this.field },
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
            boolOptions,
            options,
            data,
            language,
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
.fields
    .q-item-dark
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(40, 40, 40)

        span
            color: teal
            font-weight: 700

    .q-item-light
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(240, 240, 240)

        span
            color: teal
            font-weight: 700
</style>
