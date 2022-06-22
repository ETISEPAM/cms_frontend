<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="system" :label="data[language.getLanguage].sysLabel" class="col"></q-tab>
                    <!-- <q-tab name="media" label="Media" class="col"></q-tab> -->
                    <q-tab name="profile" :label="data[language.getLanguage].sysProfile" class="col"></q-tab>
                </div>
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="q-py-xs inset-shadow">
                <q-tab-panel name="system">
                    <div class="q-pa-md q-gutter-y-sm row justify-between">
                        <div class="text-h6 q-py-md">{{ data[language.getLanguage].mode }}</div>
                        <q-toggle v-model="blueModel" @update:model-value="lightModeOn">
                        </q-toggle>
                    </div>
                    <div class="q-pa-md q-gutter-y-sm row justify-between">
                        <div class="text-h6 q-py-md">{{ data[language.getLanguage].sysLang }}</div>
                        <div class="q-pa-md text-white">
                            <q-btn-group push>
                                <q-btn push label="EN" v-on:click="changeLanguageEn"></q-btn>
                                <q-btn push label="TR" v-on:click="changeLanguageTr"></q-btn>
                                <q-btn push label="RUS" v-on:click="changeLanguageRus"></q-btn>
                            </q-btn-group>
                        </div>
                    </div>
                </q-tab-panel>

                <!-- <q-tab-panel name="media">
                    <div class="q-pa-md q-gutter-y-sm row justify-between">
                        <div class="text-h6 q-py-md">Media</div>
                    </div>
                </q-tab-panel> -->

                <q-tab-panel name="profile">
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
                        <!-- <div class="row justify-end">
                            <q-btn label="Save" type="submit" color="primary"></q-btn>
                        </div> -->
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import { useQuasar } from 'Quasar';
import axios from 'axios';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

const language = useLanguageStore();

export default defineComponent({
    name: 'ConfigurationPage',
    setup() {
        const $q = useQuasar(); // DARK MODE
        console.log($q);
        const themeController = ref(true);
        const lightModeOn = () => {
            themeController.value = !themeController.value;
            $q.dark.set(themeController.value);
            console.log(themeController.value);
        };
        return {
            tab: ref('system'),
            blueModel: ref(true),
            model: ref('eng'),
            user: userStore(),
            lightModeOn,
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
        changeLanguageEn() {
            language.setLanguage('eng');
        },
        changeLanguageTr() {
            language.setLanguage('tr');
        },
        changeLanguageRus() {
            language.setLanguage('rus');
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
