<template>
    <q-page class="page">
        <q-card class="card">
            <div class="q-pa-md q-gutter-y-lg column justify-center">
                <div class="text-h4 q-py-md">{{ data[language.getLanguage].profileSet }}</div>
                <div class="text-h6 q-py-md">{{ data[language.getLanguage].changeSet }}</div>
                <q-input class="inpField" filled v-model="firstName" stack-label
                    :label="data[language.getLanguage].changeName" :placeholder="user.firstName"
                    :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                </q-input>
                <q-input class="inpField" filled v-model="lastName" stack-label
                    :label="data[language.getLanguage].changeSurname" :placeholder="user.lastName"
                    :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                </q-input>
                <q-input class="inpField" filled v-model="username" stack-label
                    :label="data[language.getLanguage].changeUsername" :placeholder="user.username"
                    :rules="[val => val && val.length > 0 || data[language.getLanguage].fieldRequired]">
                </q-input>
                <div class="q-pa-md q-gutter-y-sm row justify-between">
                    <q-btn :label="data[language.getLanguage].changePassword" type="submit" color="primary"
                        @click="this.$router.push('newpassword')"></q-btn>
                    <q-btn :label="data[language.getLanguage].saveIt" @click="updateProfile" color="primary">
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import axios from 'axios';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

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
    data() {
        return {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
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
    height: 100%
    margin: 0

    .q-card
        background-color: inherit
    .q-tab-panel
        padding: 0
    .inpField
        width: 60%

</style>
