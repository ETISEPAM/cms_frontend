import { defineStore } from 'pinia';

export const TypeStore = defineStore('type', {
    state: () => ({ list: [] }),
});
