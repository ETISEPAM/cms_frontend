<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="system" label="System" class="col"></q-tab>
                    <!-- <q-tab name="media" label="Media" class="col"></q-tab> -->
                    <q-tab name="profile" label="Profile" class="col"></q-tab>
                </div>
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="q-py-xs inset-shadow">
                <q-tab-panel name="system">
                    <div class="q-pa-md q-gutter-y-sm row justify-between">
                        <div class="text-h6 q-py-md">Light/Dark Mode</div>
                        <q-toggle v-model="blueModel" @update:model-value="lightModeOn">
                        </q-toggle>
                    </div>
                    <div class="q-pa-md q-gutter-y-sm row justify-between">
                        <div class="text-h6 q-py-md">System Language</div>
                        <div class="q-pa-md text-white">
                            <q-btn-toggle v-model="model" push glossy toggle-color="primary" :options="[
                                { label: 'ENG', value: 'eng' },
                                { label: 'TR', value: 'tr' }
                            ]"></q-btn-toggle>
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
                        <div class="text-h4 q-py-md">Profile Settings</div>
                        <div class="text-h6 q-py-md">Change your profile settings here</div>
                        <q-input class="inpField" filled v-model="firstName" stack-label label="Change Your Name"
                            :placeholder="user.firstName"></q-input>
                        <q-input class="inpField" filled v-model="lastName" stack-label label="Change Your Surname"
                            :placeholder="user.lastName"></q-input>
                        <div class="q-pa-md q-gutter-y-sm row justify-between">
                            <q-btn label="Change Your Password" type="submit" color="primary"
                                @click="this.$router.push('newpassword')"></q-btn>
                            <q-btn label="Save" @click="updateProfile" color="primary"></q-btn>
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
import { ref, defineComponent, watch } from 'vue';
import { useQuasar } from 'quasar';
import { userStore } from 'stores/user-store.js';
import axios from 'axios';

export default defineComponent({
    name: 'ConfigurationPage',
    setup() {
        return {
            tab: ref('system'),
            blueModel: ref(true),
            model: ref('eng'),
            user: userStore(),
        };
    },
    data() {
        return {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
        };
    },
    methods: {
        lightModeOn() {
            const $q = useQuasar();

            watch(() => $q.dark.isActive, (val) => {
                console.log(val ? 'On dark mode' : 'On light mode');
            });
        },
        async updateProfile() {
            axios.patch(

                `http://127.0.0.1:3000/user/${this.user.id}`,
                {
                    firstName: this.firstName,
                    lastName: this.lastName,
                },
            );
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
