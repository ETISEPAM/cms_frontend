<template>
    <q-page class="q-pa-xl">
        Welcome to the Admin Panel, {{ user.firstName }}.
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';

export default defineComponent({
    name: 'AdminHomePage',
    data() {
        return {
            user: userStore(),
        };
    },
});
</script>

<style lang="sass" scoped>
.q-page
    font-size: 3rem
</style>
