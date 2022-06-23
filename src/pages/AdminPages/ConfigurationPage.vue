<template>
    <q-page class="page">
        <q-card class="card row justify-around items-start no-shadow">
            <q-card-section class="col-12">
                <div class="text-h5 text-weight-bold">{{ data[language.getLanguage].profileSet }}</div>
                <div class="text-caption q-mt-none">{{ data[language.getLanguage].changeSet }}</div>
            </q-card-section>
            <q-card-section class="col-12 col-sm-9 col-md-5 row">
                <q-form class="col-12 row justify-center">
                    <q-input filled v-model="firstName" stack-label :label="data[language.getLanguage].changeName"
                        :placeholder="user.firstName"
                        :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]" dense
                        class="col-11">
                    </q-input>
                    <q-input filled v-model="lastName" stack-label :label="data[language.getLanguage].changeSurname"
                        :placeholder="user.lastName"
                        :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]" dense
                        class="col-11">
                    </q-input>
                    <q-input filled v-model="username" stack-label :label="data[language.getLanguage].changeUsername"
                        :placeholder="user.username"
                        :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]" dense
                        class="col-11">
                    </q-input>
                    <div class="row justify-end col-11">
                        <q-btn :label="data[language.getLanguage].saveIt" @click="updateProfile" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
            <q-card-section class="col-12 col-sm-9 col-md-5 row justify-center">
                <q-btn :label="data[language.getLanguage].changePassword" type="submit" color="deep-orange"
                    @click="changePasswordDialog = true" />
                <q-dialog v-model="changePasswordDialog">
                    <ChangePassword></ChangePassword>
                </q-dialog>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { userStore } from 'stores/user-store.js';
import axios from 'axios';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import ChangePassword from 'src/components/ChangePassword.vue';
import { useThemeStore } from 'stores/theme-store.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'ConfigurationPage',
    setup() {
        return {
            user: userStore(),
            language,
            data,
        };
    },
    components: {
        ChangePassword,
    },
    data() {
        const theme = useThemeStore();
        return {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            changePasswordDialog: ref(false),
            theme,
            themeController: theme.getTheme,
        };
    },
    methods: {
        async updateProfile() {
            if (this.firstName !== '' && this.lastName !== '' && this.username !== '') {
                axios.patch(

                    `http://127.0.0.1:3000/user/${this.user.id}`,
                    {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                    },
                );
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
</style>
