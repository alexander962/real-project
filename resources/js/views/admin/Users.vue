<template>
    <div class="row m-auto">
        <div class="col-md-10 m-auto">
            <h2 class="mt-5">Пользователи</h2>
            <button class="btn-create_page mt-5" type="button" v-b-modal="createModal()">&#10010; создать пользователя
            </button>
            <b-modal :id="'createModal'" title="Cоздать пользователя" @ok="onSubmit">
                <div>
                    <b-form @reset="onReset">
                        <ul class="password-error" v-for="error in create_errors">
                            <li class="text-danger">{{ error[0] }}</li>
                        </ul>
                        <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                        >
                            <b-form-input
                                id="input-1"
                                v-model="form.email"
                                type="email"
                                placeholder="Enter email"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                v-model="form.name"
                                placeholder="Enter name"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                v-model="form.password"
                                placeholder="Enter password"
                                required
                            ></b-form-input>
                        </b-form-group>


                        <b-form-group id="input-group-3" label="Status:" label-for="input-3">
                            <b-form-select
                                id="input-3"
                                v-model="form.status"
                                :options="statuses"
                                required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Referrer:" label-for="input-3">
                            <b-form-select
                                id="input-3"
                                v-model="form.referrer_id"
                                value-field="id"
                                text-field="name"
                                :options="items"
                                required
                            ></b-form-select>
                        </b-form-group>
                    </b-form>
                </div>
            </b-modal>

            <div class="row mt-5">
                <div class="col-md-6">
                    <span>Фильтр по статусу</span>
                    <select v-model="status" @change="selectByStatus" class="select-status ml-2"
                            style="color: white; background: #2B2754">
                        <option value="3" selected>All</option>
                        <option :value="key" v-for="(status, key) in statuses">{{ status }}</option>
                    </select>
                </div>

                <div class="col-md-6">
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
                        :headers="headers"
                        :items="desserts"
                        :search="search"
                        sort-by="calories"
                        class="elevation-1"
                        :expanded.sync="expanded"
                        item-key="id"
                        show-expand
                    >
                        <template v-slot:item.id="slotData">
                            <div @click="clickColumn(slotData)" style="cursor: pointer">
                                <span class="mr-3 w-25" v-if="!rowOpened"> &#x203A; </span>
                                <span class="mr-3" v-else> &#709; </span>
                                {{ slotData.item.id }}
                            </div>
                        </template>

                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                <div class="row">
                                    <div class="col-md-4 p-5">
                                        <p>id: {{ item.id }}</p>
                                        <p>Логин: {{ item.name }}</p>
                                        <p>E-mail: {{ item.email }}</p>
                                    </div>
                                    <div class="col-md-4 p-5">
                                        <p>Баланс: {{ item.balance }}</p>
                                        <p>Реферальные: {{ item.referral_links }}</p>
                                        <p>Страниц: {{ item.pages }}</p>
                                    </div>
                                    <div class="col-md-4 p-5">
                                        <p>Привел: {{ item.referral ? item.referral.name : '-' }}</p>
                                        <p>Регистрация: {{ item.created_at }}</p>
                                        <p>Последняя активность:
                                            <span v-if="item.last_active_at"> {{ item.last_active_at }}</span>
                                            <span v-else> {{ item.created_at }}</span>
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </template>

                        <template v-slot:item.status="{ item }">
                            <img v-if="item.status == 1" :src="require('../../assets/img/ok_icon.svg').default"
                                 height="20px"
                                 class="m-1" style="color: grey">
                            <span v-if="item.status == 0" class="m-1"
                                  style="color: white; font-size: 28px">&#10006;</span>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <img v-b-modal="editModalId(item.id)" :src="require('../../assets/img/edit.svg').default"
                                 height="20px" class="m-1">
                            <b-modal :id="'editModal' + item.id" title="Обновить пользователя" @ok="updateUser(item)">
                                <div>
                                    <b-form>
                                        <ul class="password-error" v-for="error in edit_errors">
                                            <li class="text-danger">{{ error[0] }}</li>
                                        </ul>
                                        <b-form-group
                                            id="input-group-1"
                                            label="Email address:"
                                            label-for="input-1"
                                        >
                                            <b-form-input
                                                id="input-1"
                                                v-model="form.email"
                                                :placeholder="item.email"
                                                type="email"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                                            <b-form-input
                                                id="input-2"
                                                v-model="form.name"
                                                :placeholder="item.name"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-3" label="Status:" label-for="input-3">
                                            <b-form-select
                                                id="input-3"
                                                v-model="form.status"
                                                :options="statuses"
                                                required
                                            ></b-form-select>
                                        </b-form-group>

                                        <b-form-group id="input-group-3" label="Referrer:" label-for="input-3">
                                            <b-form-select
                                                id="input-3"
                                                v-model="form.referrer_id"
                                                value-field="id"
                                                text-field="name"
                                                :options="items"
                                                required
                                            ></b-form-select>
                                        </b-form-group>
                                    </b-form>
                                </div>
                            </b-modal>

                            <img v-b-modal="statusModalId(item.id)" :src="require('../../assets/img/error.svg').default"
                                 height="20px" class="m-1">
                            <b-modal :id="'statusModal' + item.id" title="Bootstrap-Vue" @ok="changeUserStatus(item)">
                                <p class="my-4">Do you want to block user?</p>
                            </b-modal>

                            <img v-b-modal="modalId(item.id)" :src="require('../../assets/img/delete.svg').default"
                                 height="20px" class="m-1">
                            <b-modal :id="'modal' + item.id" title="Bootstrap-Vue" @ok="deleteUser(item)">
                                <p class="my-4">Are you sure?</p>
                            </b-modal>

                        </template>


                        <template v-slot:no-data>
                            <v-btn
                                color="primary"
                                @click="initialize"
                            >
                                Reset
                            </v-btn>
                        </template>


                    </v-data-table>
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
                dialog: false,
                dialogDelete: false,
                headers: [
                    {text: 'id', align: 'start', value: 'id',},
                    {text: 'Логин', value: 'name'},
                    {text: 'E-mail', value: 'email'},
                    {text: 'Баланс', value: 'balance'},
                    {text: 'Рефераль', value: 'referral_links'},
                    {text: 'Страниц', value: 'pages'},
                    {text: 'Регистрация', value: 'created_at'},
                    {text: 'Статус', value: 'status'},
                    {text: 'Действие', value: 'action'},
                ],
                desserts: [],
                items: [],
                search: '',
                editedIndex: -1,
                editedItem: {},
                status: '',
                statuses: {
                    0: 'Not active',
                    1: 'Active',
                },
                expanded: [],
                singleExpand: false,
                rowOpened: false,
                form: {
                    email: '',
                    name: '',
                    password: '',
                    status: '',
                    referrer_id: '',
                },
                edit_errors: [],
                create_errors: [],
            }
        },

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },
        created() {
            this.initialize(),

                axios.get('./get-users')
                    .then(response => {
                        this.items = response.data
                        console.log(response.data)
                        let i;
                        for (i = 0; i < this.items.length; i++) {
                            this.items[i]['pages'] = this.items[i]['pages'].length
                        }

                        let j;
                        for (j = 0; j < this.items.length; j++) {
                            this.items[j]['referral_links'] = this.items[j]['referral_links'].length
                        }
                    });
        },
        methods: {
            initialize() {
                this.desserts = this.items
            },
            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm() {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.items[0])
                    this.editedIndex = -1
                })
            },
            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.items[0])
                    this.editedIndex = -1
                })
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
            showDetails(user) {
                console.log(user)
            },

            selectByStatus() {
                let status = this.status;

                let aaa = this.items.filter(function (el) {
                    if (status != 3) {
                        return el.status == status;
                    } else {
                        return this.items;
                    }
                }, this);

                this.desserts = aaa;
            },

            clickColumn(slotData) {
                const indexRow = slotData.index;
                const indexExpanded = this.expanded.findIndex(i => i === slotData.item);
                if (indexExpanded > -1) {
                    this.expanded.splice(indexExpanded, 1)
                    this.rowOpened = false;

                } else {
                    this.expanded.push(slotData.item);
                    this.rowOpened = true;
                }
            },
            modalId(i) {
                return 'modal' + i;
            },

            statusModalId(i) {
                return 'statusModal' + i;
            },

            editModalId(i) {
                return 'editModal' + i;
            },

            createModal() {
                return 'createModal';
            },

            deleteUser(item) {
                axios.post('./delete-user/' + item.id)
                    .then(response => {
                        if (response.data.message == 'success') {
                            const index = this.desserts.indexOf(item);
                            this.desserts.splice(index, 1);
                            alert(response.data.message)
                        }
                    });
            },

            changeUserStatus(item) {
                if (item.status == 0) {
                    alert('User has been blocked already');
                } else {
                    axios.post('./change-user-status/' + item.id, {status: 0})
                        .then(response => {
                            if (response.data.message == 'success') {
                                alert(response.data.message)
                            }
                        });
                }
            },

            onSubmit(event) {
                let formData = new FormData();
                formData.append("name", this.form.name);
                formData.append("email", this.form.email);
                formData.append("password", this.form.password);
                formData.append("status", this.form.status);
                formData.append("referrer_id", this.form.referrer_id);

                axios.post('./create-user', formData)
                    .then((res) => {
                        this.desserts = res.data.users;
                        alert('Successfully created')
                    })
                    .catch((error) => {
                        this.create_errors = error.response.data.errors;
                        alert('Something wrong')
                    }).finally(() => {
                    //Perform action in always
                });
            },

            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },

            updateUser(user) {
                axios.post('./update-user/' + user.id, this.form)
                    .then((res) => {
                        this.desserts = res.data.users;
                        alert('Successfully updated')
                    })
                    .catch((error) => {
                        this.edit_errors = error.response.data.errors;
                        alert('Something wrong')
                    }).finally(() => {
                    //Perform action in always
                });

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

    .v-data-table > .v-data-table__wrapper > table > tbody > tr:hover {
        color: black !important;
    }
</style>


