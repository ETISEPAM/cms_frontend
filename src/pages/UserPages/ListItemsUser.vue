<template>
    <div class="row justify-between items-center">
        <div class="col-12 row flex-center">
            <q-pagination v-model="current" color="teal" :max="10" :max-pages="6" input />
        </div>
        <!-- <SortFilterMenu /> -->
    </div>
    <div class="row justify-evenly items-center q-px-md q-gutter-md">
        <q-card v-for="content in contentStore.list" :key="content.id" class="col-12 col-sm-5 col-lg-3 q-pa-sm">
            <q-card-section>
                <ListHeaders :page="page" :content="{ ...content }" :themeController="themeController"
                    :typeName="typeStore.list.find((type) => type.id === content.typeId).name" />
            </q-card-section>

            <q-card-section>
                <ContentItemTable :key="content" :content="content" :themeController="themeController" />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import { UserStore } from 'stores/user-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
// import SortFilterMenu from 'components/SortFilterMenu.vue';
import ListHeaders from './ListHeadersUsers.vue';
import ContentItemTable from './ContentItemTableUser.vue';

const language = useLanguageStore();

export default defineComponent({
    name: 'ListItems',
    props: {
        page: String,
        themeController: Boolean,
    },
    components: {
        // SortFilterMenu,
        ListHeaders,
        ContentItemTable,
    },
    data() {
        return {
            userStore: UserStore(),
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            userChanged: false,
            contentsChanged: false,
            fieldsChanged: false,
            contentCopy: ref(null),
            addField: false,
            data,
            language,
        };
    },
    async setup() {
        const contentStore = ContentStore();
        const typeStore = TypeStore();

        if (!typeStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                typeStore.list = response.data;
            }
        }

        if (!contentStore.list.length) {
            // eslint-disable-next-line
            await new Promise((slp) => setTimeout(slp, 1000));

            const response = await axios
                .get('http://127.0.0.1:3000/content')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                contentStore.list = response.data;
            }
        }

        const optionTemplate = ref([
            {
                label: 'String',
                value: 'String',
                description: 'Text field.',
                icon: 'text_fields',
            },
            {
                label: 'Number',
                value: 'Number',
                description: 'Number field.',
                icon: 'numbers',
            },
            {
                label: 'Boolean',
                value: 'Boolean',
                description: 'True or false.',
                icon: 'toggle_off',
            },
            {
                label: 'Date',
                value: 'Date',
                description: 'Datepicker.',
                icon: 'calendar_today',
            },
            {
                label: 'File',
                value: 'File',
                description: 'Filepicker.',
                icon: 'upload_file',
            },
        ]);
        const options = ref(optionTemplate.value);
        const boolOptions = [
            {
                label: 'True',
                value: true,
            },
            {
                label: 'False',
                value: false,
            },
        ];
        return {
            options,
            boolOptions,
            filter(val, update) {
                update(() => {
                    options.value = optionTemplate.value
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
            current: ref(1),
        };
    },
    methods: {
        clone(content) {
            const clone = [];
            content.forEach((item) => {
                const temp = {
                    id: item.id,
                    dataType: item.dataType,
                    label: item.label,
                    value: item.value,
                };

                clone.push({ ...temp });
            });

            return clone;
        },
        logEvent(toLog) {
            console.log(toLog);
        },
    },
});
</script>

<style lang="sass" scoped>
.q-card
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
