<template>
    <q-card class="card">
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
                    <div class="q-pt-xl"
                        :class="themeController ? 'password-validation-dark' : 'password-validation-light'">
                        <ul>
                            <li v-bind:class="{ is_valid: validPassword.eight }">{{
                                    data[language.getLanguage].charNumber
                            }}</li>
                            <li v-bind:class="{ is_valid: validPassword.num }">{{ data[language.getLanguage].containsNum
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
import { LoginStore } from 'stores/login-store.js';
import axios from 'axios';
import { checkPassword, matchPassword, matchCurrPassword } from 'src/validations.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'ChangePassword',

    data() {
        const theme = useThemeStore();
        return {
            user: LoginStore(),
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
            theme,
            themeController: theme.getTheme,
        };
    },
    methods: {
        onReset() {
            this.password = '';
            this.newPasswordConf = '';
            this.currentPassword = '';
            this.validPassword.upper = false;
            this.validPassword.eight = false;
            this.validPassword.num = false;
            this.validPassword.special = false;
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
.card
    width: 450px
</style>
