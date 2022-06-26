<template>
    <q-page class="page">
        <q-card class="card row no-shadow">
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
            <q-card-section class="col-12 chart-section">
                <chartExample :themeController="themeController" :contentSize="contentSize" :typeSize="typeSize"
                    class="chart" />
            </q-card-section>
            <q-card-section class="col-8 chart-section">
                <AdminPieChart :themeController="themeController" :contentSize="contentSize" :typeSize="typeSize"
                    class="chart" />
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import { useQuasar } from 'Quasar';
import { useLanguageStore } from 'stores/language-store.js';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import data from 'src/languages/i18n.js';
// import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { useThemeStore } from 'stores/theme-store.js';

const chartExample = defineAsyncComponent(() => import('src/components/AdminChart.vue'));
const AdminPieChart = defineAsyncComponent(() => import('src/components/AdminPieChart.vue'));

export default defineComponent({
    name: 'AdminHomePage',
    data() {
        const theme = useThemeStore();
        const contents = ContentStore();
        const types = TypeStore();

        return {
            theme,
            themeController: theme.getTheme,
            contentSize: contents.getLength,
            typeSize: types.getLength,
            $q: useQuasar(),
            user: userStore(),
        };
    },
    setup() {
        const language = useLanguageStore();
        const theme = useThemeStore();

        return {
            blueModel: ref(theme.getTheme),
            lang: ref(language.getLanguage),
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
        chartExample,
        AdminPieChart,
    },
    methods: {
        changeLanguage() {
            this.language.setLanguage(this.lang);
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
.page
    margin: 0
    padding: 0
    .card
        background-color: inherit
        .chart-section
            overflow-y: auto
            .chart
                min-width: 578px
</style>
