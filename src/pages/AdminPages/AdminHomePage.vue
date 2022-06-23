<template>
    <q-page class="page">
        <q-card class="card">
            <q-card-section class="text-h5 text-weight-bold">
                {{ data[language.getLanguage].welcomeText }} {{ user.firstName }}.
            </q-card-section>
            <!-- <ConfirmDialog /> -->
            <q-card-section>
                <div class="row justify-between items-center">
                    <div class="text-caption">
                        {{ data[language.getLanguage].mode }}
                    </div>
                    <q-toggle v-model="blueModel" @update:model-value="lightModeOn" />
                </div>
                <div class="row justify-between items-center">
                    <div class="text-caption">
                        {{ data[language.getLanguage].sysLang }}
                    </div>
                    <div>
                        <q-btn-group push>
                            <q-btn label="EN" v-on:click="changeLanguageEn"></q-btn>
                            <q-btn label="TR" v-on:click="changeLanguageTr"></q-btn>
                            <q-btn label="RUS" v-on:click="changeLanguageRus"></q-btn>
                        </q-btn-group>
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="chart-section">
                <chartExample :themeController="themeController" class="chart"/>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import { useQuasar } from 'Quasar';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
// import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { useThemeStore } from 'stores/theme-store.js';

const chartExample = defineAsyncComponent(() => import('src/components/AdminChart.vue'));

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
        // ConfirmDialog,
        chartExample,
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
