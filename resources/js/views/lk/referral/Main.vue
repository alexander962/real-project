<template lang="html">
  <div class="ref_main_container">
    <div class="ref_main_span">
    	Вы будете получать 30% за каждый платеж пользователей, 
        зарегистрировавшихся по вашим реферальным ссылкам.
    </div>
    <div class="ref_main_stats">
        <div class="ref_main_stats_item">
            <div class="ref_main_stats_item_count">
            {{ balance }} ₽
            </div>
            <div class="ref_main_stats_item_name">
                Реферальный баланс
                <div class="ref_main_info">
                    <img :src="require('../../../assets/img/info.svg').default"
                        alt=""
                        width="17px"
                        height="17px">
                    <div class="ref_main_info_popup">
                        <div>Вы можете перевести свой реферальный баланс на основной для продления доступа к сервису</div>
                    </div>
                </div>
            </div>
            <div class="ref_main_stats_item_btn" @click="openPopup(0)">
                перевести
            </div>
        </div>
        <div class="ref_main_stats_item">
            <div class="ref_main_stats_item_count">
            {{ clicks }}
            </div>
            <div class="ref_main_stats_item_name">
            Кликов
            </div>
        </div>
        <div class="ref_main_stats_item">
            <div class="ref_main_stats_item_count">
            {{ registers }}
            </div>
            <div class="ref_main_stats_item_name">
            Регистраций
            </div>
        </div>
        <div class="ref_main_stats_item">
            <div class="ref_main_stats_item_count">
            {{ count }}
            </div>
            <div class="ref_main_stats_item_name">
            Активных пользователей
            </div>
        </div>
        <div class="ref_main_stats_item">
            <div class="ref_main_stats_item_count">
            {{ amount }} ₽
            </div>
            <div class="ref_main_stats_item_name">
            Всего заработано
            </div>
        </div>
    </div>
    <div class="ref_main_btn btn-page" @click="openPopup(1)">
        <img :src="require('../../../assets/img/plus.svg').default"
                alt=""
                width="20px"
                height="20px"> Добавить источник
    </div>

    <table class="page-table table table-lk">
        <thead>
        <tr>
            <th scope="col">Источник</th>
            <th scope="col">Ссылка</th>
            <th scope="col">Клики</th>
            <th scope="col">Регистрации</th>
            <th scope="col">Доход</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, key) in this.data">
            <th scope="row">{{ item['name'] }}</th>
            <td>
                <input type="text" class="input-code" disabled :value="getUrl(item['code'])" />
                <img :src="require('../../../assets/img/copy.svg').default" @click="copy(item['code'])">
                <img :src="require('../../../assets/img/edit.svg').default" @click="openPopup(2, item['id'])">
                <img v-if="item['editable']" :src="require('../../../assets/img/copy.svg').default" @click="openPopup(3, item['id'])">
            </td></td>
            <td>{{ item['clicks'] }}</td>
            <td>{{ item['registers'] }}</td>
            <td>{{ item['amount'] }}</td>
        </tr>
        </tbody>
    </table>

    <div class="ref_main_popup" v-bind:class="{ 'd-none': !open }">
        <div class="ref_main_popup_bg">            
        </div>
        <div class="ref_main_popup_content">
            <div v-if="openType" class="ref_main_popup_close" @click="closePopup"></div>
            <div class="ref_main_popup_header" @click="createSource">
                {{ popupData[openType][1] }}
            </div>
            <label v-if="openType && openType !== 3">Название</label>
            <div v-if="!openType" class="ref_main_popup_description">Вы действительно хотите перевести реферальный баланс на основной?</div>
            <input v-if="openType && openType !== 3" v-model="sourceName" type="text" name="" placeholder="Введите название источника">
            <div v-if="openType" class="btn-page" @click="popupData[openType][0]">
                {{ popupData[openType][2] }}
            </div>
            <div v-else class="ref_main_popup_group_btn">
                <div class="btn-page cancel" @click="closePopup">
                    Отмена
                </div>
                <div class="btn-page" @click="popupData[openType][0]">
                    {{ popupData[openType][2] }}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                open: false,
                openType: 0,
                sourceName: '',
                selected: false,
                popupData: [
                    [
                        this.transferBalance,
                        'Перевести баланс',
                        'Перевести'
                    ],
                    [
                        this.createSource,
                        'Добавить источник',
                        'Создать'
                    ],
                    [
                        this.editSource,
                        'Изменить источник',
                        'Сохранить'
                    ],
                    [
                        this.removeSource,
                        'Удалить источник',
                        'Удалить'
                    ]
                ],
                balance: 0
            }
        },
        computed: {
            clicks: function () {
                return this.data.reduce((s, e) => e.clicks + s,0)
            },
            registers: function () {
                return this.data.reduce((s, e) => e.registers + s,0)
            },
            amount: function () {
                return this.data.reduce((s, e) => e.amount + s,0)
            },
            count: function () {
                return this.data.reduce((s, e) => e.count + s,0)
            }
        },
        beforeRouteEnter(to, from, next) {
            axios.get('/api/lk/referral/link')
                .then((res) => {
                    const data = res.data.data;
                    
                    axios.get('/api/lk/referral/balance')
                        .then((res) => {
                            const balance = res.data.balance;
                            return next(vm => {
                                if (data) {
                                    vm.data = data;
                                    vm.balance = balance;
                                }
                            })
                        });
                }).catch(() => {
                    return next();
                });
        },
        methods: {
            openPopup(type, id = false) {
                this.open = true;
                this.openType = type;
                if (id) this.selectItem(id);
            },
            closePopup() {
                this.open = false;
                this.selected = false;
                this.sourceName = '';
            },
            selectItem(id) {
                this.selected = id;
                console.log(this.data.find(x => x.id === id).name);
                this.sourceName = this.data.find(x => x.id === id).name;
            },
            createSource() {
                axios.post('/api/lk/referral/link', { name: this.sourceName })
                    .then((res) => {
                        console.log(res.data);
                        this.data = res.data.data;
                        this.closePopup();
                    }).catch(() => {});
            },
            editSource() {
                axios.post('/api/lk/referral/link/' + this.selected, { name: this.sourceName })
                    .then((res) => {
                        this.data = res.data.data;
                        this.closePopup();
                    }).catch(() => {});
            },
            removeSource() {
                axios.delete('/api/lk/referral/link/' + this.selected)
                    .then((res) => {
                        this.data = res.data.data;
                        this.closePopup();
                    }).catch(() => {});
            },
            transferBalance () {
                axios.post('/api/lk/referral/balance/transfer')
                    .then((res) => {
                        this.balance = res.data.balance;
                        this.closePopup();
                    }).catch(() => {});
            },
            getUrl(code) {
                return window.location.origin + '/?r=' + code;
            },
            copy(code) {
                const url = this.getUrl(code);
                let myDiv = document.createElement("input");
                myDiv.value = url;
                document.body.appendChild(myDiv);
                myDiv.select();
                document.execCommand('copy');
                myDiv.remove();
                alert('Ссылка скопирована');
                
            }
        }
    }
