<template>
    <q-page class="row justify-around content-center">
        <ChangePassword></ChangePassword>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ChangePassword from 'src/components/ChangePassword.vue';

export default defineComponent({
    name: 'NewPassword',
    components: {
        ChangePassword,
    },
});
</script>
