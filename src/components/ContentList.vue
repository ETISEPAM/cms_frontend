<template>
    <q-list>
        <q-item v-for="content in contentArray" :key="content.typeId" class="q-py-md" clickable v-ripple>
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                U
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ typeArray.find((type) => type.id == content.typeId).name }}</q-item-label>
            <q-item-label caption lines="1">{{ content.typeId == 1 ? content.contents.Title : content.contents.Name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-icon name="edit" />
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { ContentStore } from 'stores/content-store.js';

export default defineComponent({
    name: 'ContentList',
    async setup() {
        let contentArray, typeArray;

        const contentStore = ContentStore();
        contentStore.$subscribe((mutation) => {
            console.log(mutation.payload);
            // contentArray = mutation.payload;
        }, { detached: true });

        if (!contentStore.contentList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 2000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            contentArray = response.data;
            contentStore.contentList = contentArray;
        } else {
            contentArray = contentStore.contentList;
        }

        return {
            contentArray,
            typeArray,
        };
    },
});
</script>

<style lang="sass" scoped>

</style>