</script>

<style lang="css" scoped>
    .ref_aggre_container {
        max-width: 450px;
    }
    .ref_main_span {
        margin-top: 30px;
        margin-bottom: 30px;
        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 150%;
    }
    .ref_main_stats {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 90px;
    }
    .ref_main_stats_item {
        background: #3B3C72;
        border-radius: 4.44739px;
        width: calc(20% - 30px);
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 181px;
        justify-content: center;
    }
    .ref_main_stats_item div {
        margin-bottom: 5px;
    }
    .ref_main_stats_item_count {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 22.2369px;
        line-height: 150%;
    }
    .ref_main_stats_item_name {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 17.7896px;
        line-height: 150%;
        padding: 0 40px;

        text-align: center;
    }
    .ref_main_stats_item_btn {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background: #6368A0;
        box-shadow: 0px 3.56542px 3.56542px rgba(0, 0, 0, 0.25);
        border-radius: 5.34813px;
        text-transform: uppercase;
        width: 100%;
        justify-content: center;
        height: 40px;
        align-items: center;
        margin-bottom: -20px!important;
        cursor: pointer;
    }
    .ref_main_popup_description {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
    }
    .ref_main_btn {
        max-width: 295px;
    }
    .ref_main_btn img {
        margin-right: 10px;
    }

    .page-table {
        margin-top: 30px;
        color: #FFFFFF;
    }

    .ref_main_info {
        display: inline-block;
        margin-left: 5px;
        position: relative;
    }

    .ref_main_info_popup {
        position: absolute;
        top: -55px;
        width: 220px;
        left: 80px;
        background-color: #6368A0;
        border-radius: 5px;
        opacity: 0;
        z-index: -1;
        transition: all .6s;
        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 150%;
        text-align: left;
        padding: 19px 0 16px 24px;
    }

    .ref_main_info img:hover + .ref_main_info_popup {
        opacity: 1;
        z-index: 999;
    }

    .ref_main_info_popup:before {
        content: '';
        position: absolute;
        left: -20px;
        bottom: 55px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 20px solid #6368A0;
        z-index: -1;
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .ref_main_popup {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .ref_main_popup_bg {
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.35;
    }

    .ref_main_popup_content {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        max-width: 549px;
        width: 80%;

        background: #3B3C72;
        border-radius: 6px;
        padding: 77px 61px 81px 61px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;

        text-align: center;
        
    }

    .ref_main_popup_header {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 150%;
        margin-bottom: 60px;
    }
    .ref_main_popup_content label {
        display: flex;
        justify-self: flex-end;

        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
    }

    .ref_main_popup_content input {
        border: 1px solid #6368A0;
        box-sizing: border-box;
        border-radius: 6px;
        padding: 17px 24px;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 150%;
        color: #fff;
        outline: none;
        width: 100%;
        background: transparent;
    }

    .ref_main_popup_close {
        -webkit-mask: url('../../../assets/img/close.svg') no-repeat center;
        mask: url('../../../assets/img/close.svg') no-repeat center;
        height: 30px;
        width: 30px;
        background: #fff;
        position: absolute;
        right: 35px;
        top: 50px;
        cursor: pointer;
    }

    .ref_main_popup_content .btn-page {
        text-transform: uppercase;
        margin-top: 40px;
    }

    .ref_main_popup_content .btn-page.cancel {
        background: transparent;
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .ref_main_popup_group_btn {
        display: flex;
        justify-content: space-between;
    }
    .ref_main_popup_group_btn div {
        width: 45%;
    }   
</style>