/**
 * Confirmation Dialog for Delete Operations
 * @return {Boolean} confirm - delete if true / cancel the operation if false
 */
<template>
    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" size="sm" />
                <span class="q-ml-sm">{{ data[language.getLanguage].areYouSure }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat :label="data[language.getLanguage].no" color="primary" v-on:click="confirm = false" />
                <q-btn flat :label="data[language.getLanguage].yes" color="primary" v-on:click="confirm = false" />
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
    name: 'ConfirmDialog',
    setup() {
        return {
            confirm: ref(true),
            address: ref(''),
            data,
            language,
        };
    },
});
</script>
