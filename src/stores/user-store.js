import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => ({
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        firstLogin: true,
        jwToken: '',
    }),
});
