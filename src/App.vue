<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'Quasar';
import { useThemeStore } from 'src/stores/theme-store.js';

export default defineComponent({
    name: 'App',
    setup() {
        const theme = useThemeStore();
        const $q = useQuasar(); // DARK MODE
        $q.dark.set(theme.getTheme);
    },
});
</script>
