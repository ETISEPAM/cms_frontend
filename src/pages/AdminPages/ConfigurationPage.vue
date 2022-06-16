<template>
    <q-page class="page">
        <q-card class="card">
            <q-tabs v-model="tab" class="tabs text-grey" active-color="primary" indicator-color="primary"
                narrow-indicator>
                <div class="tabs row col">
                    <q-tab name="system" label="System" class="col"></q-tab>
                    <q-tab name="site" label="Site" class="col"></q-tab>
                    <q-tab name="media" label="Media" class="col"></q-tab>
                </div>
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="q-py-xs inset-shadow">
                <q-tab-panel name="system">
                    <div class="text-h6 q-py-md">System</div>
                </q-tab-panel>

                <q-tab-panel name="site">
                    <div class="text-h6 q-py-md">Site</div>
                </q-tab-panel>

                <q-tab-panel name="media">
                    <div class="text-h6 q-py-md">Media</div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfigurationPage',
    setup() {
        return {
            tab: ref('system'),
        };
    },
});
</script>

<style lang="sass" scoped>
.page
    height: 100%
    margin: 0

    .q-card
        background-color: inherit
    .q-tab-panel
        padding: 0
</style>
