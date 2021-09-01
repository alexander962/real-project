<template lang="html">
    <div class="wrapper">
        <HeaderMobile/>
        <ProfileWidget/>
        <div>
            <h2>Статистика</h2>

            <ul class="tab_list_ref">
                <li v-for="tab in tabs">
                    <div
                        :class="[tab.active ? 'tab_item_ref-active' : 'tab_item_ref']"
                        @click="getGroupBy(tab.name)"
                    >
                        {{ tab.name }}
                    </div>
                </li>
            </ul>

            <div class="form-group">
                <DatePicker ref="datepicker" :use-utc="false"/>
                <button type="button" class="statistics_btn" @click="onSubmit">
                    показать
                </button>
            </div>

            <div class="statistics-table_block">
                <table class="statistics-table">
                    <tbody class="statistics-table_body">
                    <tr class="table-row">
                        <th>
                            {{ this.group_by_name }}
                            <img
                                :src="require('../../../assets/img/balance-up.svg').default"
                                class="statistics-data_arrow"
                            />
                        </th>
                        <th class="statistics-column_center">
                            <div class="statistics-block">
                                <span>Просмотры</span>
                                <div class="statistics-block_arrows">
                                    <img
                                        :src="
                        require('../../../assets/img/balance-up.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                    <img
                                        :src="
                        require('../../../assets/img/balance-down.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                </div>
                            </div>
                        </th>

                        <th class="statistics-column_center">
                            <div class="statistics-block">
                                <span>Подписки</span>
                                <div class="statistics-block_arrows">
                                    <img
                                        :src="
                        require('../../../assets/img/balance-up.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                    <img
                                        :src="
                        require('../../../assets/img/balance-down.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                </div>
                            </div>
                        </th>

                        <th class="appoint-column_center">
                            <div class="statistics-block">
                                <span>CTR</span>
                                <div class="statistics-block_arrows">
                                    <img
                                        :src="
                        require('../../../assets/img/balance-up.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                    <img
                                        :src="
                        require('../../../assets/img/balance-down.svg').default
                      "
                                        class="statistics-data_arrow"
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr
                        class="appoint-row"
                        v-for="(item, key) in statisticsTableData">
                        <td class="appoint-column">{{ group_by == 'date' ? convertDate(key) : key}}</td>
                        <td class="appoint-column_center">{{ item['viewsCount'] }}</td>
                        <td class="appoint-column_center">{{ item['subscribersCount'] }}</td>
                        <td class="appoint-column_center">{{ !item['viewsCount'] ? '-' :
                            (Math.round(item['subscribersCount'] / item['viewsCount'] * 100) + '%') }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileWidget from '../ProfileWidget.vue'
    import HeaderMobile from '../header-mobile/Header.vue'
    import DatePicker from './DatePicker/DatePicker.vue'

    export default {
        data() {
            return {
                from: '',
                to: '',
                group_by: 'date',
                group_by_name: 'Даты',
                statisticsTableData: [],
                tabs: [
                    {name: 'Даты', active: true},
                    {name: 'Страницы', active: false},
                    {name: 'Аккаунты', active: false},
                ],
            }
        },

        methods: {
            getGroupBy(groupBy) {
                this.group_by_name = groupBy;

                if (groupBy == 'Даты') {
                    this.tabs[0].active = true;
                    this.tabs[1].active = false;
                    this.tabs[2].active = false;
                    this.group_by = 'date';
                } else if (groupBy == 'Аккаунты') {
                    this.tabs[0].active = false;
                    this.tabs[1].active = false;
                    this.tabs[2].active = true;
                    this.group_by = 'username';
                } else if (groupBy == 'Страницы') {
                    this.tabs[0].active = false;
                    this.tabs[1].active = true;
                    this.tabs[2].active = false;
                    this.group_by = 'subscription_id';
                }

                this.statisticsTableData = []
                this.onSubmit();
            },

            onSubmit() {
                axios
                    .get('./page-statistics', {
                        params: {
                            group_by: this.group_by,
                            from: this.$refs.datepicker.dates.start,
                            to: this.$refs.datepicker.dates.end,
                        },
                    })
                    .then(res => {
                        this.statisticsTableData = res.data
                    })
                    .catch(error => {
                    })
            },

            convertDate(inputFormat) {
                function pad(s) {
                    return (s < 10) ? '0' + s : s;
                }

                var d = new Date(inputFormat)
                return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.')
            }
        },
        components: {
            ProfileWidget,
            HeaderMobile,
            DatePicker,
        },
    }
</script>

<style scoped>
    .wrapper {
        width: 100%;
        margin-left: 139px;
        margin-right: 100px;
        margin-top: 106px;
    }

    h2 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 150%;
    }

    .tab_list_ref {
        display: flex;
        background: #17163c;
        border-radius: 6px;
        width: 522px;
        list-style-type: none;
        margin-top: 90px;
        margin-bottom: 60px;
    }

    .tab_item_ref {
        text-align: center;
        cursor: pointer;
        padding: 10px 58px;
    }

    .tab_item_ref-active {
        text-align: center;
        cursor: pointer;
        background: #3b3c72;
        box-shadow: 0px 3.28342px 3.28342px rgba(0, 0, 0, 0.25);
        border-radius: 4.92513px;
        padding: 10px 58px;
    }

    .statistics_btn {
        background: linear-gradient(
            118.66deg,
            #fe2363 31.25%,
            #fe2363 33.84%,
            #e20042 67.67%
        );
        box-shadow: 0px 3.56542px 3.56542px rgba(0, 0, 0, 0.25);
        border-radius: 5.34813px;
        padding: 13px 60px;
        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        color: #ffffff;
    }

    .form-group {
        display: flex;
        align-items: center;
        width: 600px;
    }

    .statistics-table_block {
        width: 860px;
        max-height: 50vh;
        overflow: scroll;
        margin-bottom: 106px;
        margin-top: 60px;
    }

    .statistics-table_block::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .statistics-table {
        width: 800px;
        background: rgba(59, 60, 114, 0.5);
        border-radius: 5px;
        border-collapse: collapse;
    }

    .statistics-table td:first-child,
    th:first-child {
        padding-left: 45px;
        max-width: 20%;
    }

    .statistics-table td {
        width: 33%;
    }

    .statistics-table th {
        padding-top: 8px;
        padding-bottom: 8px;
        font-family: Montserrat Subrayada;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: #ffffff;
    }

    .statistics-table td {
        padding-top: 19px;
        padding-bottom: 19px;
        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.5);
    }

    .statistics-table tr {
        border-bottom: 1px solid #3b3c72;
    }

    .statistics-table tr:last-child {
        border-bottom: 0px solid red;
    }

    .statistics-table tr:first-child {
        border-bottom: 0px solid red;
    }

    .statistics-table .appoint-column_center {
        text-align: center;
        padding-left: 0 !important;
    }

    .table-row {
        background: rgba(59, 60, 114, 1);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4.44739px 4.44739px 0px 0px;
    }

    .statistics-data_arrow {
        margin-left: 15px;
        margin-bottom: 4px;
    }

    .statistics-block {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .statistics-block_arrows {
        display: flex;
        flex-direction: column;
    }

    .statistics-data_arrow {
        cursor: pointer;
    }

    .statistics_block-export {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
    }

    @media (max-width: 1024px) {
        .wrapper {
            margin: 0;
            padding: 0 100px;
            margin-bottom: 100px;
        }
    }

    @media (max-width: 768px) {
        .wrapper {
            padding: 0 40px;
        }

        .statistics-table_block::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            background-color: #2F2D5C;;
        }

        .statistics-table_block::-webkit-scrollbar-thumb {
            background: #FE2363;
            border-radius: 6px;
        }

        .statistics-table_block {
            width: 99.9%;
            max-height: 50vh;
            overflow-x: auto;
            margin-bottom: 40px;
        }

        .statistics-table {
            min-width: 99.9%;
            background: rgba(59, 60, 114, 0.5);
            border-radius: 5px;
            border-collapse: collapse;
        }
    }

    @media (max-width: 700px) {
        .form-group {
            flex-direction: column;
            width: 100%;
        }

        .statistics_btn {
            width: 100%;
            margin-top: 30px;
        }
    }

    @media (max-width: 600px) {
        .tab_list_ref {
            width: 320px;
            margin: 30px auto;
        }

        .tab_item_ref {
            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            cursor: pointer;
            padding: 13px 18px;
            min-width: 106px;
        }

        .tab_item_ref-active {
            font-family: Montserrat;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            cursor: pointer;
            background: #3b3c72;
            box-shadow: 0px 3.28342px 3.28342px rgba(0, 0, 0, 0.25);
            border-radius: 4.92513px;
            padding: 13px 18px;
            min-width: 106px;
        }
    }

    @media (max-width: 500px) {
        .wrapper {
            margin: 0;
            padding: 0 10px;
        }

        .statistics_header {
            font-family: Montserrat;
            font-size: 22px;
        }

        .statistics_link {
            color: #B4B8ED;
        }
    }
</style>
