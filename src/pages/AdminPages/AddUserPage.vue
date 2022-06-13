<template>
    <q-page class="page flex content-center">
        <div class="q-pa-md">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="name_surname" label="Name Surname" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>

                <q-input filled v-model="username" label="Username" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>

                <q-input filled v-model="email" label="Email" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>

                <div>
                    <q-btn label="Save" type="submit" color="primary"></q-btn>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useQuasar } from 'Quasar';

export default defineComponent({
    name: 'AddUserPage',

    setup() {
        const $q = useQuasar();
        const nameSurname = ref(null);
        const username = ref(null);
        const email = ref(null);
        const temporaryPassword = ref(null);
        const temporaryPasswordConformation = ref(null);
        const active = ref(false);

        return {
            nameSurname,
            username,
            email,
            temporaryPassword,
            temporaryPasswordConformation,
            active,

            onSave() {
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Submitted',
                });
            },

            onReset() {
                nameSurname.value = null;
                username.value = null;
                email.value = null;
                temporaryPassword.value = null;
                temporaryPasswordConformation.value = null;
                active.value = false;
            },
        };
    },
});
</script>

<style lang="sass" scoped>
.page
    width: 100%
    margin: 0
</style>
