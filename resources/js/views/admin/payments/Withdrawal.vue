<template>
    <div class="row m-auto">
        <div class="col-md-12 m-auto">
            <div class="row mt-5">
                <div class="col-md-4">
                    <span>Фильтр по статусу</span>
                    <select v-model="status" @change="findPayments" class="select-status ml-2">
                        <option value="0" selected>Все</option>
                        <option :value="key" v-for="(status, key) in statuses">{{ status }}</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <span>С выбранными</span>
                    <select v-model="action" @change="changeStatus" class="select-status ml-2">
                        <option value="0" selected>All</option>
                        <option :value="key" v-for="(action, key) in actions">{{ action }}</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <input
                        v-model="search"
                        class="search"
                        append-icon="mdi-magnify"
                        placeholder="Поиск"
                        single-line
                        hide-details
                    >
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-12">
                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items.sync="items"
                        :options.sync="options"
                        id="table-with-filter"
                        :items-per-page="itemsPerPage"
                        page-count="totalPage"
                        item-key="id"
                        :loading="loading"
                        loading-text="Loading... Please wait"
                        show-select
                        hide-default-footer
                    >
                        <template v-slot:item.created_at="{item}">
                            <div>{{ $moment(item['created_at']).format('DD.MM.YYYY') }}</div>
                        </template>

                        <template v-slot:item.system_type="{item}">
                            <div class="table_abs">
                                ({{ item['system_type'] }}) {{ item['requisites'] }}
                                <img :src="require('../../../assets/img/copy.svg').default" @click="copy(item['requisites'])">
                            </div>
                        </template>

                        <template v-slot:item.status="{ item }">
                            <div :class="[ 'table_icon table_icon_' + item['status']]"></div>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <img v-b-modal.editModal @click="setItem(item)" :src="require('../../../assets/img/edit.svg').default" height="20px" class="m-1">
                            
                            <img v-b-modal.deleteModal @click="setItem(item)" :src="require('../../../assets/img/delete.svg').default"
                                height="20px" class="m-1">
                            
                        </template>


                        <template v-slot:no-data>
                            <v-btn
                                color="primary"
                                @click="findPayments"
                            >
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                    <v-pagination
                        v-model="options.page"
                        id="custom-pagination"
                        :length="totalPage"
                        :total-visible="9"
                        
                    ></v-pagination>

                    <b-modal id="editModal" @ok="changeItem()">
                        <div class="form_item">
                            <label>Система для выплаты</label>
                            <input v-model="activeItem.system_type" type="text" name="" placeholder="Введите название системы">
                            <p class="text-danger error" v-if="errors.system_type">{{ errors.system_type[0] }}</p>
                        </div>
                        <div class="form_item">
                            <label>Реквизиты</label>
                            <input v-model="activeItem.requisites" type="text" name="" placeholder="Введите реквизиты">
                            <p class="text-danger error" v-if="errors.requisites">{{ errors.requisites[0] }}</p>
                        </div>
                        <div class="form_item">
                            <label>Сумма</label>
                            <input v-model="activeItem.amount" type="number" name="" placeholder="Введите сумму">
                            <p class="text-danger error" v-if="errors.amount">{{ errors.amount[0] }}</p>
                        </div>
                    </b-modal>

                    <b-modal id="deleteModal" @ok="deleteItem()">
                        <p class="my-4">Вы уверены, что хотите удалить запись с id {{ activeItem.id }}?</p>
                    </b-modal>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Users",
        data() {
            return {
                headers: [
                    {text: 'id', value: 'id', align: 'center'},
                    {text: 'Дата создания', value: 'created_at', align: 'center'},
                    {text: 'Пользователь', value: 'user.name', align: 'center'},
                    {text: 'Сумма', value: 'amount', align: 'center'},
                    {text: 'Способ вывода', value: 'system_type', align: 'center'},
                    {text: 'Статус', value: 'status', align: 'center'},
                    {text: 'Действие', value: 'action', align: 'center', sortable: false},
                ],
                items: [],
                search: '',
                status: '',
                statuses: {
                    'waiting': 'Ожидание',
                    'success': 'Выплачено',
                    'cancel': 'Отклонено'
                },
                actions: {
                    'waiting': 'Отметить как ожидает',
                    'success': 'Отметить как выплачено',
                    'cancel': 'Отметить как отклонено'
                },
                selected: [],
                totalPage: 0,
                itemsPerPage: 5,
                totalItems: 0,
                loading: false,
                errors: [],
                activeItem: [],
                options: { page: 1 },
                action: false
            }
        },

        watch: {
            search() {
                this.findPayments();
            },
            options: {
                handler () {
                    console.log(this.options);
                    this.findPayments();
                },
                deep: true,
            },
        },
        created() {
            this.findPayments();
        },
        methods: {
            findPayments() {
                let vm = this;
                this.selected = [];
                this.loading = true;
                this.items = [];
                axios.post('/api/admin/payments/withdrawal',
                    {
                        status: this.status,
                        search: this.search,
                        perpage: this.itemsPerPage,
                        next: this.options.page,
                        sortBy: this.options.sortBy ? this.options.sortBy[0] : false,
                        sortDesc: this.options.sortBy ? this.options.sortDesc[0] : false
                    }
                ).then(response => {
                    vm.items = response.data.data;
                    vm.totalItems = response.data.count;
                    vm.totalPage = Math.ceil(vm.totalItems / vm.itemsPerPage);
                    vm.loading = false;
                });
            },

            setItem(item, type = false) {
                console.log(item);
                this.activeItem = item;
            },

            changeStatus() {
                axios.post('/api/admin/payments/withdrawal/status',
                    {
                        ids: this.selected.map((item) => item.id),
                        status: this.action
                    }
                ).then(response => {
                    this.findPayments();
                });
            },
            deleteItem(item) {
                axios.delete('/api/admin/payments/withdrawal/' + this.activeItem.id).then(response => {
                    this.findPayments();
                });
            },

            changeItem() {
                axios.post('/api/admin/payments/withdrawal/' + this.activeItem.id,
                    {
                        system_type: this.activeItem.system_type,
                        requisites: this.activeItem.requisites,
                        amount: this.activeItem.amount
                    })
                    .then(response => {
                        this.findPayments();
                    });
            },
            copy(text) {
                let myDiv = document.createElement("input");
                myDiv.value = text;
                document.body.appendChild(myDiv);
                myDiv.select();
                document.execCommand('copy');
                myDiv.remove();
                alert('Реквизиты скопированы');
                
            }
        },
    }
