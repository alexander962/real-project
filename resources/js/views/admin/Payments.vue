<template lang="html">
    <div class="wrapper">
        <div>
            <h2>Финансы</h2>
            <ul class="tab_list_ref">
                <li v-for="tab in tabs">
                <router-link :to="tab.link">
                    <div class="tab_item_ref">
                        {{ tab.name }}
                    </div>
                </router-link>
                </li>
            </ul>

            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tabs: [
                    { name: 'Вывод', link: '/admin/payments/withdrawal' },
                    { name: 'Пополнение', link: '/admin/payments/replenishment' },
                ]
            }
        },
        methods: {
        }
    }
</script>

<style lang="css" scoped>
    .wrapper {
        width: 100%;
        padding-left: 139px;
        padding-right: 100px;
        padding-top: 106px;
    }
    h2 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 150%;
    }
    .tab_list_ref {
        background: #17163C;
        border-radius: 6px;
        margin-top: 90px;
        list-style-type: none;
        display: flex;
        padding: 0;
        width: max-content;
    }
    .tab_list_ref a {
        display: flex;
        flex-direction: row;
        width: 162px;
        left: 0;
        align-items: center;
        height: 42px;
        justify-content: center;

        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 150%;
        
    }
</style>