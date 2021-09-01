<template lang="html">
  <div class="ref_pay_container">
    <div class="ref_pay_container_balance">
        <div class="ref_pay_balance_content">
            <div class="ref_pay_balance_header">Баланс:</div>
            <div class="ref_pay_body">
                <div class="ref_pay_balance_value">
                {{ balance }} ₽
                </div>
                <div class="ref_pay_btn btn-page" @click="openPopup">
                    вывести
                </div>
            </div>
            <div class="ref_pay_description">Минимальная сумма вывода 500 руб</div>
        </div>
    </div>

    <table class="page-table table table-lk">
        <thead>
        <tr>
            <th scope="col">Дата</th>
            <th scope="col">Сумма</th>
            <th scope="col">Способ вывода</th>
            <th scope="col">Статус</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, key) in this.data">
            <th scope="row">{{ $moment(item['created_at']).format('DD.MM.YYYY') }}</th>
            <td>{{ item['amount'] }}</td>
            <td>{{ item['system_type'] }} {{ item['requisites'] }}</td>
            <td><div :class="[ 'ref_pay_icon ref_pay_icon_' + item['status']]"></div></td>
        </tr>
        </tbody>
    </table>

    <div class="ref_pay_popup" v-bind:class="{ 'd-none': !open }">
        <div class="ref_pay_popup_bg">            
        </div>
        <div class="ref_pay_popup_content">
            <div class="ref_pay_popup_close" @click="closePopup"></div>
            <div class="ref_pay_popup_header">
                Заказать выплату
            </div>
            <div class="ref_pay_popup_item">
                <label>Система для выплаты</label>
                <input v-model="system" type="text" name="" placeholder="Введите название системы">
                <p class="text-danger error" v-if="errors.system_type">{{ errors.system_type[0] }}</p>
            </div>
            <div class="ref_pay_popup_item">
                <label>Реквизиты</label>
                <input v-model="requisites" type="text" name="" placeholder="Введите реквизиты">
                <p class="text-danger error" v-if="errors.requisites">{{ errors.requisites[0] }}</p>
            </div>
            <div class="ref_pay_popup_item">
                <label>Сумма</label>
                <input v-model="amount" type="number" name="" placeholder="Введите сумму">
                <p class="text-danger error" v-if="errors.amount">{{ errors.amount[0] }}</p>
            </div>
            <div class="btn-page" @click="createWithdrawal">
                Вывести
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
                system: '',
                requisites: '',
                amount: '',
                balance: 0,
                errors: []
            }
        },
        beforeRouteEnter(to, from, next) {
            axios.get('/api/lk/referral/payments')
                .then((res) => {
                    const data = res.data.data;
                    return next(vm => {
                        if (data) {
                            vm.data = data;
                            vm.balance = res.data.balance;
                        }
                    });
                }).catch(() => {
                    return next();
                });
        },
        methods: {
            openPopup() {
                this.open = true;
            },
            closePopup() {
                this.open = false;
            },
            createWithdrawal() {
                axios.post('/api/lk/referral/payments', { system_type: this.system, requisites: this.requisites, amount: this.amount })
                    .then((res) => {
                        this.data = res.data.data;
                        this.closePopup();
                    }).catch((err) => {
                        this.errors = err.response.data.errors;
                    });
            }
        }
    }
</script>

<style lang="css" scoped>
    .ref_pay_container_balance {
        margin-top: 60px;
    }
    .ref_pay_btn {
        max-width: 295px;
    }
    .ref_pay_btn img {
        margin-right: 10px;
    }

    .page-table {
        margin-top: 30px;
        color: #FFFFFF;
    }
    .ref_pay_popup {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .ref_pay_popup_bg {
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.35;
    }

    .ref_pay_popup_content {
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

    .ref_pay_popup_header {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 150%;
        margin-bottom: 60px;
    }
    .ref_pay_popup_content label {
        display: flex;
        justify-self: flex-end;

        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
    }

    .ref_pay_popup_content input {
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

    .ref_pay_popup_content input::placeholder {
        color: #9FA1B7;
    }

    .ref_pay_popup_close {
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

    .ref_pay_popup_content .btn-page {
        text-transform: uppercase;
    }

    .ref_pay_balance_content {
        background: #3B3C72;
        max-width: 404px;
        border-radius: 4.44739px;
        padding: 28px 41px;
    }

    .ref_pay_balance_header {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 150%;

        margin-bottom: 25px;
    }
    .ref_pay_balance_value {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 150%;
    }

    .ref_pay_btn {
        text-transform: uppercase;
        height: 40px;
        min-width: 160px;
    }

    .ref_pay_body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .ref_pay_description {
        margin-top: 30px;
        text-align: center;
    }

    .ref_pay_popup_item {
        margin-bottom: 39px;
    }

    .error {
        text-align: left;
        font-size: 14px;
    }

    .ref_pay_icon_waiting {
        -webkit-mask: url('../../../assets/img/timer.svg') no-repeat center;
        mask: url('../../../assets/img/timer.svg') no-repeat center;
        height: 20px;
        width: 20px;
    }

    .ref_pay_icon_success {
        -webkit-mask: url('../../../assets/img/ok_icon.svg') no-repeat center;
        mask: url('../../../assets/img/ok_icon.svg') no-repeat center;
        height: 18px;
        width: 18px;
    }

    .ref_pay_icon_cancel {
        -webkit-mask: url('../../../assets/img/close.svg') no-repeat center;
        mask: url('../../../assets/img/close.svg') no-repeat center;
        height: 15px;
        width: 15px;
    }

    .ref_pay_icon {
        background: #fff;
        mask-size: 100%!important;
        -webkit-mask-size: 100%!important;
        margin: auto;
    }

</style>