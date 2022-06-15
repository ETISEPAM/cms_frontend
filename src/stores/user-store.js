import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => ({
        id: 0,
        firstName: '',
        lastName: '',
        jwToken: '',
    }),
});
