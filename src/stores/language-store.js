import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
    state: () => ({
        language: 'eng',
    }),
    getters: {
        getLanguage: (state) => state.language,
    },
    actions: {
        setLanguage(payload) {
            this.language = payload;
        },
    },
});
