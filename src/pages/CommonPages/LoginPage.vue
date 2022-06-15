<template>
    <q-page class="flex justify-around content-center">
        <q-card>
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Email" v-model="email" :rules="[val => !!val || 'Field is required']" />
                        <q-input label="Password" type="password" v-model="password"
                            :rules="[val => !!val || 'Field is required']" />
                    </div>
                    <div class="flex justify-end">
                        <q-btn color="primary" label="Login" rounded v-on:click="login"></q-btn>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>

        <img src="~src/assets/imgs/emakinaDark.png" alt="EMAKINA Logo">
    </q-page>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            const result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}`,
            );
            /* if (result.status === 200 && result.data.lenght > 0) {
                localStorage.setItem("user_info", JSON.stringify(result.data[0])),
                    this.$router.push({ name: 'AdminHomePage' }),
            } */
            /* İFİ COMMENTE ALDIM
            ONCEKİ PARANTEZDEN ONCE ESLİNT HATA VERİYOR
            ESLINTTRC.JS'E PARSER BABEL EKLEDİM İNDİRDİM BABELİ GÖRMÜYOR
            TEK PARANTEZ İSE TS 1109 HATASI VERİYOR TS VERSİON KT ETTİM, LATEST İNDİRDİM 4.7.3 YİNE HATA VERİYOR
            NOLURRRRRRRRRRRRRRRRRRRRRRR COZ  */
            // eslint-disable-next-line
            console.warn(result);
        },
    },
};

</script>

<style lang="sass" scoped>
.q-page
    width: 80%
    margin: 0 auto

    .q-card
        width: 40%
</style>
