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
                        <q-dialog v-model="invalid" class="dialog">
                            <q-card class="row content-between q-pa-md">
                                <div class="col-12 row">
                                    <q-icon name="error" class="flex self-center q-pr-md" />
                                    The information you've entered is incorrect, please try again.
                                </div>
                                <div class="col-12 row justify-evenly items-center">
                                    <div>
                                        If the issue persists, contact support at
                                        <span class="phone">+90 507 279 19 19</span>
                                    </div>
                                    <q-card-actions align="right">
                                        <q-btn label="CONFIRM" color="teal" v-close-popup />
                                    </q-card-actions>
                                </div>
                            </q-card>
                        </q-dialog>
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
import { defineComponent, ref } from 'vue';

const user = userStore();

export default defineComponent({
    name: 'LoginPage',
    setup() {
        return {
            invalid: ref(false),
        };
    },
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

            const response = await axios({
                method: 'get',
                url: 'http://127.0.0.1:3000/user',
                params: {
                    email: this.email,
                    password: this.password,
                },
            }).catch((err) => {
                console.log(err);
            });

            if (response.data.length) {
                user.$state = {
                    id: response.data[0].id,
                    firstName: response.data[0].firstName,
                    lastName: response.data[0].lastName,
                    jwToken: response.data[0].jwToken,
                    email: response.data[0].email,
                    password: response.data[0].password,
                };

                if (response.data[0].firstLogin === true) {
                    axios.patch(
                        `http://127.0.0.1:3000/user/${response.data[0].id}`,
                        {
                            firstLogin: false,
                        },
                    );
                    this.$router.push({ path: '/panel/newpassword' });
                } else {
                    this.$router.push({ path: '/panel' });
                }
            } else {
                this.invalid = true;
            }
        },
    },
});

</script>

<style lang="sass" scoped>
.q-card
    min-height: 15%

    .phone
        color: $primary
        text-decoration: underline
</style>
