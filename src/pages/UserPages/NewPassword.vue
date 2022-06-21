<template>
    <q-page class="row justify-around content-center">
        <q-card class="col-10 col-sm-8 col-md-6 col-lg-4">
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Current Password" type="password" v-model="currentPassword"
                            @input="passwordsMatchesOld = matchCurrPassword(user.password, currentPassword)"
                            @update:modelValue="passwordsMatchesOld = matchCurrPassword(user.password, currentPassword)"
                            :rules="[passwordsMatchesOld ? '' : 'Please enter correct password']" />
                        <q-input label="New Password" type="password" v-model="password"
                            @input="validPassword = checkPassword(password)"
                            @update:modelValue="validPassword = checkPassword(password)"
                            :rules="[val => !!val || 'Field is required']" />
                        <div class="input_container q-pt-xl">
                            <ul>
                                <li v-bind:class="{ is_valid: validPassword.eight }">8 Characters</li>
                                <li v-bind:class="{ is_valid: validPassword.num }">Contains Number</li>
                                <li v-bind:class="{ is_valid: validPassword.upper }">Contains Uppercase</li>
                                <li v-bind:class="{ is_valid: validPassword.special }">Contains Special Character
                                </li>
                            </ul>
                        </div>
                        <q-input label="Confirm New Password" type="password" v-model="newPasswordConf"
                            @input="passwordsMatchesNew = matchPassword(password, newPasswordConf)"
                            @update:modelValue="passwordsMatchesNew = matchPassword(password, newPasswordConf)"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="row justify-end">
                        <q-btn label="Reset" @click="onReset" color="primary" flat class="q-ml-sm"></q-btn>
                        <q-btn label="Change" color="primary" @click="updatePassword">
                        </q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';
import axios from 'axios';
import { checkPassword, matchPassword, matchCurrPassword } from 'src/validations.js';

export default defineComponent({
    name: 'NewPassword',

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
        };
    },
    methods: {
        onReset() {
            this.password = '';
            this.newPasswordConf = '';
            this.currentPassword = '';
        },
        async updatePassword() {
            console.log(this.validPassword);
            console.log(this.passwordsMatchesNew);
            console.log(this.passwordsMatchesOld);
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

.is_valid
    color: rgba(136, 152, 170, 0.8)
.is_valid:before
    width: 100%

</style>
