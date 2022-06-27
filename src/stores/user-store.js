import { defineStore } from 'pinia';

export const UserStore = defineStore('user', {
    state: () => ({ list: [] }),
    getters: {
        getLength: (state) => state.list.length,
    },
});
