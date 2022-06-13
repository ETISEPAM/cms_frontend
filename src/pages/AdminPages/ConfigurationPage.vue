<template>
    <q-page class="page flex flex-center">
        <div id="q-app" style="min-height: 100vh;">
            <div class="q-pa-md" style="max-width: 100%">
                <q-card>
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary">
                        <div class="row justify-around" style="min-width: 100%">
                            <q-tab name="system" label="System"></q-tab>
                            <q-tab name="site" label="Site"></q-tab>
                            <q-tab name="media" label="Media"></q-tab>
                        </div>
                    </q-tabs>

                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="system">
                            <div class="text-h6">System</div>
                        </q-tab-panel>

                        <q-tab-panel name="site">
                            <div class="text-h6">Site</div>
                        </q-tab-panel>

                        <q-tab-panel name="media">
                            <div class="text-h6">Media</div>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
        </div>
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
    font-size: 3.3rem
</style>
