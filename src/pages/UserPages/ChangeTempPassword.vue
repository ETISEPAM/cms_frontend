<template>
    <q-page class="flex justify-around content-center">
        <q-card>
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Current Password" type="password" v-model="currentPassword"
                            :rules="[val => !!val || 'Field is required']" />
                        <q-input label="New Password" @update:modelValue="checkPassword" type="password"
                            v-model="password" :rules="[val => !!val || 'Field is required']" />
                        <div class="input_container">
                            <ul>
                                <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                                <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                                <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                                <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character
                                </li>
                            </ul>
                        </div>
                        <q-input label="Confirm New Password" type="password" v-model="newPasswordConf"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="row justify-end">
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
                        <q-btn label="Change" type="submit" color="primary"></q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AddUserPage',

    data() {
        return {
            password: '',
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
    },
});
</script>

<style lang="sass" scoped>
.q-page
    width: 80%
    margin: 0 auto

    .q-card
        width: 40%

*, *:before, *:after
    box-sizing: inherit

body
    font-family: 'Open Sans', sans-serif
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
    color: #525f7f
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
    padding: 30px
    border-radius: 6px
    background: #FFF

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
