/**
 * Admin Homepage with AdminPieChart, AdminChart as components
 * changeLanguage() and lightModeOn() as functions toogle language and mode updates
 */
<template>
    <q-page class="page">
        <q-card class="card row justify-center no-shadow">
            <q-card-section class="col-12 col-sm-6 col-md-8 col-lg-9 text-h5 text-weight-bold">
                {{ data[language.getLanguage].welcomeText }} {{ user.firstName }}.
            </q-card-section>
            <!-- <ConfirmDialog /> -->
            <q-card-section class="col-12 col-sm-6 col-md-4 col-lg-3 row justify-center justify-sm-end items-center">
                <q-btn v-model="blueModel" v-on:click="lightModeOn" :icon="themeController ? 'dark_mode' : 'light_mode'"
                    flat />
                <q-select outlined v-model="lang" :options="langOptions" dense behavior="menu" emit-value map-options
                    @update:model-value="changeLanguage">
                    <template v-slot:prepend>
                        <q-icon name="language" class="q-pr-sm" />
                    </template>
                </q-select>
            </q-card-section>
            <Suspense>
                <template #default>
                    <q-card-section class="col-12 row chart-section">
                        <AdminHomeContent :themeController="themeController" />
                    </q-card-section>
                </template>
                <template #fallback>
                    <q-card-section class="col-9">
                        <q-skeleton type="rect" height="350px"/>
                    </q-card-section>
                </template>
            </Suspense>

        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { LoginStore } from 'stores/login-store.js';
import { useQuasar } from 'Quasar';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
// import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { useThemeStore } from 'stores/theme-store.js';
import AdminHomeContent from 'src/components/AdminHomeContent.vue';

export default defineComponent({
    name: 'AdminHomePage',
    data() {
        return {
            $q: useQuasar(),
            user: LoginStore(),
        };
    },
    setup() {
        const language = useLanguageStore();
        const theme = useThemeStore();

        return {
            blueModel: ref(theme.getTheme),
            lang: ref(language.getLanguage),
            theme,
            themeController: theme.getTheme,
            language,
            data,
            langOptions: [
                {
                    label: 'English',
                    value: 'eng',
                },
                {
                    label: 'Türkçe',
                    value: 'tr',
                },
                {
                    label: 'Українська',
                    value: 'ua',
                },
                {
                    label: 'Русский',
                    value: 'rus',
                },
            ],
        };
    },
    components: {
        // ConfirmDialog,
        AdminHomeContent,
    },
    methods: {
        /* set the system language to the choosen one */
        changeLanguage() {
            this.language.setLanguage(this.lang);
        },
        /* toogle between dark and light mode */
        lightModeOn() {
            this.themeController = !this.themeController;
            this.$q.dark.set(this.themeController);
            this.theme.setTheme(this.themeController);
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
    .card
        background-color: inherit
        .chart-section
            overflow-y: auto
</style>
