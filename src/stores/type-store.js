import { defineStore } from 'pinia';

export const TypeStore = defineStore('type', {
    state: () => ({ list: [] }),
    getters: {
        getLength: (state) => state.list.length,
    },
});
