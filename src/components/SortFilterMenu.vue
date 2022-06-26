<template>
    <div class="col-2 row justify-end">
        <q-btn icon="search" color="teal" @click="search = true" flat dense />
    </div>
    <q-dialog v-model="search" position="right">
        <q-card>
            <q-linear-progress :value="1" color="pink-13" />

            <q-card-section class="row items-center">
                <div>
                    <div class="text-weight-bold q-pb-sm">Sort</div>
                    <q-select filled clearable use-input hide-selected fill-input dense behavior="menu"
                        label="Choose parameter">
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    {{ data[language.getLanguage].noResults }}
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </div>
            </q-card-section>
            <q-card-section class="row items-center">
                <div>
                    <div class="text-weight-bold q-pb-sm">Filter</div>
                    <q-select filled clearable use-input hide-selected fill-input dense behavior="menu"
                        label="Choose parameter" class="q-pb-xs">
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    {{ data[language.getLanguage].noResults }}
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    <q-input type="text" dense filled />
                </div>
            </q-card-section>
            <q-card-actions align="right" class="q-px-md q-pb-md q-pt-none">
                <q-btn label="Apply" color="pink-13" dense />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'SortFilterMenu',
    data() {
        return {
            search: ref(false),
        };
    },
    setup() {
        return {
            data,
            language,
        };
    },
});
</script>
