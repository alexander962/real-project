<template>
    <div>
        <div class="row" v-if="isEditing == false" :id="'blockId' + this.page.id">
            <div class="col-md-5 page-description">
                <div class="row">
                    <div class="col-md-8"><h4>{{ this.page.page_name }}</h4></div>
                    <div class="col-md-3"> # {{ this.index + 1 }}</div>
                </div>

                <div class="row" style="margin-top: 0">
                    <div class="col-md-4">
                        <p>id:{{ this.page.id }}</p>
                    </div>
                    <div class="col-md-4">
                        <p>domain:{{ this.page.domain ? this.page.domain.name : '' }}</p>
                    </div>
                </div>

                <div class="row" style="margin-top: 0">
                    <div class="col-md-3">
                        <img :src="require('../../assets/img/Vector.png').default" height="20px" class="mr-3">
                    </div>
                    <div class="col-md-7">
                        <h4> {{ this.page.instagram_username }}</h4>
                    </div>
                </div>

                <div class="row" style="margin-top: 0">
                    <div class="col-md-3" style="padding-top: 0;">
                        <h4> {{ this.page.view_count ? this.page.view_count : 0 }}</h4>
                    </div>
                    <div class="col-md-5" style="padding-top: 0;">
                        <p>Просмотры</p>
                    </div>
                </div>

                <div class="row" style="margin-top: 0">
                    <div class="col-md-3" style="padding-top: 0;">
                        <h4> {{ this.subscribers.length ?  this.subscribers.length : 0  }}</h4>
                    </div>
                    <div class="col-md-5" style="padding-top: 0;">
                        <p>Подписки</p>
                    </div>
                </div>

                <div class="row" style="margin-top: 0">
                    <div class="col-md-3" style="padding-top: 0;">
                        <h4> {{ !this.subscribers.length || !this.page.view_count ?  '-' : this.subscribers.length / this.page.view_count  }}</h4>
                    </div>
                    <div class="col-md-5" style="padding-top: 0;">
                        <span>CTR</span>
                        <span>{{ this.page.domain ? this.page.domain.status : '' }}</span>
                    </div>
                    <div class="col-md-4" style="padding-top: 0;">
                        <span :class="this.page.status == 1 ? 'active ' : 'blocked'"> {{ this.page.status == 1 ? '&bull; активная ' : '&bull; заблокирована'  }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 page-settings">
                <p @click="editPage()" style="cursor: pointer">Изменить</p>
                <p @click="duplicatePage()" style="cursor: pointer">Дублировать</p>
                <p  style="cursor: pointer">
                    <span @click.stop.prevent="copyLink">Скопировать ссылку</span>
                    <input type="hidden" :id="'copyId_' + this.page.id" :value="this.page.link">
                </p>
                <p v-b-modal="editModalId(this.page.id)">Открыть</p>

                <b-modal :id="'editModal' + this.page.id" title="Открыть пользователя">
                    <div>
                        <b-form>
                            <b-form-group
                                id="input-group-1b"
                                label="Название страницы:"
                                label-for="input-1b"
                            >
                                <b-form-input
                                    id="input-1b"
                                    type="text"
                                    v-model="this.page.page_name"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-2b" label="Пользователь :" label-for="input-2b">
                                <b-form-input
                                    id="input-2b"
                                    v-model="this.page.user_id"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-3b" label="Домен:" label-for="input-3b">
                                <b-form-input
                                    id="input-3b"
                                    v-model="this.page.domain_id"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-4b" label="Ссылка страницы:" label-for="input-4b">
                                <b-form-input
                                    id="input-4b"
                                    v-model="this.page.link"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

<!--                            <b-form-group id="input-group-5b" label="Фото страницы:" label-for="input-5b">-->
<!--                                <b-form-file-->
<!--                                    id="input-5b"-->
<!--                                    accept="image/*"-->
<!--                                    v-model="form.page_photo"-->
<!--                                    readonly-->
<!--                                    style="color: black; width: 100%"-->
<!--                                ></b-form-file>-->
<!--                            </b-form-group>-->

                            <b-form-group id="input-group-6b" label="Тема страницы:" label-for="input-6b">
<!--                                <div class="page-theme_block  {{ this.page.bg_color }}></div>-->
                            </b-form-group>

                            <h4>Настройки текста</h4>

                            <b-form-group id="input-group-7b" label="Заголовок:" label-for="input-7b">
                                <b-form-input
                                    id="input-7b"
                                    v-model="this.page.title"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-8b" label="Описание:" label-for="input-8b">
                                <b-form-input
                                    id="input-8b"
                                    v-model="this.page.description"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-9b" label="Текст на кнопке:" label-for="input-9b">
                                <b-form-input
                                    id="input-9b"
                                    v-model="this.page.button_text"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-10b" label="Текст перед подпиской:" label-for="input-10b">
                                <b-form-input
                                    id="input-10b"
                                    v-model="this.page.presubscribe_text"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-11b" label="Таймер обратного отсчёта:" label-for="input-11b">
                                <b-form-checkbox
                                    switch size="lg"
                                    id="input-11b"
                                    v-model="this.page.is_timer_active"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-checkbox>
                            </b-form-group>

                            <b-form-group id="input-group-12b" label="Текст на таймере:" label-for="input-12b">
                                <b-form-input
                                    id="input-12b"
                                    v-model="this.page.timer_text"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-b" label="Время таймера (в секундах):" label-for="input-13b">
                                <b-form-input
                                    id="input-13b"
                                    v-model="this.page.timer_time"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <h4>Настройки профиля</h4>

                            <b-form-group id="input-group-14b" label="Ник в Instagram:" label-for="input-14b">
                                <b-form-input
                                    id="input-14b"
                                    v-model="this.page.instagram_username"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

<!--                            <b-form-group id="input-group-15b" label="Аватарка Instagram:" label-for="input-15b">-->
<!--                                <b-form-file-->
<!--                                    id="input-15b"-->
<!--                                    v-model="form.instagram_avatar"-->
<!--                                ></b-form-file>-->
<!--                            </b-form-group>-->

                            <h4>Метрики</h4>

                            <b-form-group id="input-group-16b" label="Facebook пиксель:" label-for="input-16b">
                                <b-form-input
                                    id="input-16b"
                                    readonly
                                    style="color: black; width: 100%"
                                    v-model="this.page.fb_pixel"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-17b" label="Tiktok пиксель:" label-for="input-17b">
                                <b-form-input
                                    id="input-17b"
                                    readonly
                                    style="color: black; width: 100%"
                                    v-model="this.page.tik_tok_pixel"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-18b" label="ВК пиксель:" label-for="input-18b">
                                <b-form-input
                                    id="input-18b"
                                    readonly
                                    style="color: black; width: 100%"
                                    v-model="this.page.vk_pixel"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-19b" label="Яндекс метрика:" label-for="input-19b">
                                <b-form-input
                                    id="input-19b"
                                    readonly
                                    style="color: black; width: 100%"
                                    v-model="this.page.yandex_metrics"
                                ></b-form-input>
                            </b-form-group>

                            <h4>Настройки страницы получения материала</h4>

                            <b-form-group id="input-group-20b" label="Заголовок при успехе:" label-for="input-20b">
                                <b-form-input
                                    id="input-20b"
                                    v-model="this.page.popup_title"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-21b" label="Описание при успехе:" label-for="input-21b">
                                <b-form-input
                                    id="input-21b"
                                    v-model="this.page.popup_text"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-22b" label="Текст на кнопке при успехе:" label-for="input-22b">
                                <b-form-input
                                    id="input-22b"
                                    v-model="this.page.popup_button_text"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-23b" label="Ссылка на материал:" label-for="input-23b">
                                <b-form-input
                                    id="input-23b"
                                    v-model="this.page.popup_button_url"
                                    readonly
                                    style="color: black; width: 100%"
                                ></b-form-input>
                            </b-form-group>
                        </b-form>
                    </div>
                </b-modal>

                <router-link to="/lk/statistics">
                    <a href="" ><p>Статистика</p> </a>
                </router-link>

                <!-- Small modal -->
                <a type="button" data-toggle="modal" data-target=".bd-example-modal-sm"><p>Удалить</p></a>

                <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog"
                     aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content" style="color: black">
                            <h4 style="color: black; text-align: center">Вы уверены ? </h4>
                            <button type="button" data-dismiss="modal" style="color: black">Закрыть</button>
                            <button @click="deletePage"  data-dismiss="modal">Да</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <form class="" @submit.prevent="onSubmit" method="post" enctype="multipart/form-data" v-else>
            <div>
                <!-- Редактирование  СТРАНИЦЫ -->
                <b-button v-b-toggle.collapse-1 class="m-1">Редактирование страницы</b-button>
                <b-collapse id="collapse-1" class="mt-2" visible>
                    <b-card>Название страницы (видно только вам)<span class="star">*</span></b-card>
                    <input type="text" v-model="form.page_name" placeholder="Страница №1">
                    <b-card>Домен</b-card>
                    <select class="" v-model="form.domain">
                        <option value="" selected>Выберите домен</option>
                        <option :value="domain.id" v-for="domain in this.domains" style="color: black">{{ domain.name
                            }}
                        </option>
                    </select>
                    <b-card>Ссылка страницы<span class="star">*</span></b-card>
                    <input type="text" v-model="form.link" placeholder="https://domain.ru/page/mypage">

                    <b-card class="bg">Цвет фона</b-card>

                    <div class="page-theme">
                        <div class="page-theme_main">
                            <div class="page-theme_block page-theme_block-1" @click="form.bg_color = 'page-theme_block-1'"></div>
                            <div class="page-theme_block page-theme_block-2"  @click="form.bg_color = 'page-theme_block-2'"></div>
                            <div class="page-theme_block page-theme_block-3"  @click="form.bg_color = 'page-theme_block-3'"></div>
                            <div class="page-theme_block page-theme_block-4"  @click="form.bg_color = 'page-theme_block-1'"></div>
                        </div>
                        <div class="page-theme_main">
                            <div class="page-theme_block page-theme_block-5"  @click="form.bg_color = 'page-theme_block-4'"></div>
                            <div class="page-theme_block page-theme_block-6"  @click="form.bg_color = 'page-theme_block-5'"></div>
                            <div class="page-theme_block page-theme_block-7"  @click="form.bg_color = 'page-theme_block-6'"></div>
                            <div class="page-theme_block page-theme_block-8"  @click="form.bg_color = 'page-theme_block-7'"></div>
                        </div>
                    </div>
                    <b-card class="photo">Фото страницы</b-card>
                    <input type="file" class="" id="photo" accept="image/*" v-on:change="pageImageChange">
                </b-collapse>
            </div>
            <!--         НАСТРОЙКИ ТЕКСТА-->
            <div>
                <b-button v-b-toggle.collapse-2 class="m-1">Настройки текста</b-button>
                <b-collapse id="collapse-2" class="mt-2">
                    <b-card>Заголовок<span class="star">*</span></b-card>
                    <input type="text" v-model="form.title" placeholder="Введите заголовок страницы">
                    <b-card>Описание<span class="star">*</span></b-card>
                    <input type="text" v-model="form.description" placeholder="Введите описание">
                    <b-card>Текст на кнопке<span class="star">*</span></b-card>
                    <input type="text" v-model="form.button_text" placeholder="">
                    <b-card>Текст перед подпиской<span class="star">*</span></b-card>
                    <input type="text" v-model="form.presubscribe_text" placeholder="">
                    <b-card>Таймер обратного отсчета</b-card>
                    <b-form-checkbox v-model="form.is_timer_active" switch size="lg">
                        <b>{{ form.is_timer_active ? 'on' : 'off' }}</b>
                    </b-form-checkbox>
                    <b-card>Текст на таймере</b-card>
                    <input type="text" v-model="form.timer_text" placeholder="">
                    <b-card>Время таймера(в секундах)</b-card>
                    <input type="number" step="1" v-model="form.timer_time" placeholder="">
                </b-collapse>
            </div>
            <!-- НАСТРОЙКИ ПРОФИЛЯ -->
            <div>
                <b-button v-b-toggle.collapse-3 class="m-1">Настройки профиля</b-button>
                <b-collapse id="collapse-3" class="mt-2">
                    <div>
                        <img :src="require('../../assets/img/profile2.svg').default" height="50px">
                        <span>Аватарка Instagram</span>
                        <div class="">Аватарка Instagram</div>

                        <input type="file" class="" id="ava" accept="image/*" v-on:change="onFileChange">
                        <div class="error"></div>
                        <label for="ava" id=""><img></label>
                    </div>
                </b-collapse>
            </div>
            <!-- МЕТРИКИ -->
            <div>
                <b-button v-b-toggle.collapse-4 class="m-1">Метрики</b-button>
                <b-collapse id="collapse-4" class="mt-2">
                    <b-card>Facebook пиксель</b-card>
                    <input type="text" v-model="form.fb_pixel" placeholder="Введите ID пикселя">
                    <b-card>Tiktok пиксель</b-card>
                    <input type="text" v-model="form.tik_tok_pixel" placeholder="Введите ID пикселя">
                    <b-card>ВК пиксель</b-card>
                    <input type="text" v-model="form.vk_pixel" placeholder="Введите ID пикселя">
                    <b-card>Яндекс метрика</b-card>
                    <input type="text" v-model="form.yandex_metrics" placeholder="Введите ID метрики">
                </b-collapse>
            </div>
            <!-- НАСТРОЙКИ СТРАНИЦЫ ПОЛУЧЕНИЯ МАТЕРИАЛА -->
            <div>
                <b-button v-b-toggle.collapse-5 class="m-1">Настройки страницы получения материала</b-button>
                <b-collapse id="collapse-5" class="mt-2">
                    <b-card>Заголовок при успехе<span class="star">*</span></b-card>
                    <input type="text" v-model="form.popup_title" placeholder="">
                    <b-card>Описание при успехе<span class="star">*</span></b-card>
                    <input type="text" v-model="form.popup_text" placeholder="">
                    <b-card>Текст на кнопке при успехе<span class="star">*</span></b-card>
                    <input type="text" v-model="form.popup_button_text" placeholder="">
                    <b-card>Ссылка на материал</b-card>
                    <input type="text" v-model="form.popup_button_url" placeholder="Введите ссылку">
                </b-collapse>
            </div>
            <div class="d-flex justify-content-start mt-5 ml-4">
                <div class="btn-cancel_create" @click="isEditing = false">Отмена</div>
                <button class="btn-create_page" type="submit">Изменить</button>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        name: "PageDescription",
        props: ['page', 'index'],

        data() {
            return {
                form: {
                    page_name: this.checkIfNull(this.page.page_name),
                    page_photo: this.checkIfNull(this.page.page_photo) ,
                    domain: this.checkIfNull(this.page.domain ? this.page.domain.id : null) ,
                    link: this.checkIfNull( this.page.link),
                    title: this.checkIfNull(this.page.title) ,
                    description: this.checkIfNull(this.page.description) ,
                    bg_color: this.checkIfNull(this.page.bg_color) ,
                    button_text: this.checkIfNull(this.page.button_text) ,
                    presubscribe_text: this.checkIfNull(this.page.presubscribe_text) ,
                    is_timer_active: this.checkIfNull(this.page.is_timer_active) ,
                    timer_text: this.checkIfNull(this.page.timer_text) ,
                    timer_time: this.checkIfNull(this.page.timer_time) ,
                    instagram_username: this.checkIfNull(this.page.instagram_username) ,
                    instagram_avatar: this.checkIfNull(this.page.instagram_avatar) ,
                    fb_pixel:this.checkIfNull(this.page.fb_pixel),
                    tik_tok_pixel:this.checkIfNull(this.page.tik_tok_pixel) ,
                    vk_pixel:this.checkIfNull(this.page.vk_pixel) ,
                    yandex_metrics:this.checkIfNull(this.page.yandex_metrics),
                    popup_title:this.checkIfNull(this.page.popup_title) ,
                    popup_text:this.checkIfNull(this.page.popup_text) ,
                    popup_button_text:this.checkIfNull(this.page.popup_button_text) ,
                    popup_button_url:this.checkIfNull(this.page.popup_button_url) ,
                },
                isEditing: false,
                domains: [],
                subscribers: [],
            }
        },

        methods: {
            editPage() {
                this.isEditing = true;
            },

            onSubmit() {
                let formData = new FormData();
                formData.append("page_photo", this.form.page_photo);
                formData.append("instagram_avatar", this.form.instagram_avatar);
                formData.append("page_name", this.form.page_name);
                formData.append("domain_id", this.form.domain);
                formData.append("link", this.form.link);
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);
                formData.append("bg_color", this.form.bg_color);
                formData.append("button_text", this.form.button_text);
                formData.append("presubscribe_text", this.form.presubscribe_text);
                formData.append("is_timer_active", this.form.is_timer_active);
                formData.append("timer_text", this.form.timer_text);
                formData.append("timer_time", this.form.timer_time);
                formData.append("instagram_username", this.form.instagram_username);
                formData.append("fb_pixel", this.form.fb_pixel);
                formData.append("tik_tok_pixel", this.form.tik_tok_pixel);
                formData.append("vk_pixel", this.form.vk_pixel);
                formData.append("yandex_metrics", this.form.yandex_metrics);
                formData.append("popup_title", this.form.popup_title ?? this.page.popup_title);
                formData.append("popup_text", this.form.popup_text ?? this.page.popup_text);
                formData.append("popup_button_text", this.form.popup_button_text ?? this.page.popup_button_text);
                formData.append("popup_button_url", this.form.popup_button_url ?? this.page.popup_button_url);

                axios.post('./update-subscribe-page/' + this.page.id, formData)
                    .then((res) => {
                        //Perform Success Action
                        this.page = res.data.page;
                        this.isEditing = false;
                        this.page.domain = res.data.domain
                        alert('Successfully updated')
                    })
                    .catch((error) => {
                        alert('Smth wrong')
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });
            },

            pageImageChange(event) {
                this.form.page_photo = event.target.files[0];
            },

            onFileChange(event) {
                this.form.instagram_avatar = event.target.files[0];
            },

            duplicatePage() {
                axios.post('./duplicate-subscribe-page', this.page)
                    .then((res) => {
                        //Perform Success Action
                        this.page = res.data.page;
                        console.log(res.data.page)
                        this.page.domain = res.data.domain;
                        alert('Duplicated')
                    })
                    .catch((error) => {
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });
            },

            deletePage() {
                axios.post('./delete-subscribe-page', this.page)
                    .then((res) => {
                        $('#blockId' + this.page.id).addClass('d-none');
                        //Perform Success Action
                        // this.page = res.data.page;
                    })
                    .catch((error) => {
                        // error.response.status Check status code
                    }).finally(() => {
                    //Perform action in always
                });
            },

            copyLink() {
                let testingCodeToCopy = document.querySelector('#copyId_' + this.page.id);
                testingCodeToCopy.setAttribute('type', 'text');
                testingCodeToCopy.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    alert('Testing code was copied ' + msg);
                } catch (err) {
                    alert('Oops, unable to copy');
                }

                /* unselect the range */
                testingCodeToCopy.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges()
            },

            editModalId(i) {
                return 'editModal' + i;
            },

            checkIfNull(item)
            {
                if( item  === null){
                    return "";
                }

                return item;
            }

        },

        created() {
            axios.get('./user-domains')
                .then(response => {
                    this.domains = response.data.domains
                });

            axios.get('./page-subscribers/' + this.page.id)
                .then(response => {
                    this.subscribers = response.data
                    console.log()
                });
        }
    }
