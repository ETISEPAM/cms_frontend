import { defineStore } from 'pinia';

export const LoginStore = defineStore('login', {
    state: () => ({
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        firstLogin: true,
        jwToken: '',
        bio: '',
        role: 'user',
    }),
});
