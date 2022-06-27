/**
 * Pie Chart Displayed on Admin Homepage
 * Shows Contents and Content Types data separately for each user in the system
 */
<template>
    <div id="chart">
        <apexchart type="pie" width="400" :options="{
            labels: types,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                        foreColor: themeController ? '#F3F4FA' : '#000000',
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }" :series="
    amounts
" class="row flex-center"></apexchart>
    </div>
</template>

<script>
import { ContentStore } from 'stores/content-store.js';
import { TypeStore } from 'stores/type-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import { useThemeStore } from 'src/stores/theme-store.js';
import data from 'src/languages/i18n.js';

export default {
    name: 'AdminPieChart',
    props: ['themeController'],
    setup() {
        const language = useLanguageStore();
        const contentStore = ContentStore();
        const typeStore = TypeStore();
        const types = [];
        const amounts = [];

        typeStore.list.forEach((type) => {
            types.push(type.name);
        });

        typeStore.list.forEach((type) => {
            let count = 0;

            contentStore.list.forEach((content) => {
                if (content.typeId === type.id) count++;
            });

            amounts.push(count);
        });

        return {
            language,
            data,
            types,
            amounts,
            theme: useThemeStore(),
        };
    },
};

</script>
