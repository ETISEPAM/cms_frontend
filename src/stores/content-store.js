import { defineStore } from 'pinia';

export const ContentStore = defineStore('content', {
    state: () => ({
        typeList: [],
        contentList: [],
    }),
});
