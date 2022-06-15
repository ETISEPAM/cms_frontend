<template>
    <q-page class="row wrap justify-center items-start">
        <div class="col-12 row justify-center self-center">
            <img src="~src/assets/imgs/emakinaDark.png" alt="EMAKINA Logo">
        </div>

        <q-card class="col-8 col-md-6 col-lg-4">
            <q-card-section class="col">
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Email" v-model="email" :rules="[val => !!val || 'Field is required']" />
                        <q-input label="Password" type="password" v-model="password"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="button flex justify-end">
                        <q-btn color="primary" label="Login" rounded v-on:click="login"></q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import axios from 'axios';
import { userStore } from 'stores/user-store.js';

const user = userStore();

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            // --- CODE BELOW USES API ---

            // const response = await axios({
            //     method: 'post',
            //     url: 'http://127.0.0.1:3001/api/users/login',
            //     data: {
            //         username: this.email,
            //         password: this.password,
            //     },
            // }).catch((error) => {
            //     console.log(error.response.data.msg);
            // });

            // --- CODE BELOW USES MOCK DATABASE ---
            // POST LOGIN FORM INPUT AND NAVIGATE TO HOMEPAGE IF VALID

            const response = await axios
                .get('http://127.0.0.1:3000/user', { param: { email: this.email, password: this.password } })
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                user.$state = {
                    id: response.data[0].id,
                    firstName: response.data[0].firstName,
                    lastName: response.data[0].lastName,
                    jwToken: response.data[0].jwToken,
                };
                this.$router.push({ path: '/panel' });
            } else {
                alert('invalid');
            }
        },
    },
};

</script>

<style lang="sass" scoped>
</style>
