<template>
    <q-page class="row justify-around content-center">
        <q-card class="col-10 col-sm-8 col-md-6 col-lg-4">
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Current Password" type="password" v-model="currentPassword"
                            :rules="[!val ? 'Field is req' : (matches ? '' : 'Password is incorrect.')]"
                            @update:modelValue="matches = matchCurrPassword()" />
                        <q-input label="New Password" type="password" v-model="password" @input="checkPassword"
                            @update:modelValue="checkPassword" :rules="[val => !!val || 'Field is required']" />
                        <div class="input_container q-pt-xl">
                            <ul>
                                <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                                <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                                <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                                <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character
                                </li>
                            </ul>
                        </div>
                        <q-input label="Confirm New Password" type="password" @input="matchPassword"
                            @update:modelValue="matchPassword" v-model="newPasswordConf"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="row justify-end">
                        <q-btn label="Reset" @click="onReset" color="primary" flat class="q-ml-sm"></q-btn>
                        <q-btn label="Change" color="primary" to="/panel"></q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { userStore } from 'stores/user-store.js';

export default defineComponent({
    name: 'NewPassword',

    data() {
        return {
            user: userStore(),
            currentPassword: '',
            password: '',
            matches: false,
            matchError: false,
            matchError1: false,
            newPasswordConf: '',
            password_length: 0,
            contains_eight_characters: false,
            contains_number: false,
            contains_uppercase: false,
            contains_special_character: false,
            valid_password: false,
        };
    },
    methods: {
        checkPassword() {
            this.password_length = this.password.length;
            const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

            if (this.password_length > 8) {
                this.contains_eight_characters = true;
            } else {
                this.contains_eight_characters = false;
            }
            console.log(this.contains_eight_characters);
            this.contains_number = /\d/.test(this.password);
            console.log(this.contains_number);
            this.contains_uppercase = /[A-Z]/.test(this.password);
            console.log(this.contains_uppercase);
            this.contains_special_character = format.test(this.password);
            console.log(this.contains_special_character);

            if (this.contains_eight_characters === true
                && this.contains_special_character === true
                && this.contains_uppercase === true
                && this.contains_number === true) {
                this.valid_password = true;
            } else {
                this.valid_password = false;
            }
        },
        matchPassword() {
            if (this.newPasswordConf !== this.password) {
                this.matchError = 'Passwords do not match';
            }
        },
        matchCurrPassword() {
            return this.currentPassword === this.user.password;
        },
        onReset() {
            this.password = '';
            this.newPasswordConf = '';
            this.currentPassword = '';
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
.checkmark_container
    border-radius: 50%
    position: absolute
    background: #2ecc71
    visibility: hidden
    opacity: 0
    display: flex
    justify-content: center
    align-items: center
.show_checkmark
  visibility: visible
  opacity: 1

.checkmark
  width: 100%
  height: 100%
  fill: none
  stroke: white
  stroke-width: 15
  stroke-linecap: round
  stroke-dasharray: 180
  stroke-dashoffset: 180

</style>
