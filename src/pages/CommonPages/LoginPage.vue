<template>
    <q-page class="page row wrap justify-center items-start">
        <div class="col-12 row justify-center self-center">
            <img :src="theme.getTheme ? './imgs/emakinaDark.png' : './imgs/emakina.png'"
                alt="EMAKINA Logo">

        </div>
        <div class="col-12 row justify-center">
            <q-card class="col-8 col-md-6 col-lg-4">
                <q-card-section class="col">
                    <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                        <div>
                            <q-input :label="data[language.getLanguage].email" v-model="email"
                                :rules="[val => !!val || data[language.getLanguage].fieldRequired]" />
                            <q-input :label="data[language.getLanguage].password" type="password" v-model="password"
                                :rules="[val => !!val || data[language.getLanguage].fieldRequired]" />
                            <q-dialog v-model="invalid" class="dialog">
                                <q-card class="row content-between q-pa-md">
                                    <div class="col-12 row">
                                        <q-icon name="error" class="flex self-center q-pr-md" />
                                        {{ data[language.getLanguage].confMessage }}
                                    </div>
                                    <div class="col-12 row items-center">
                                        <div class="q-pt-sm">
                                            {{ data[language.getLanguage].confMessageCon }}
                                            <span class="phone">+90 507 279 19 19</span>
                                        </div>
                                        <div class="col-12 row justify-end">
                                            <q-card-actions>
                                                <q-btn :label="data[language.getLanguage].confButton" color="teal"
                                                    v-close-popup />
                                            </q-card-actions>
                                        </div>
                                    </div>
                                </q-card>
                            </q-dialog>
                        </div>
                        <!-- <div>
                            <vue-recaptcha ref="recaptcha" @expired="onExpired" :sitekey="sitekey">
                            </vue-recaptcha>
                            <button @click="resetRecaptcha">Reset ReCAPTCHA</button>
                        </div> -->
                        <div class="button flex justify-end">
                            <q-btn color="primary" :label="data[language.getLanguage].login" rounded v-on:click="login">
                            </q-btn>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
            <div class="col-12 row justify-center q-pt-md">
                <q-btn-toggle v-model="lang" flat :options="langOptions" @update:model-value="changeLanguage" />
            </div>
        </div>
    </q-page>
</template>

<script>
import axios from 'axios';
import { userStore } from 'stores/user-store.js';
import { defineComponent, ref } from 'vue';
import { useLanguageStore } from 'stores/language-store.js';
import { useThemeStore } from 'src/stores/theme-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();
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
            sitekey: '6LeBsWwgAAAAAOf3towi940LaSxthzMd-ZFZYgyd',
            data,
            language,
            theme: useThemeStore(),
            lang: ref(language.getLanguage),
            langOptions: [
                {
                    label: 'EN',
                    value: 'eng',
                },
                {
                    label: 'TR',
                    value: 'tr',
                },
                {
                    label: 'UA',
                    value: 'ua',
                },
                {
                    label: 'RU',
                    value: 'rus',
                },
            ],
        };
    },
    methods: {
        async login() {
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
                    username: response.data[0].username,
                    jwToken: response.data[0].jwToken,
                    email: response.data[0].email,
                    password: response.data[0].password,
                    role: response.data[0].role,
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
        changeLanguage() {
            language.setLanguage(this.lang);
        },
        /* onSubmit() {
            this.$refs.invisibleRecaptcha.execute();
        },
        onExpired() {
            console.log('Expired');
        },
        resetRecaptcha() {
            this.$refs.recaptcha.reset();
        }, */
    },
});

</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
    .q-card
        min-height: 15%

        .phone
            color: $primary
            text-decoration: underline
</style>