</script>

<style scoped>

    .datatable {
        color: white;
        background: grey;
    }

    .block {
        width: 80%;
        margin: auto;
    }

    .btn-create_page {
        display: flex;
        justify-content: center;
        align-items: center;

        /* width: 264px;
        height: 59px; */
        padding: 16px 50px;
        margin-right: 40px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;

        cursor: pointer;

        background: linear-gradient(118.66deg, #FE2363 31.25%, #FE2363 33.84%, #E20042 67.67%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }

    .select-status {
        width: 263px;
        height: 46px;
        border: 1px solid #6368A0;
        box-sizing: border-box;
        border-radius: 6px;
    }

    .search {
        width: 263px;
        height: 46px;
        border: 1px solid #6368A0;
        box-sizing: border-box;
        border-radius: 6px;
        float: right;
        color: white;
    }

    .v-data-table-header thead tr:not(:last-child) {
        background: red;
    }


    .theme--light.v-data-table {
        width: 1242px;
        height: 41px;
        background: #2B2754 !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4.44739px 4.44739px 0px 0px;
        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 150%;
        color: #FFFFFF;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: azure;
    }


    .v-data-table > .v-data-table__wrapper > table {
        width: 1242px;
        height: 41px;
        background: #3B3C72 !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4.44739px 4.44739px 0px 0px;
        color: #FFFFFF;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        width: 1242px;
        height: 156px;
        background: #2B2754;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 0px;
        font-family: Rubik;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 150%;
        color: #FFFFFF;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: #2F87A6 !important;
    }

    .table_icon_waiting {
        -webkit-mask: url('../../../assets/img/timer.svg') no-repeat center;
        mask: url('../../../assets/img/timer.svg') no-repeat center;
        height: 20px;
        width: 20px;
    }

    .table_icon_success {
        -webkit-mask: url('../../../assets/img/ok_icon.svg') no-repeat center;
        mask: url('../../../assets/img/ok_icon.svg') no-repeat center;
        height: 18px;
        width: 18px;
    }

    .table_icon_cancel {
        -webkit-mask: url('../../../assets/img/close.svg') no-repeat center;
        mask: url('../../../assets/img/close.svg') no-repeat center;
        height: 15px;
        width: 15px;
    }

    .table_icon {
        background: #fff;
        mask-size: 100%!important;
        -webkit-mask-size: 100%!important;
        margin: auto;
    }
    .table_abs {
        position: relative;
    }
    .table_abs img {        
        position: absolute;
        right: 0;
        cursor: pointer;
    }
</style>


