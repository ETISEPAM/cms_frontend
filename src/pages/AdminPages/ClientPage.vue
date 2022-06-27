/**
 * Add New Client Page
 * isValidEmailAddress(), onReset(), onSave() functions are called
 */
<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="list" :label="data[language.getLanguage].list" class="col"></q-tab>
                    <q-tab name="create" :label="data[language.getLanguage].create" class="col"></q-tab>
                </div>
            </q-tabs>
            <q-tab-panels v-model="tab" animated class="q-py-xs inset-shadow">
                <q-tab-panel name="list">
                    <Suspense>
                        <template #default>
                            <!-- <ListItems page='clientPage' /> -->
                            <q-list>
                                <q-item class="row">
                                    <q-item-section avatar class="row flex-center">
                                        <q-skeleton type="QAvatar" />
                                    </q-item-section>

                                    <q-item-section class="row col-8">
                                        <q-item-label class="row">
                                            <q-skeleton type="text" class="col-6" />
                                        </q-item-label>
                                        <q-item-label caption>
                                            <q-skeleton type="QRange" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </template>
                        <template #fallback>
                            <q-list>
                                <q-item class="row">
                                    <q-item-section avatar class="row flex-center">
                                        <q-skeleton type="QAvatar" />
                                    </q-item-section>

                                    <q-item-section class="row col-8">
                                        <q-item-label class="row">
                                            <q-skeleton type="text" class="col-6" />
                                        </q-item-label>
                                        <q-item-label caption>
                                            <q-skeleton type="QRange" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </template>
                    </Suspense>
                </q-tab-panel>
                <q-tab-panel name="create">
                    <q-card class="q-pa-md row justify-center">
                        <q-form @submit="onSubmit" @reset="onReset"
                            class="col-12 row justify-center q-py-md q-gutter-sm">
                            <q-input filled clearable dense v-model="user.name" :label="data[language.getLanguage].name"
                                lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]"
                                class="col-9 col-sm-5 col-md-4">
                            </q-input>
                            <q-input filled clearable dense v-model="user.surname"
                                :label="data[language.getLanguage].surname" lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]"
                                class="col-9 col-sm-5 col-md-4">
                            </q-input>
                            <q-input filled clearable dense v-model="user.username"
                                :label="data[language.getLanguage].username" lazy-rules
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]"
                                class="col-9 col-sm-5 col-md-4">
                            </q-input>
                            <q-input filled clearable dense v-model="user.email"
                                :label="data[language.getLanguage].email" lazy-rules :rules="
                                [val => isValidEmailAddress(val) || data[language.getLanguage].validEmail]"
                                class="col-9 col-sm-5 col-md-4">
                            </q-input>
                            <q-input filled clearable dense v-model="user.password"
                                @input="validPassword = checkPassword(user.password)"
                                @update:modelValue="validPassword = checkPassword(user.password)"
                                :label="data[language.getLanguage].password" :type="isPwd ? 'password' : 'text'"
                                :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]"
                                class="col-9 col-sm-5 col-md-4">
                                <template v-slot:append>
                                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                        @click="isPwd = !isPwd" />
                                </template>
                            </q-input>
                            <div class="col-9 col-sm-10 col-md-8"
                                :class="themeController ? 'password-validation-dark' : 'password-validation-light'">
                                <ul>
                                    <li v-bind:class="{ is_valid: validPassword.eight }" class="q-ml-sm">
                                        {{ data[language.getLanguage].charNumber }}
                                    </li>
                                    <li v-bind:class="{ is_valid: validPassword.num }" class="q-ml-sm">
                                        {{ data[language.getLanguage].containsNum }}
                                    </li>
                                    <li v-bind:class="{ is_valid: validPassword.upper }" class="q-ml-sm">
                                        {{ data[language.getLanguage].containsUpper }}
                                    </li>
                                    <li v-bind:class="{ is_valid: validPassword.special }" class="q-ml-sm">
                                        {{ data[language.getLanguage].conainsChar }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 row q-pt-lg justify-end">
                                <q-btn :label="data[language.getLanguage].saveIt" type="reset" color="primary"
                                    @click="onSave()"></q-btn>
                                <q-btn :label="data[language.getLanguage].reset" type="reset" color="primary" flat
                                    class="q-ml-sm"></q-btn>
                            </div>
                        </q-form>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import axios from 'axios';
import { UserStore } from 'stores/user-store.js';
import { checkPassword } from 'src/validations.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'ClientPage',
    setup() {
        return {
            tab: ref('list'),
        };
    },
    data() {
        const theme = useThemeStore();
        const userStore = UserStore();

        return {
            userStore,
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
            themeController: theme.getTheme,
            validPassword: {
                eight: false,
                num: false,
                upper: false,
                special: false,
            },
            isPwd: ref(true),
        };
    },
    methods: {
        /**
         * e-mail validation
         * checks if e-mail is valid
         * @param  {String} email - email for user
         * @return {Boolean} email is valid
         */
        isValidEmailAddress(email) {
            // eslint-disable-next-line max-len
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        /* reset all fields on reset button pressed */
        onReset() {
            this.user.name = null;
            this.user.surname = null;
            this.user.username = null;
            this.user.email = null;
            this.user.password = null;
            this.validPassword.eight = false;
            this.validPassword.num = false;
            this.validPassword.upper = false;
            this.validPassword.special = false;
        },
        /* create new user in database when click save button, post request to api */
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
                            firstName: this.user.name,
                            lastName: this.user.surname,
                            userName: this.user.username,
                            email: this.user.email,
                            password: this.user.password,
                            firstLogin: true,
                        },
                    )
                    .then((response) => {
                        console.log(response.data);
                        this.userStore.$patch({ list: [...this.userStore.list, response.data] });
                        console.log(this.userStore.list);
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
    margin: 0
    padding: 0

    .card
        background-color: inherit

        .q-tab-panel
            padding: 0

            .q-placeholder
                max-width: 0
</style>