</script>

<style lang="css" scoped>
    .page-description {
        padding: 15px;
        width: 447px;
        height: 288px;
        background: #3B3C72;
        border-radius: 4.44739px;
        margin-left: 13px;
        margin-top: 60px;
    }

    .page-settings {
        padding: 15px;
        width: 279px;
        height: 288px;
        background: #3B3C72;
        border-radius: 4.44739px;
        margin-left: 85px;
        margin-top: 60px;
    }

    .active {
        color: #1cce1c;
    }

    .blocked {
        color: red;
    }

    .wrapper {
        width: 100%;
        margin-left: 113px;
        margin-right: 350px;
        margin-top: 178px;
    }

    h2 {
        margin: 0 0 60px 0;
        font-weight: bold;
        font-size: 36px;
    }

    input, select {
        width: 485px;
        height: 57px;

        padding: 24px 17px;
        margin-bottom: 57px;

        color: white;

        background: transparent;
        border: 1px solid #6368A0;
        box-sizing: border-box;
        border-radius: 6px;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: 96%;
        background-position-y: 50%;
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

    .btn-cancel_create {
        padding: 16px 50px;
        margin-right: 40px;

        font-family: Comfortaa;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 150%;
        color: #6368A0;

        cursor: pointer;

        background-color: transparent;
        border-radius: 6px;
        border: #6368A0 solid 3px;

    }

    .accordion, .card, .card-body, .card-header {
        background: transparent;
        border: transparent;
    }

    .card-body {
        padding: 0.25rem;
    }

    .btn:focus, .btn:active {
        box-shadow: none !important;
        background: transparent !important;
    }

    .btn {
        background: transparent;
        border: none;

        text-align: left;
        font-size: 36px;
        font-weight: 700;
    }

    .star {
        color: #E20042;
        font-size: 30px;
    }
</style>
<style lang="css" scoped src="./my-pages/MyPages.css"></style>
