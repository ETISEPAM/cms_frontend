<template>
    <q-layout view="lHh Lpr lFf" class="layout">
        <q-drawer
            v-model="leftDrawerOpen"
            side="left"
            elevated
            :breakpoint="605"
            show-if-above
            class="drawer flex justify-center"
        >
            <q-list separator padding class="list rounded-borders">
                <q-item
                    clickable
                    v-ripple
                    :active="link === 'home'"
                    @click="link = 'home'"
                    active-class="current"
                    to="/panel"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>

                    <q-item-section>Homepage</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'create'"
                    @click="link = 'create'"
                    active-class="current"
                    to="/panel/create"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="add" />
                    </q-item-section>

                    <q-item-section>Create Content Type</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'list'"
                    @click="link = 'list'"
                    active-class="current"
                    to="/panel"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="format_list_bulleted" />
                    </q-item-section>

                    <q-item-section>List Content Types</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'conf'"
                    @click="link = 'conf'"
                    active-class="current"
                    to="/panel"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="build" />
                    </q-item-section>

                    <q-item-section>Configuration</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'pref'"
                    @click="link = 'pref'"
                    active-class="current"
                    to="/panel"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="accessibility" />
                    </q-item-section>

                    <q-item-section>Preferences</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'addUsr'"
                    @click="link = 'addUsr'"
                    active-class="current"
                    to="/panel"
                    exact
                >
                    <q-item-section avatar>
                        <q-icon name="person_add" />
                    </q-item-section>

                    <q-item-section>Add User</q-item-section>
                </q-item>
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
.page-container
    padding: 0

    // .current
    //     background-color: teal !important
    //     color: white !important
</style>
