import { defineStore } from 'pinia';

export const ContentStore = defineStore('content', {
    state: () => ({ list: [] }),
    getters: {
        getLength: (state) => state.list.length,
    },
});
