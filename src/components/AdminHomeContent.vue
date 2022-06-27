/**
 * Combines bar and pie chart at Admin Homepage in a single component
 * Retrieves users, contents, and content types from the db
 * chartExample, AdminPieChart are included as components
 * sending get requests with axios
 */
<template>
    <div class="row">
        <div class="col-12 row justify-center items-center">
            <chartExample
                :themeController="themeController"
                :userSize="userStore.list.length"
                :contentSize="contentStore.list.length"
                :typeSize="typeStore.list.length"
                class="chart"
            />
        </div>

        <div class="col-12 row justify-center items-center">
            <AdminPieChart
                class="chart"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import { UserStore } from 'stores/user-store.js';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import axios from 'axios';

const chartExample = defineAsyncComponent(() => import('src/components/AdminChart.vue'));
const AdminPieChart = defineAsyncComponent(() => import('src/components/AdminPieChart.vue'));

export default defineComponent({
    name: 'AdminHomeContent',
    props: {
        themeController: Boolean,
    },
    data() {
        return {
            userStore: UserStore(),
            contentStore: ContentStore(),
            typeStore: TypeStore(),
        };
    },
    async setup() {
        const userStore = UserStore();
        const contentStore = ContentStore();
        const typeStore = TypeStore();

        if (!userStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/user')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) userStore.list = response.data;
        }

        if (!typeStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) typeStore.list = response.data;
        }

        if (!contentStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) contentStore.list = response.data;
        }
    },
    components: {
        // ConfirmDialog,
        chartExample,
        AdminPieChart,
    },
});
</script>

<style lang="sass" scoped>
div
    margin: 0
    padding: 0
    .chart
        min-width: 578px
</style>
