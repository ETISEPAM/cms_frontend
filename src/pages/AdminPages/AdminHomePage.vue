<template>
    <q-page class="q-pa-xl">
        {{ data[language.getLanguage].welcomeText }} {{ user.firstName }}.
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'AdminHomePage',
    data() {
        return {
            user: userStore(),
            language,
            data,
        };
    },
});
</script>

<style lang="sass" scoped>
.q-page
    font-size: 3rem
</style>
