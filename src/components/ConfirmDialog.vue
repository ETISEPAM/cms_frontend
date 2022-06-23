<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn :label="data[language.getLanguage].delete" color="primary" @click="confirm = true" />

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="primary" text-color="white" />
                    <span class="q-ml-sm">{{ data[language.getLanguage].areYouSure }}</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="data[language.getLanguage].no" color="primary" v-close-popup />
                    <q-btn flat :label="data[language.getLanguage].yes" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
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
            confirm: ref(false),
            address: ref(''),
            data,
            language,
        };
    },
});
</script>
