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

        <q-drawer v-model="leftDrawerOpen" side="left" elevated :breakpoint="800" show-if-above
            class="drawer"
        >
            <div class="image col-2 row justify-center self-center q-pt-lg">
                <img src="~src/assets/imgs/emakinaDark.png" alt="EMAKINA Logo" />
            </div>

            <q-list separator padding class="list col rounded-borders flex column justify-between q-pt-lg">
                <div>
                    <q-item clickable v-ripple :active="link === 'home'" @click="link = 'home'" active-class="current"
                        to="/panel" exact>
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>

                        <q-item-section>Homepage</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'type'" @click="link = 'type'"
                        active-class="current" to="/panel/type" exact>
                        <q-item-section avatar>
                            <q-icon name="content_copy" />
                        </q-item-section>

                        <q-item-section>Content Types</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'content'" @click="link = 'content'" active-class="current"
                        to="/panel/content" exact>
                        <q-item-section avatar>
                            <q-icon name="notes" />
                        </q-item-section>

                        <q-item-section>Contents</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'conf'" @click="link = 'conf'" active-class="current"
                        to="/panel/configurations" exact>
                        <q-item-section avatar>
                            <q-icon name="build" />
                        </q-item-section>

                        <q-item-section>Configuration</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="link === 'addUsr'" @click="link = 'addUsr'"
                        active-class="current" to="/panel/addUser" exact>
                        <q-item-section avatar>
                            <q-icon name="person_add" />
                        </q-item-section>

                        <q-item-section>Add User</q-item-section>
                    </q-item>
                </div>
                <div>
                    <q-item clickable v-ripple :active="link === 'logOut'" @click="link = 'logOut'"
                        active-class="current" to="/" exact>
                        <q-item-section avatar>
                            <q-icon name="logout" />
                        </q-item-section>

                        <q-item-section>Log Out</q-item-section>
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

export default defineComponent({
    name: 'MainLayout',
    setup() {
        const leftDrawerOpen = ref(false);

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            link: ref('home'),
        };
    },
});
</script>

<style lang="sass" scoped>
@media (min-width: 800px)
    .main-header
        display: none

.main-header
    background-color: #000
    height: 8%
    min-height: 55px
    .q-toolbar
        height: 100%

        .q-btn
            height: 100%

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
