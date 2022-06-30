/**
 * Displays Contents' Properties
 * iconName() setup an icon depends on the field type
 */
<template>
    <q-card-section>
        <q-list class="fields no-border">
            <q-item v-for="item in content" :key="item.label" class="row"
                :class="themeController ? 'q-item-dark' : 'q-item-light'">
                <div class="row no-wrap items-center">
                    <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                    <span>{{ item.label }}</span>
                </div>
                <div class="q-pb-sm q-pl-lg cursor-pointer">
                    {{ item.value }}
                    <q-popup-edit v-model="item.value" :cover="false" v-slot="scope" touch-position>
                        <q-input :type="item.dataType === 'Number' ? 'number' :
                    (item.dataType === 'Date' ? 'date' :
                        (item.dataType === 'File' ? 'file' : 'text'))" :clickable="item.dataType === 'Boolean'"
                            :readonly="item.dataType === 'Boolean'" color="teal" v-model="scope.value" dense autofocus
                            @keyup.enter="scope.set">
                            <template v-slot:prepend>
                                <q-icon :name="iconName(item.dataType)" color="teal" />
                            </template>
                            <template v-if="item.dataType === 'Boolean'" v-slot:append>
                                <q-icon name="arrow_circle_left" color="teal" class="cursor-pointer"
                                    @click="scope.value = !scope.value; item.value = !item.value;" />
                            </template>
                        </q-input>
                    </q-popup-edit>
                </div>
            </q-item>
        </q-list>
    </q-card-section>
    <q-card-section class="row q-pt-none">
        <q-btn color="primary" outline
            v-on:click="$emit('save', content, typeId)"
            class="col-12">
            {{ data[language.getLanguage].saveIt }}
        </q-btn>
    </q-card-section>
</template>

<script>
import { defineComponent } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import { TypeStore } from 'stores/type-store.js';
import data from 'src/languages/i18n.js';

export default defineComponent({
    name: 'TypeItemTable',
    props: ['typeId', 'content', 'themeController'],
    emits: {
        save: (contentFields, idType) => {
            const typeStore = TypeStore();
            let valid = true;

            const fields = [...typeStore.list.find((type) => type.id === idType).fields];

            contentFields.forEach((item) => {
                const field = fields.find((element) => element.label === item.label);
                if (field.dataType === 'String') {
                    if (item.value.length <= field.minVal || item.value.length >= field.maxVal) valid = false;
                } else if (field.dataType === 'Number' || field.dataType === 'Date') {
                    if (item.value <= field.minVal || item.value >= field.maxVal) valid = false;
                }
            });

            console.log(valid, contentFields);
            if (valid) return true;
            throw new Error('Invalid input');
        },
    },
    setup() {
        return {
            data,
            language: useLanguageStore(),
        };
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
