<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'Quasar';

export default defineComponent({
    name: 'App',
    setup() {
        const $q = useQuasar();
        $q.dark.set(true);
    },
});
</script>
