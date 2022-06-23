<template>
    <q-card class="col-10 col-sm-8 col-md-6 col-lg-4">
        <q-card-section>
            <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                <div>
                    <q-input :label="data[language.getLanguage].currentPassword" type="password"
                        v-model="currentPassword"
                        @input="passwordsMatchesOld = matchCurrPassword(user.password, currentPassword)"
                        @update:modelValue="passwordsMatchesOld = matchCurrPassword(user.password, currentPassword)"
                        :rules="[val => !!val || data[language.getLanguage].fieldRequired]" bottom-slots
                        :error="!passwordsMatchesOld && currentPassword !== ''">
                        <template v-slot:error>
                            {{ data[language.getLanguage].enterCorrPass }}
                            {{ error }}
                        </template>
                    </q-input>

                    <q-input :label="data[language.getLanguage].newPassword" type="password" v-model="password"
                        @input="validPassword = checkPassword(password)"
                        @update:modelValue="validPassword = checkPassword(password)"
                        :rules="[val => !!val || data[language.getLanguage].fieldRequired]" />
                    <div class="password-validation q-pt-xl">
                        <ul>
                            <li v-bind:class="{ is_valid: validPassword.eight }">8 Characters</li>
                            <li v-bind:class="{ is_valid: validPassword.num }">Contains Number</li>
                            <li v-bind:class="{ is_valid: validPassword.upper }">Contains Uppercase</li>
                            <li v-bind:class="{ is_valid: validPassword.special }">Contains Special Character
                            </li>
                        </ul>
                    </div>
                    <q-input :label="data[language.getLanguage].confirmNewPass" type="password"
                        v-model="newPasswordConf"
                        @input="passwordsMatchesNew = matchPassword(password, newPasswordConf)"
                        @update:modelValue="passwordsMatchesNew = matchPassword(password, newPasswordConf)"
                        :rules="[val => !!val || data[language.getLanguage].fieldRequired]" />
                </div>
                <div class="row justify-end">
                    <q-btn :label="data[language.getLanguage].reset" @click="onReset" color="primary" flat
                        class="q-ml-sm"></q-btn>
                    <q-btn :label="data[language.getLanguage].saveIt" color="primary" v-on:click="updatePassword">
                    </q-btn>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import axios from 'axios';
import { checkPassword, matchPassword, matchCurrPassword } from 'src/validations.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'ChangePassword',

    data() {
        return {
            user: userStore(),
            currentPassword: '',
            password: '',
            passwordsMatchesOld: false,
            passwordsMatchesNew: false,
            newPasswordConf: '',
            password_length: 0,
            validPassword: {
                eight: false,
                num: false,
                upper: false,
                special: false,
            },
            matchPassword,
            checkPassword,
            matchCurrPassword,
            language,
            data,
        };
    },
    methods: {
        onReset() {
            this.password = '';
            this.newPasswordConf = '';
            this.currentPassword = '';
            console.log(this.role);
        },
        async updatePassword() {
            if (
                this.validPassword.eight === true
                && this.validPassword.num === true
                && this.validPassword.upper === true
                && this.validPassword.special === true
                && this.passwordsMatchesNew === true
                && this.passwordsMatchesOld === true) {
                console.log('patch');
                axios.patch(
                    `http://127.0.0.1:3000/user/${this.user.id}`,
                    {
                        password: this.newPasswordConf,
                    },
                );
            }
        },
    },
});
</script>

<style lang="sass" scoped>
.q-page
    margin: 0

*, *:before, *:after
    box-sizing: inherit

body
    display: flex
    justify-content: center
    align-items: center
    background: #ff6b6b
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

h2
    text-align: center
    color: #FFF
    font-weight: 400

input[type="password"]
    line-height: 1.5
    display: block
    color: rgba(136, 152, 170, 1)
    font-weight: 300
    width: 100%
    height: calc(2.75rem + 2px)
    padding: .625rem .75rem
    border-radius: .25rem
    background-color: #fff
    outline: 0

input[type="password"]:focus
    border-color: rgba(50, 151, 211, .45)
</style>
