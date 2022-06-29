<template>
    <q-page class="page">
        <q-card>
            <Suspense>
                <template #default>
                    <ListItems />
                </template>
            </Suspense>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';
import { useThemeStore } from 'stores/theme-store.js';
import ListItems from './ListItemsUser.vue';

const language = useLanguageStore();

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
            data,
            language,
            newTag: '',
            newContent: [],
            theme,
            themeController: theme.getTheme,
        };
    },
    setup() {
        const typeStore = TypeStore();

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
});
</script>

<style lang="sass" scoped>
.page
    margin: 0
    padding: 0
    .q-card
        background-color: inherit
        .tag-pool-dark
            height: 84px
            background: rgb(20, 20, 20)
            overflow: auto
            .q-item
                min-height: 0
            .tag-badge
                padding: 0 12px
                height: 18px
            .badge-delete
                min-width: 0
                min-height: 0
        .tag-pool-light
            height: 84px
            background: rgb(235, 235, 235)
            overflow: auto
            .q-item
                min-height: 0
            .tag-badge
                padding: 0 12px
                height: 18px
            .badge-delete
                min-width: 0
                min-height: 0
        .q-placeholder
            max-width: 0
</style>
