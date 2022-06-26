<template>
    <div id="chart">
        <apexchart type="pie" width="400" :options="{
            labels: ['Content Types', 'Contents'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }" :series="[typeSize, contentSize]"></apexchart>
    </div>
</template>

<script>

import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

export default {
    name: 'AdminPieChart',
    props: {
        themeController: Boolean,
        contentSize: Number,
        typeSize: Number,
    },
    setup() {
        const language = useLanguageStore();
        return {
            language,
            data,
        };
    },
};

</script>
