<template>
    <q-page class="flex justify-around content-center">
        <q-card>
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Username" v-model="user.username"
                            :rules="[val => !!val || 'Field is required']" />
                        <q-input label="Password" type="password" v-model="user.password"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="flex justify-end">
                        <q-btn color="primary" label="Login" type="submit" rounded></q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>

        <img src="~src/assets/imgs/emakinaDark.png" alt="EMAKINA Logo">
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoginPage',
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        };
    },
});
</script>

<style lang="sass" scoped>
.q-page
    width: 80%
    margin: 0 auto

    .q-card
        width: 40%
</style>
