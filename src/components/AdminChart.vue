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
                    categories: [data[language.getLanguage].jan,
                    data[language.getLanguage].feb,
                    data[language.getLanguage].mar,
                    data[language.getLanguage].apr,
                    data[language.getLanguage].may,
                    data[language.getLanguage].jun,
                    data[language.getLanguage].jul,
                    data[language.getLanguage].aug,
                    data[language.getLanguage].sep,
                    data[language.getLanguage].oct,
                    data[language.getLanguage].nov,
                    data[language.getLanguage].dec,
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
    data: [2, 3, 6, 10, 9, 2, 0, 0, 0, 0, 0, 0],
}, {
    name: data[language.getLanguage].contentType,
    data: [3, 2, 4, 15, 4, typeSize, 0, 0, 0, 0, 0, 0],
}, {
    name: data[language.getLanguage].contents,
    data: [12, 6, 20, 25, 26, contentSize, 0, 0, 0, 0, 0, 0],
}]">
        </apexchart>
    </div>
</template>

<script>
// import { useThemeStore } from 'stores/theme-store.js';
import { useLanguageStore } from 'stores/language-store.js';
import data from 'src/languages/i18n.js';

export default {
    name: 'AdminChart',
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

<!-- <style>
.apexcharts-tooltip {
    background: #f3f3f3;
    color: orange;
}
</style> -->
