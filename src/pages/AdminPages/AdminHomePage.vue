<template>
    <q-page class="q-pa-xl">
        {{ data[language.getLanguage].welcomeText }} {{ user.firstName }}.
        <ConfirmDialog />
        <div class="q-pa-md q-gutter-y-sm row justify-between">
            <div class="text-h6 q-py-md">{{ data[language.getLanguage].mode }}</div>
            <q-toggle v-model="blueModel" @update:model-value="lightModeOn">
            </q-toggle>
        </div>
        <div class="q-pa-md q-gutter-y-sm row justify-between">
            <div class="text-h6 q-py-md">{{ data[language.getLanguage].sysLang }}</div>
            <div class="q-pa-md text-white">
                <q-btn-group push>
                    <q-btn push label="EN" v-on:click="changeLanguageEn"></q-btn>
                    <q-btn push label="TR" v-on:click="changeLanguageTr"></q-btn>
                    <q-btn push label="RUS" v-on:click="changeLanguageRus"></q-btn>
                </q-btn-group>
            </div>
        </div>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import { useQuasar } from 'Quasar';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { useThemeStore } from 'stores/theme-store.js';

export default defineComponent({
    name: 'AdminHomePage',
    data() {
        const theme = useThemeStore();

        return {
            theme,
            themeController: theme.getTheme,
            $q: useQuasar(),
            user: userStore(),
        };
    },
    setup() {
        const language = useLanguageStore();
        const theme = useThemeStore();

        return {
            blueModel: ref(theme.getTheme),
            model: ref('eng'),
            language,
            data,
        };
    },
    components: {
        ConfirmDialog,
    },
    methods: {
        changeLanguageEn() {
            this.language.setLanguage('eng');
        },
        changeLanguageTr() {
            this.language.setLanguage('tr');
        },
        changeLanguageRus() {
            this.language.setLanguage('rus');
        },
        lightModeOn() {
            this.themeController = !this.themeController;
            this.$q.dark.set(this.themeController);
            this.theme.setTheme(this.themeController);
        },
    },
});
</script>

<style lang="sass" scoped>
.q-page
    font-size: 3rem
</style>
