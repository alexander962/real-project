<template>
    <div class="row m-auto">
        <div class="col-md-10 m-auto">

            <h2 class="mt-5">Страницы</h2>

            <button class="btn-create_page mt-5" type="button" v-b-modal="createModal()">&#10010; создать страницу</button>

            <b-modal :id="'createModal'" title="Cоздать страницу" @ok="onSubmit">
                <div>
                    <b-form @reset="onReset" enctype="multipart/form-data">
                        <ul class="password-error" v-for="error in create_errors">
                            <li class="text-danger">{{ error[0] }}</li>
                        </ul>
                        <b-form-group
                            id="input-group-1"
                            label="Название страницы:"
                            label-for="input-1"
                        >
                            <b-form-input
                                id="input-1"
                                v-model="form.page_name"
                                type="text"
                                placeholder="Страница №1"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2a" label="Пользователь :" label-for="input-2a">
                            <b-form-select
                                id="input-2a"
                                v-model="form.user_id"
                                value-field="id"
                                text-field="name"
                                :options="users"
                                required
                                @change="getUserDomains(form.user_id)"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-3a" label="Домен:" label-for="input-3a">
                            <b-form-select
                                id="input-3a"
                                v-model="form.domain_id"
                                value-field="id"
                                text-field="name"
                                :options="domains"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-4a" label="Ссылка страницы:" label-for="input-4a">
                            <b-form-input
                                id="input-4a"
                                v-model="form.link"
                                placeholder="https://domain.ru/page/"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5a" label="Фото страницы:" label-for="input-5a">
                            <b-form-file
                                id="input-5a"
                                accept="image/*"
                                v-model="form.page_photo"
                            ></b-form-file>
                        </b-form-group>

                        <b-form-group id="input-group-6a" label="Тема страницы:" label-for="input-6a">
                            <b-form-input
                                id="input-6a"
                                type="color"
                                v-model="form.bg_color"
                            ></b-form-input>
                        </b-form-group>

                        <h4>Настройки текста</h4>

                        <b-form-group id="input-group-7a" label="Заголовок:" label-for="input-7a">
                            <b-form-input
                                id="input-7a"
                                v-model="form.title"
                                value-field="id"
                                text-field="name"
                                required
                                placeholder="Введите заголовок страницы"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-8a" label="Описание:" label-for="input-8a">
                            <b-form-input
                                id="input-8a"
                                v-model="form.description"
                                value-field="id"
                                text-field="name"
                                placeholder="Введите описание"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-9a" label="Текст на кнопке:" label-for="input-9a">
                            <b-form-input
                                id="input-9a"
                                v-model="form.button_text"
                                value-field="id"
                                text-field="name"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-10a" label="Текст перед подпиской:" label-for="input-10a">
                            <b-form-input
                                id="input-10a"
                                v-model="form.presubscribe_text"
                                placeholder="Подпишись на мой инстаграм и ссылка для скачивания материалов станет доступна"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-11a" label="Таймер обратного отсчёта:" label-for="input-11a">
                            <b-form-checkbox
                                switch size="lg"
                                id="input-11a"
                                v-model="form.is_timer_active"
                            ></b-form-checkbox>
                        </b-form-group>

                        <b-form-group id="input-group-12a" label="Текст на таймере:" label-for="input-12a">
                            <b-form-input
                                id="input-12a"
                                v-model="form.timer_text"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-13a" label="Время таймера (в секундах):" label-for="input-13a">
                            <b-form-input
                                id="input-13a"
                                v-model="form.timer_time"
                                type="number"
                            ></b-form-input>
                        </b-form-group>

                        <h4>Настройки профиля</h4>

                        <b-form-group id="input-group-14a" label="Ник в Instagram:" label-for="input-14a">
                            <b-form-input
                                id="input-14a"
                                v-model="form.instagram_username"
                                placeholder="Введите логин"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-15a" label="Аватарка Instagram:" label-for="input-15a">
                            <b-form-file
                                id="input-15a"
                                v-model="form.instagram_avatar"
                            ></b-form-file>
                        </b-form-group>

                        <h4>Метрики</h4>

                        <b-form-group id="input-group-16a" label="Facebook пиксель:" label-for="input-16a">
                            <b-form-input
                                id="input-16a"
                                placeholder="Введите ID пикселя"
                                v-model="form.fb_pixel"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-17a" label="Tiktok пиксель:" label-for="input-17a">
                            <b-form-input
                                id="input-17a"
                                placeholder="Введите ID пикселя"
                                v-model="form.tik_tok_pixel"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-18a" label="ВК пиксель:" label-for="input-18a">
                            <b-form-input
                                id="input-18a"
                                placeholder="Введите ID пикселя"
                                v-model="form.vk_pixel"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-19a" label="Яндекс метрика:" label-for="input-19a">
                            <b-form-input
                                id="input-19a"
                                placeholder="Введите ID метрики"
                                v-model="form.yandex_metrics"
                            ></b-form-input>
                        </b-form-group>

                        <h4>Настройки страницы получения материала</h4>

                        <b-form-group id="input-group-20a" label="Заголовок при успехе:" label-for="input-20a">
                            <b-form-input
                                id="input-20a"
                                v-model="form.popup_title"
                                placeholder="Успешно"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-21a" label="Описание при успехе:" label-for="input-21a">
                            <b-form-input
                                id="input-21a"
                                v-model="form.popup_text"
                                placeholder="Можете получить материалы, нажав по кнопке ниже."
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-22a" label="Текст на кнопке при успехе:" label-for="input-22a">
                            <b-form-input
                                id="input-22a"
                                v-model="form.popup_button_text"
                                placeholder="ПОЛУЧИТЬ МАТЕРИАЛЫ"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-23a" label="Ссылка на материал:" label-for="input-23a">
                            <b-form-input
                                id="input-23a"
                                v-model="form.popup_button_url"
                                placeholder="Введите ссылку"
                                required
                            ></b-form-input>
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
                        item-key="id"

                    >
                        <template v-slot:item.created_at="slotData">
                            <div style="cursor: pointer">
                                {{ new Date(slotData.item.created_at).getDate() +
                                "." +   (new Date(slotData.item.created_at).getMonth() + 1) +
                                "." +   new Date(slotData.item.created_at).getFullYear() }}

                            </div>
                        </template>

                        <template v-slot:item.page_name="slotData">
                            <div style="cursor: pointer">
                                {{ slotData.item.page_name }}
                                <img :src="require('../../assets/img/part.svg').default" height="20px" class="m-1">
                            </div>
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
                            <b-modal :id="'editModal' + item.id" title="Обновить пользователя" @ok="updatePage(item)">
                                <div>
                                    <b-form @reset="onReset" enctype="multipart/form-data">
                                        <ul class="password-error" v-for="error in create_errors">
                                            <li class="text-danger">{{ error[0] }}</li>
                                        </ul>
                                        <b-form-group
                                            id="input-group-1b"
                                            label="Название страницы:"
                                            label-for="input-1b"
                                        >
                                            <b-form-input
                                                id="input-1b"
                                                v-model="form.page_name"
                                                type="text"
                                                :placeholder="item.page_name"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-2b" label="Пользователь :" label-for="input-2b">
                                            <b-form-select
                                                id="input-2b"
                                                v-model="form.user_id"
                                                value-field="id"
                                                text-field="name"
                                                :options="users"
                                                required
                                                @change="getUserDomains(form.user_id)"
                                            ></b-form-select>
                                        </b-form-group>

                                        <b-form-group id="input-group-3b" label="Домен:" label-for="input-3b">
                                            <b-form-select
                                                id="input-3b"
                                                v-model="form.domain_id"
                                                value-field="id"
                                                text-field="name"
                                                :options="domains"
                                            ></b-form-select>
                                        </b-form-group>

                                        <b-form-group id="input-group-4b" label="Ссылка страницы:" label-for="input-4b">
                                            <b-form-input
                                                id="input-4b"
                                                v-model="form.link"
                                                :placeholder="item.link"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-5b" label="Фото страницы:" label-for="input-5b">
                                            <b-form-file
                                                id="input-5b"
                                                accept="image/*"
                                                v-model="form.page_photo"
                                            ></b-form-file>
                                        </b-form-group>

                                        <b-form-group id="input-group-6b" label="Тема страницы:" label-for="input-6b">
                                            <b-form-input
                                                id="input-6b"
                                                type="color"
                                                v-model="form.bg_color"
                                            ></b-form-input>
                                        </b-form-group>

                                        <h4>Настройки текста</h4>

                                        <b-form-group id="input-group-7b" label="Заголовок:" label-for="input-7b">
                                            <b-form-input
                                                id="input-7b"
                                                v-model="form.title"
                                                value-field="id"
                                                text-field="name"
                                                required
                                                :placeholder="item.title"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-8b" label="Описание:" label-for="input-8b">
                                            <b-form-input
                                                id="input-8b"
                                                v-model="form.description"
                                                :placeholder="item.description"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-9b" label="Текст на кнопке:" label-for="input-9b">
                                            <b-form-input
                                                id="input-9b"
                                                v-model="form.button_text"
                                                :placeholder="item.button_text"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-10b" label="Текст перед подпиской:" label-for="input-10b">
                                            <b-form-input
                                                id="input-10b"
                                                v-model="form.presubscribe_text"
                                                :placeholder="item.presubscribe_text"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-11b" label="Таймер обратного отсчёта:" label-for="input-11b">
                                            <b-form-checkbox
                                                switch size="lg"
                                                id="input-11b"
                                                v-model="form.is_timer_active"
                                            ></b-form-checkbox>
                                        </b-form-group>

                                        <b-form-group id="input-group-12b" label="Текст на таймере:" label-for="input-12b">
                                            <b-form-input
                                                id="input-12b"
                                                v-model="form.timer_text"
                                                :placeholder="item.timer_text"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-b" label="Время таймера (в секундах):" label-for="input-13b">
                                            <b-form-input
                                                id="input-13b"
                                                v-model="form.timer_time"
                                                :placeholder="item.timer_time"
                                                type="number"
                                            ></b-form-input>
                                        </b-form-group>

                                        <h4>Настройки профиля</h4>

                                        <b-form-group id="input-group-14b" label="Ник в Instagram:" label-for="input-14b">
                                            <b-form-input
                                                id="input-14b"
                                                v-model="form.instagram_username"
                                                :placeholder="item.instagram_username"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-15b" label="Аватарка Instagram:" label-for="input-15b">
                                            <b-form-file
                                                id="input-15b"
                                                v-model="form.instagram_avatar"
                                            ></b-form-file>
                                        </b-form-group>

                                        <h4>Метрики</h4>

                                        <b-form-group id="input-group-16b" label="Facebook пиксель:" label-for="input-16b">
                                            <b-form-input
                                                id="input-16b"
                                                :placeholder="item.fb_pixel"
                                                v-model="form.fb_pixel"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-17b" label="Tiktok пиксель:" label-for="input-17b">
                                            <b-form-input
                                                id="input-17b"
                                                :placeholder="item.tik_tok_pixel"
                                                v-model="form.tik_tok_pixel"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-18b" label="ВК пиксель:" label-for="input-18b">
                                            <b-form-input
                                                id="input-18b"
                                                :placeholder="item.vk_pixel"
                                                v-model="form.vk_pixel"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-19b" label="Яндекс метрика:" label-for="input-19b">
                                            <b-form-input
                                                id="input-19b"
                                                :placeholder="item.yandex_metrics"
                                                v-model="form.yandex_metrics"
                                            ></b-form-input>
                                        </b-form-group>

                                        <h4>Настройки страницы получения материала</h4>

                                        <b-form-group id="input-group-20b" label="Заголовок при успехе:" label-for="input-20b">
                                            <b-form-input
                                                id="input-20b"
                                                v-model="form.popup_title"
                                                :placeholder="item.popup_title"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-21b" label="Описание при успехе:" label-for="input-21b">
                                            <b-form-input
                                                id="input-21b"
                                                v-model="form.popup_text"
                                                :placeholder="item.popup_text"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-22b" label="Текст на кнопке при успехе:" label-for="input-22b">
                                            <b-form-input
                                                id="input-22b"
                                                v-model="form.popup_button_text"
                                                :placeholder="item.popup_button_text"
                                                required
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group id="input-group-23b" label="Ссылка на материал:" label-for="input-23b">
                                            <b-form-input
                                                id="input-23b"
                                                v-model="form.popup_button_url"
                                                :placeholder="item.popup_button_url"
                                                required
                                            ></b-form-input>
                                        </b-form-group>
                                    </b-form>
                                </div>
                            </b-modal>

                            <img v-b-modal="statusModalId(item.id)" :src="require('../../assets/img/error.svg').default"
                                 height="20px" class="m-1">
                            <b-modal :id="'statusModal' + item.id" title="Bootstrap-Vue" @ok="changePageStatus(item)">
                                <p class="my-4">Do you want to block the page?</p>
                            </b-modal>

                            <img v-b-modal="modalId(item.id)" :src="require('../../assets/img/delete.svg').default"
                                 height="20px" class="m-1">
                            <b-modal :id="'modal' + item.id" title="Bootstrap-Vue" @ok="deletePage(item)">
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
        name: "Pages",
        data() {
            return {
                dialog: false,
                dialogDelete: false,
                headers: [
                    {text: 'Дата создания', value: 'created_at'},
                    {text: 'id', align: 'start', value: 'id',},
                    {text: 'Имя страницы', value: 'page_name'},
                    {text: 'Instagram', value: 'instagram_username'},
                    {text: 'Пользователь', value: 'user_id'},
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
                form: {
                    page_name: '',
                    link: '',
                    page_photo: '',
                    bg_color: '',
                    presubscribe_text: '',
                    title: '',
                    description: '',
                    button_text: '',
                    is_timer_active: '',
                    timer_text: '',
                    timer_time: '',
                    instagram_username: '',
                    instagram_avatar: '',
                    fb_pixel: '',
                    vk_pixel: '',
                    tik_tok_pixel: '',
                    yandex_metrics: '',
                    popup_title: '',
                    popup_text: '',
                    popup_button_text: '',
                    popup_button_url: '',
                    user_id: '',
                    domain_id: '',
                    status: '',
                },
                edit_errors: [],
                create_errors: [],
                users: [],
                domains: [],
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

                axios.get('./get-pages')
                    .then(response => {
                        this.items = response.data
                    });

            axios.get('./get-users')
                .then(response => {
                    console.log(response)
                    this.users = response.data
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

            deletePage(item) {
                console.log(item)
                axios.post('./delete-page/' + item.id)
                    .then((res) => {
                        alert('Ok')

                        const index = this.desserts.indexOf(item);
                        this.desserts.splice(index, 1);
                        //Perform Success Action
                    })
                    .catch((error) => {
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });
            },

            changePageStatus(item) {
                if (item.status == 0) {
                    alert('The page has been blocked already');
                } else {
                    axios.post('./change-page-status/' + item.id, {status: 0})
                        .then(response => {
                            if (response.data.message == 'success') {
                                this.desserts = response.data.pages;
                                alert(response.data.message)
                            }
                        });
                }
            },

            onSubmit() {
                let formData = new FormData();
                formData.append("page_name", this.form.page_name);
                formData.append("title", this.form.title);
                formData.append("page_photo", this.form.page_photo);
                formData.append("link", this.form.link);
                formData.append("status", this.form.status);
                formData.append("bg_color", this.form.bg_color);
                formData.append("presubscribe_text", this.form.presubscribe_text);
                formData.append("button_text", this.form.button_text);
                formData.append("description", this.form.description);
                formData.append("is_timer_active", this.form.is_timer_active);
                formData.append("timer_text", this.form.timer_text);
                formData.append("timer_time", this.form.timer_time);
                formData.append("instagram_username", this.form.instagram_username);
                formData.append("instagram_avatar", this.form.instagram_avatar);
                formData.append("fb_pixel", this.form.fb_pixel);
                formData.append("tik_tok_pixel", this.form.tik_tok_pixel);
                formData.append("vk_pixel", this.form.vk_pixel);
                formData.append("yandex_metrics", this.form.yandex_metrics);
                formData.append("popup_title", this.form.popup_title);
                formData.append("popup_text", this.form.popup_text);
                formData.append("popup_button_text", this.form.popup_button_text);
                formData.append("popup_button_url", this.form.popup_button_url);
                formData.append("user_id", this.form.user_id);
                formData.append("domain", this.form.domain_id);

                axios.post('./create-page', formData)
                    .then((res) => {
                        this.desserts = res.data.pages;
                        alert('Successfully created')
                        this.create_errors = [];
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

            updatePage(page) {
                axios.post('./update-page/' + page.id, this.form)
                    .then((res) => {
                        this.desserts = res.data.pages;
                        alert('Successfully updated')
                        this.edit_errors = [];
                    })
                    .catch((error) => {
                        this.edit_errors = error.response.data.errors;
                        alert('Something wrong')
                    }).finally(() => {
                    //Perform action in always
                });

            },

            getUserDomains(userId) {
                axios.get('./get-user-domains/' + userId)
                    .then(response => {
                        this.domains = response.data
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


