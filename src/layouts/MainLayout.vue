<template>
    <q-layout view="lHh Lpr lFf" class="layout">
        <q-header elevated class="q-pl-sm main-header">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    ETIS
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" side="left" elevated :breakpoint="800" show-if-above class="drawer">
            <div class="image col-2 row justify-center self-center q-pt-lg">
                <img :src="theme.getTheme ? '../src/assets/imgs/emakinaDark.png' : '../src/assets/imgs/emakina.png'"
                    alt="EMAKINA Logo" />
            </div>

            <q-list separator padding class="list col rounded-borders flex column justify-between q-pt-lg">
                <div>
                    <q-item clickable v-ripple :active="link === 'home'" @click="link = 'home'" active-class="current"
                        to="/panel" exact>
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].homepage }}</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'type'" @click="link = 'type'" active-class="current"
                        to="/panel/type" exact>
                        <q-item-section avatar>
                            <q-icon name="content_copy" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].contentTypes }}</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'content'" @click="link = 'content'"
                        active-class="current" to="/panel/content" exact>
                        <q-item-section avatar>
                            <q-icon name="notes" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].contents }}</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'client'" @click="link = 'client'"
                        active-class="current" to="/panel/client" exact>
                        <q-item-section avatar>
                            <q-icon name="person_add" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].userOp }}</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'conf'" @click="link = 'conf'" active-class="current"
                        to="/panel/configurations" exact>
                        <q-item-section avatar>
                            <q-icon name="build" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].configuration }}</q-item-section>
                    </q-item>
                </div>
                <div>
                    <q-item clickable v-ripple :active="link === 'logOut'" @click="link = 'logOut'"
                        active-class="current" to="/" exact>
                        <q-item-section avatar>
                            <q-icon name="logout" />
                        </q-item-section>

                        <q-item-section>{{ data[language.getLanguage].logout }}</q-item-section>
                    </q-item>
                </div>
            </q-list>
        </q-drawer>

        <q-page-container class="page-container">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'src/stores/theme-store.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'MainLayout',
    data() {
        return {
            theme: useThemeStore(),
        };
    },
    setup() {
        const leftDrawerOpen = ref(false);

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            link: ref('home'),
            language,
            data,
        };
    },

});
</script>

<style lang="sass" scoped>
@media (max-width: 800px)
    .q-layout
        .main-header
            display: block
            background-color: #000
            height: 8%
            min-height: 55px
            .q-toolbar
                height: 100%

                .q-btn
                    height: 100%

.main-header
    display: none

.drawer
    height: 100%
    min-height: 500px
    display: flex
    flex-direction: column
    flex-wrap: nowrap

    .image
        min-height: 150px

    .list
        height: calc(100% - 174px)
        min-height: 344px

.page-container
    padding: 0
</style>
