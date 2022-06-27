/**
 * Bar Chart Displayed on Admin Homepage
 * Shows Users, Contents and Content Types data
 */
<template>
    <div id="chart">
        <apexchart type="bar" height="350" :options="
            {
                chart:
                {
                    type: 'bar',
                    height: 350,
                    foreColor: themeController ? '#F3F4FA' : '#000000',
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions:
                {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                /* markers: {
                    colors: ['#F44336', '#E91E63', '#9C27B0'],
                }, */
                dataLabels: {
                    enabled: false,
                    style: {
                        colors: ['#F44336', '#E91E63', '#9C27B0'],
                    },
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        data[language.getLanguage].apr,
                        data[language.getLanguage].may,
                        data[language.getLanguage].jun,
                        data[language.getLanguage].jul,
                        data[language.getLanguage].aug,
                        data[language.getLanguage].sep,
                    ],
                },
                yaxis: {
                    title: {
                        text: data[language.getLanguage].total,
                    },
                },
                fill: {
                    opacity: 1,
                    // colors: ['#F44336', '#E91E63', '#9C27B0'],
                },
                /* grid: {
                    row: {
                        colors: ['#F44336', '#E91E63', '#9C27B0'],
                    },
                    column: {
                        colors: ['#F44336', '#E91E63', '#9C27B0'],
                    },
                }, */
                tooltip: {
                    // enabled: false,
                    theme: themeController ? 'dark' : 'light',
                    y: {
                        formatter(val) {
                            return ` ${val} `;
                        },
                    },
                },

            }
        " :series="[{
    name: data[language.getLanguage].users,
    data: [1, 1, userSize, 0, 0, 0],
}, {
    name: data[language.getLanguage].contentType,
    data: [2, 2, typeSize, 0, 0, 0],
}, {
    name: data[language.getLanguage].contents,
    data: [1, 1, contentSize, 0, 0, 0],
}]">
        </apexchart>
    </div>
</template>

<script>
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

export default {
    name: 'AdminChart',
    props: {
        themeController: Boolean,
        userSize: Number,
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
