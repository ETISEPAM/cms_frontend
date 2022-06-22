<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="registerUser" :label="data[language.getLanguage].registerUser" class="col"></q-tab>
                    <q-tab name="updateUser" :label="data[language.getLanguage].usersList" class="col"></q-tab>
                </div>
            </q-tabs>
            <q-tab-panels v-model="tab" animated class="q-py-xs">
                <q-tab-panel name="registerUser">
                    <q-card class="q-pa-md row justify-center">
                        <q-form @submit="onSubmit" @reset="onReset" class="col col-md-8 col-xl-6 q-py-md q-gutter-sm">
                            <q-input filled v-model="user.name" :label="data[language.getLanguage].name" lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                            </q-input>
                            <q-input filled v-model="user.surname" :label="data[language.getLanguage].surname"
                                lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                            </q-input>
                            <q-input filled v-model="user.username" :label="data[language.getLanguage].username"
                                lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                            </q-input>
                            <q-input filled v-model="user.email" :label="data[language.getLanguage].email" lazy-rules
                                :rules="
                                [val => isValidEmailAddress(val) || data[language.getLanguage].validEmail]"></q-input>
                            <q-input filled v-model="user.password"
                                @input="validPassword = checkPassword(user.password)"
                                @update:modelValue="validPassword = checkPassword(user.password)"
                                :label="data[language.getLanguage].password" type="password"
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                            </q-input>
                            <div class="input_container q-pt-xl">
                                <ul>
                                    <li v-bind:class="{ is_valid: validPassword.eight }">
                                        {{ data[language.getLanguage].charNumber }}</li>
                                    <li v-bind:class="{ is_valid: validPassword.num }">{{
                                            data[language.getLanguage].containsNum
                                    }}</li>
                                    <li v-bind:class="{ is_valid: validPassword.upper }">{{
                                            data[language.getLanguage].containsUpper
                                    }}</li>
                                    <li v-bind:class="{ is_valid: validPassword.special }">{{
                                            data[language.getLanguage].conainsChar
                                    }}
                                    </li>
                                </ul>
                            </div>
                            <div class="row justify-end">
                                <q-btn :label="data[language.getLanguage].saveIt" type="reset" color="primary"
                                    @click="onSave()"></q-btn>
                                <q-btn :label="data[language.getLanguage].reset" type="reset" color="primary" flat
                                    class="q-ml-sm"></q-btn>
                            </div>
                        </q-form>
                    </q-card>
                </q-tab-panel>
                <q-tab-panel name="updateUser">
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import axios from 'axios';
import { userStore } from 'stores/user-store.js';
import { checkPassword } from 'src/validations.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'RegistrationPage',
    setup() {
        return {
            tab: ref('registerUser'),
        };
    },
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
            checkPassword,
            language,
            data,
            validPassword: {
                eight: false,
                num: false,
                upper: false,
                special: false,
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
            if (
                this.validPassword.eight === true
                && this.validPassword.num === true
                && this.validPassword.upper === true
                && this.validPassword.special === true) {
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
            }
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    width: 100%
    margin: 0

*, *:before, *:after
    box-sizing: inherit

ul
    padding-left: 20px
    display: flex
    flex-direction: column
    align-items: flex-start

li
    margin-bottom: 8px
    color: #FFFFFF
    position: relative

li:before
    content: ""
    width: 0%
    height: 2px
    background: #2ecc71
    position: absolute
    left: 0
    top: 50%
    display: block
    transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275)
.input_container
    position: relative
    padding: 5px
    border-radius: 6px
    background: #272727

input[type="password"]:focus
    border-color: rgba(50, 151, 211, .45)

.is_valid
    color: rgba(136, 152, 170, 0.8)
.is_valid:before
    width: 100%
</style>
