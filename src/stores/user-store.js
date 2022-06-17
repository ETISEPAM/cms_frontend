import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => ({
        id: 0,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        firstLogin: true,
        jwToken: '',
    }),
});
