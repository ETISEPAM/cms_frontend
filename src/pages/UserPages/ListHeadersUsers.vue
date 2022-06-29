<template>
    <div class="content-header row">
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                C
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ typeName }}</q-item-label>
            <q-item-label caption lines="1" class="row">
                <div v-for="tag in content.tag" :key="tag" class="q-pr-sm q-pt-sm">
                    <q-badge :color="themeController ? 'accent' : 'secondary'" :label="tag" rounded class="q-px-sm" />
                </div>
            </q-item-label>
        </q-item-section>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListHeaders',
    props: {
        type: Object,
        content: Object,
        themeController: Boolean,
        typeName: String,
    },
});
</script>

<style lang="sass" scoped>
.content-header
    width: 100%
</style>
