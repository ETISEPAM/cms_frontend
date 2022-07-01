<template>
    <q-page class="page">
        <q-card>
            <q-card-section class="col-12 row flex-center q-py-xs">
                <q-btn v-model="blueModel" v-on:click="lightModeOn" :icon="themeController ? 'dark_mode' : 'light_mode'"
                    flat dense />
            </q-card-section>
            <Suspense>
                <template #default>
                    <ListItems :themeController="themeController" />
                </template>
            </Suspense>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import { useThemeStore } from 'stores/theme-store.js';
import ListItems from './ListItemsUser.vue';

export default defineComponent({
    name: 'ContentPage',
    components: {
        ListItems,
    },
    data() {
        const theme = useThemeStore();
        return {
            contentStore: ContentStore(),
            typeStore: TypeStore(),
            newTag: '',
            newContent: [],
            theme,
            themeController: theme.getTheme,
        };
    },
    setup() {
        const typeStore = TypeStore();
        const theme = useThemeStore();

        const options = ref(
            typeStore.list.map((type) => {
                const option = {
                    label: type.name,           // LABEL IS DISPLAYED ON THE DROPDOWN SELECT MENU
                    value: type.id,             // VALUE IS ACTUAL VALUE OF INPUT
                };

                return option;
            }),
        );
        const model = ref(null);

        return {
            model,
            blueModel: ref(theme.getTheme),
            options,
            filter(val, update) {
                update(() => {
                    options.value = typeStore.list
                        .map((type) => {
                            const option = {
                                label: type.name,
                                value: type.id,
                            };

                            return option;          // AUTOCOMPLETE FILTERING
                        })
                        .filter((v) => v.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
                });
            },
        };
    },
    methods: {
        /* toggle between dark and light mode */
        lightModeOn() {
            this.themeController = !this.themeController;
            this.$q.dark.set(this.themeController);
            this.theme.setTheme(this.themeController);
        },
    },
});
</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
</style>
