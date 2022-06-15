<template>
    <q-page class="flex justify-around content-center">
        <q-card>
            <q-card-section>
                <q-form class="q-gutter-lg flex column justify-around" action="/panel">
                    <div>
                        <q-input label="Current Password" type="password" v-model="currentPassword"
                            :rules="[val => !!val || 'Field is required']" />
                        <q-input label="New Password" type="password" v-model="newPassword"
                            :rules="[val => !!val || 'Field is required']" />
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
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'ChangeTempPassword',

    setup() {
        const currentPassword = ref(null);
        const newPassword = ref(null);
        const newPasswordConf = ref(null);

        return {
            currentPassword,
            newPassword,
            newPasswordConf,

            onReset() {
                currentPassword.value = null;
                newPassword.value = null;
                newPasswordConf.value = null;
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
