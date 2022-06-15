<template>
    <q-list v-if="page === 'contentTypePage'">
        <q-item v-for="type in typeArray" :key="type.id" class="q-py-md" clickable v-ripple>
            <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                    U
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ type.name }}</q-item-label>
                <q-item-label caption lines="1">{{ type.description }}</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-icon name="edit" />
            </q-item-section>
        </q-item>
    </q-list>
    <q-list v-else-if="page === 'contentPage'">
        <q-item v-for="content in contentArray" :key="content.id" class="q-py-md" clickable v-ripple>
            <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                    U
                </q-avatar>
            </q-item-section>

            <q-item-section>
                 <q-item-label>{{ typeArray.find((type) => type.id == content.typeId).name }}</q-item-label>
                 <q-item-label caption lines="1">{{ content.contents }}</q-item-label>
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
    name: 'ListItems',
    props: {
        page: String,
    },
    async setup() {
        let typeArray;
        let contentArray;

        const contentStore = ContentStore();

        contentStore.$subscribe((mutation) => {
            console.log(mutation.payload);
        }, { detached: true });

        if (!contentStore.typeList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            typeArray = response.data;
            contentStore.typeList = typeArray;
        } else {
            typeArray = contentStore.typeList;
        }

        if (!contentStore.contentList.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

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
            typeArray,
            contentArray,
        };
    },
});
</script>

<style lang="sass" scoped>

</style>
