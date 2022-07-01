<template>
    <div class="q-pa-sd row items-start q-gutter-md">
        <q-card bordered class="my-card">
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label lines="1" class="text-h6">{{ user.firstName }} {{ user.lastName }}
                        </q-item-label>
                        <q-item-label caption lines="2">
                            <span class="text-weight-bold">{{ user.username }}</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
                {{ user.bio }}
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LoginStore } from 'stores/login-store.js';

export default defineComponent({
    name: 'UserCard',
    data() {
        return {
            user: LoginStore(),
        };
    },
});
</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 280px
    max-height: 560px
    overflow: scroll
</style>
