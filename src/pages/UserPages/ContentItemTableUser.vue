<template>
    <q-list class="fields no-border">
        <q-item v-for="item in content.contents" :key="item" class="row"
            :class="themeController ? 'q-item-dark' : 'q-item-light'">
            <div class="row no-wrap items-center">
                <q-icon name="stop" color="teal" class="text-center q-pr-sm" />
                <span>{{ item.label }}</span>
            </div>
            <div class="q-pb-sm q-pl-lg">
                {{ item.value }}
            </div>
        </q-item>
    </q-list>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ContentItemTable',
    props: ['content', 'themeController'],
    data() {
        console.log(this.content);
    },
});
</script>

<style lang="sass" scoped>
.fields
    .q-item-dark
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(40, 40, 40)

        span
            color: teal
            font-weight: 700

    .q-item-light
        display: flex
        flex-direction: column
        justify-content: center
        align-items: space-between
        overflow: auto

        &:nth-of-type(2n)
            background: rgb(240, 240, 240)

        span
            color: teal
            font-weight: 700
</style>
