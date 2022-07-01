<template>
    <q-dialog v-model="alert">
        <q-card>
            <q-card-section>
                <div class="text-h6 text-weight-bold">Error</div>
            </q-card-section>

            <q-card-section class="q-pt-none" color="red">
                {{ data[language.getLanguage].alertDialog }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup></q-btn>
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
    name: 'AlertDialog',
    props: ['prop'],
    data() {
        return {
            alert: this.prop,
        };
    },
    setup() {
        return {
            address: ref(''),
            data,
            language,
        };
    },
});
</script>
