import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: true,
    }),
    getters: {
        getTheme: (state) => state.theme,
    },
    actions: {
        setTheme(payload) {
            this.theme = payload;
        },
    },
});
