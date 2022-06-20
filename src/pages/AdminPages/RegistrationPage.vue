<template>
    <q-page class="page">
        <q-card class="q-pa-md inset-shadow row justify-center">
            <q-form @submit="onSubmit" @reset="onReset" class="col col-md-8 col-xl-6 q-py-md q-gutter-sm">
                <q-input filled v-model="user.name" label="Name" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>
                <q-input filled v-model="user.surname" label="Surname" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>
                <q-input filled v-model="user.username" label="Username" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>
                <q-input filled v-model="user.email" label="Email" lazy-rules :rules="
                [val => isValidEmailAddress(val) || 'Please enter a valid email address']"></q-input>
                <q-input filled v-model="user.password" label="Password" type="password"
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>
                <div class="row justify-end">
                    <q-btn label="Save" type="reset" color="primary" @click="onSave()"></q-btn>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
                </div>
            </q-form>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { userStore } from 'stores/user-store.js';

export default defineComponent({
    name: 'RegistrationPage',
    data() {
        return {
            user: {
                name: '',
                surname: '',
                username: '',
                email: '',
                password: '',
                firstLogin: true,
            },
        };
    },
    methods: {
        isValidEmailAddress(email) {
            // eslint-disable-next-line max-len
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        onReset() {
            this.user.name = null;
            this.user.surname = null;
            this.user.username = null;
            this.user.email = null;
            this.user.password = null;
        },
        onSave() {
            axios
                .post(
                    'http://127.0.0.1:3000/user',
                    {
                        firstName: this.user.name,                   // POST INPUT CONTENT TYPE TO DATABASE WITH NO FIELDS BY DEFAULT
                        lastName: this.user.surname,
                        userName: this.user.username,
                        email: this.user.email,
                        password: this.user.password,
                        firstLogin: true,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    userStore.$patch({ user: [...userStore.user, response.data] });   // UPDATE CONTENT STORE TYPE LIST
                })
                .catch((err) => {                                                                   // TO THE BACK-END
                    console.log(err.response.data);
                });
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    width: 100%
    margin: 0
</style>
