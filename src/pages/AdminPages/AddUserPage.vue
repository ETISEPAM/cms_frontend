<template>
    <q-page class="page">
        <q-card class="q-pa-md inset-shadow row justify-center">
            <q-form @submit="onSubmit" @reset="onReset" class="col col-md-8 col-xl-6 q-py-md q-gutter-sm">
                <q-input filled v-model="name_surname" label="Name Surname" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>

                <q-input filled v-model="username" label="Username" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>

                <q-input filled v-model="email" label="Email" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Field is required']"></q-input>

                <div class="row justify-end">
                    <q-btn label="Save" type="submit" color="primary"></q-btn>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
                </div>
            </q-form>
        </q-card>
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

        return {
            nameSurname,
            username,
            email,

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
