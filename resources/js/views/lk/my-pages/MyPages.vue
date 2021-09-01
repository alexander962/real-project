<template lang="html">
  <div class="wrapper" id="top">
    <div v-if="!isCreating">
      <HeaderMobile />
      <div class="subscription-pages">
        <h2>Подписные страницы</h2>
        <span class="create-page_counter-mobile" style="color:#9FA1B7;">Всего {{ pageCounter }} страниц(a)</span>
      </div>
      <div class="create-page">
        <div class="btn-create_page" @click="createPage">
          <span style="font-size:30px;">+&nbsp;</span
          >{{ pageCounter > 0 ? 'Создать новую страницу' : 'Создать страницу' }}
        </div>
        <span class="create-page_counter" style="color:#9FA1B7;">Всего {{ pageCounter }} страниц(a)</span>
      </div>
      <profile-widget></profile-widget>
      <page-description
            v-for="(page, index) in this.pages"
            v-bind:page="page"
            v-bind:index="index"
            v-bind:key="page.id"
      ></page-description>
    </div>
    <div v-else>
      <form
        class=""
        @submit.prevent="onSubmit"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="my-page">
          <!-- СОЗДАНИЕ СТРАНИЦЫ -->
          <HeaderMobile />
          <ProfileWidget />
          <div class="my-page_block">
            <img
              :src="require('../../../assets/img/up-arrow.svg').default"
              class="my-page_block-img"
              v-if="isMyPageBlock1"
            />
            <img
              :src="require('../../../assets/img/down-arrow.svg').default"
              class="my-page_block-img"
              v-else="isMyPageBlock1"
            />
            <b-button
              v-b-toggle.collapse-1
              @click="isOpenBlock1()"
              :class="[
                isMyPageBlock1
                  ? 'm-1 my-page_block-subtitle'
                  : 'm-1 my-page_block-subtitle_none',
              ]"
              >Создание страницы</b-button
            >
          </div>
          <b-collapse id="collapse-1" class="mt-2" visible>
            <b-card class="my-page_block-card"
              >Название страницы (видно только вам)<span class="star"
                >*</span
              ></b-card
            >
            <input
              type="text"
              v-model="form.page_name"
              placeholder="Страница №1"
            />
              <p class="text-danger">{{ errors && errors.page_name ? errors.page_name[0] : '' }}</p>
            <b-card class="my-page_block-card">Домен</b-card>
            <select class="" v-model="form.domain">
              <option value="" selected>Выберите домен</option>
              <option
                :value="domain.id"
                v-for="domain in this.domains"
                style="color: black"
                >{{ domain.name }}</option
              >
            </select>
            <b-card class="my-page_block-card">Ссылка страницы<span class="star">*</span></b-card>
            <input
              type="text"
              v-model="form.link"
              placeholder="https://domain.ru/page/mypage"
            />
              <p class="text-danger">{{ errors && errors.link ? errors.link[0] : '' }}</p>
            <b-card class="photo my-page_block-card">Фото страницы</b-card>
            <div class="add-photo">
              <img
                :src="require('../../../assets/img/close.svg').default"
                class="add-photo_close"
              />
              <label for="photo" class="input__file-button">
                <img
                  :src="require('../../../assets/img/add_file.svg').default"
                  class="add-photo_img"
                />
              </label>
              <input
                type="file"
                class="input__file"
                id="photo"
                accept="image/*"
                v-on:change="pageImageChange"
              />
            </div>
            <p class="photo_text-size">Размер изображения: 1920 x 1080</p>

            <b-card class="bg my-page_block-card">Тема страницы</b-card>
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
          </b-collapse>
        </div>
        <!-- НАСТРОЙКИ ТЕКСТА -->
        <div class="my-page">
          <div class="my-page_block">
            <img
              :src="require('../../../assets/img/up-arrow.svg').default"
              class="my-page_block-img"
              v-if="isMyPageBlock2"
            />
            <img
              :src="require('../../../assets/img/down-arrow.svg').default"
              class="my-page_block-img"
              v-else="isMyPageBlock2"
            />
            <b-button
              v-b-toggle.collapse-2
              @click="isOpenBlock2()"
              :class="[
                isMyPageBlock2
                  ? 'm-1 my-page_block-subtitle'
                  : 'm-1 my-page_block-subtitle_none',
              ]"
              >Настройки текста</b-button
            >
            <b-collapse id="collapse-2" class="mt-2">
              <b-card>Заголовок<span class="star">*</span></b-card>
              <input
                type="text"
                v-model="form.title"
                placeholder="Введите заголовок страницы"
              />
               <p class="text-danger"> {{ errors && errors.title ? errors.title[0] : '' }}</p>
              <b-card>Описание<span class="star">*</span></b-card>
              <input
                type="text"
                v-model="form.description"
                placeholder="Введите описание"
              />
               <p class="text-danger"> {{ errors && errors.description ? errors.description[0] : '' }}</p>
              <b-card>Текст на кнопке<span class="star">*</span></b-card>
              <input type="text" v-model="form.button_text" placeholder="" />
                <p class="text-danger"> {{ errors && errors.button_text ? errors.button_text[0] : '' }}</p>

                <b-card>Текст перед подпиской<span class="star">*</span></b-card>
              <textarea
                rows="2"
                type="text"
                v-model="form.presubscribe_text"
                placeholder=""
              />
               <p class="text-danger"> {{ errors && errors.presubscribe_text ? errors.presubscribe_text[0] : '' }}</p>
              <b-card>Таймер обратного отсчета</b-card>
              <b-form-checkbox class="timer_on-off" v-model="form.is_timer_active" switch size="lg">
                <b>{{ form.is_timer_active ? 'on' : 'off' }}</b>
              </b-form-checkbox>
              <b-card>Текст на таймере</b-card>
              <input type="text" v-model="form.timer_text" placeholder="" />
               <p class="text-danger"> {{ errors && errors.timer_text ? errors.timer_text[0] : '' }}</p>
              <b-card>Время таймера(в секундах)</b-card>
              <div class="container-input">
                <input
                  type="number"
                  step="1"
                  v-model="form.timer_time"
                  placeholder=""
                >
                 <p class="text-danger"> {{ errors && errors.timer_time ? errors.timer_time[0] : '' }}</p>
                <div class="arrow-input-block">
                  <img
                      :src="require('../../../assets/img/arrow-input-up.svg').default"
                      @click="incrementArrow()"
                      class="arrow-input-block_img"
                    />
                    <img
                      :src="require('../../../assets/img/arrow-input-down.svg').default"
                      @click="decrementArrow()"
                      class="arrow-input-block_img"
                    />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <!-- НАСТРОЙКИ ПРОФИЛЯ -->
        <div class="my-page">
          <div class="my-page_block">
            <img
              :src="require('../../../assets/img/up-arrow.svg').default"
              class="my-page_block-img"
              v-if="isMyPageBlock3"
            />
            <img
              :src="require('../../../assets/img/down-arrow.svg').default"
              class="my-page_block-img"
              v-else="isMyPageBlock3"
            />
            <b-button
              v-b-toggle.collapse-3
              @click="isOpenBlock3()"
              :class="[
                isMyPageBlock3
                  ? 'm-1 my-page_block-subtitle'
                  : 'm-1 my-page_block-subtitle_none',
              ]"
              >Настройки профиля</b-button
            >
            <b-collapse id="collapse-3" class="mt-2">
              <b-card>Ник в Instagram<span class="star">*</span></b-card>
              <input
                type="text"
                v-model="form.instagram_username"
                placeholder="Введите логин"
              />
               <p class="text-danger"> {{ errors && errors.instagram_username ? errors.instagram_username[0] : '' }}</p>
                <div class="ava-insta">
                <label for="ava" class="input__file-button">
                  <img
                    :src="require('../../../assets/img/profile2.svg').default"
                    height="50px"
                    class="ava-insta_img"
                  />
                  <span class="ava-insta_text">Аватарка Instagram</span>
                </label>

                <input
                  type="file"
                  id="ava"
                  accept="image/*"
                  v-on:change="onFileChange"
                  class="input__file"
                />
              </div>
            </b-collapse>
          </div>
        </div>
        <!-- МЕТРИКИ -->
        <div class="my-page">
          <div class="my-page_block">
            <img
              :src="require('../../../assets/img/up-arrow.svg').default"
              class="my-page_block-img"
              v-if="isMyPageBlock4"
            />
            <img
              :src="require('../../../assets/img/down-arrow.svg').default"
              class="my-page_block-img"
              v-else="isMyPageBlock4"
            />
            <b-button
              v-b-toggle.collapse-4
              @click="isOpenBlock4()"
              :class="[
                isMyPageBlock4
                  ? 'm-1 my-page_block-subtitle'
                  : 'm-1 my-page_block-subtitle_none',
              ]"
              >Метрики</b-button
            >
            <b-collapse id="collapse-4" class="mt-2">
              <b-card>Facebook пиксель</b-card>
              <input
                type="text"
                v-model="form.fb_pixel"
                placeholder="Введите ID пикселя"
              />
              <b-card>Tiktok пиксель</b-card>
              <input
                type="text"
                v-model="form.tik_tok_pixel"
                placeholder="Введите ID пикселя"
              />
              <b-card>ВК пиксель</b-card>
              <input
                type="text"
                v-model="form.vk_pixel"
                placeholder="Введите ID пикселя"
              />
              <b-card>Яндекс метрика</b-card>
              <input
                type="text"
                v-model="form.yandex_metrics"
                placeholder="Введите ID метрики"
              />
            </b-collapse>
          </div>
        </div>
        <!-- НАСТРОЙКИ СТРАНИЦЫ ПОЛУЧЕНИЯ МАТЕРИАЛА -->
        <div class="my-page">
          <div class="my-page_block">
            <img
              :src="require('../../../assets/img/up-arrow.svg').default"
              class="my-page_block-img"
              v-if="isMyPageBlock5"
            />
            <img
              :src="require('../../../assets/img/down-arrow.svg').default"
              class="my-page_block-img"
              v-else="isMyPageBlock5"
            />
            <b-button
              v-b-toggle.collapse-5
              @click="isOpenBlock5()"
              :class="[
                isMyPageBlock5
                  ? 'm-1 my-page_block-subtitle'
                  : 'm-1 my-page_block-subtitle_none',
              ]"
              >Страница успеха</b-button
            >
            <b-collapse id="collapse-5" class="mt-2">
              <b-card>Заголовок при успехе<span class="star">*</span></b-card>
              <input type="text" v-model="form.popup_title" placeholder="" />
                <p class="text-danger"> {{ errors && errors.popup_title ? errors.popup_title[0] : '' }}</p>
              <b-card>Описание при успехе<span class="star">*</span></b-card>
              <input type="text" v-model="form.popup_text" placeholder="" />
                <p class="text-danger"> {{ errors && errors.popup_text ? errors.popup_text[0] : '' }}</p>
              <b-card
                >Текст на кнопке при успехе<span class="star">*</span></b-card
              >
              <input
                type="text"
                v-model="form.popup_button_text"
                placeholder=""
              />
                <p class="text-danger"> {{ errors && errors.popup_button_text ? errors.popup_button_text[0] : '' }}</p>
              <b-card>Ссылка на материал</b-card>
              <input
                type="text"
                v-model="form.popup_button_url"
                placeholder="Введите ссылку"
              />
                <p class="text-danger"> {{ errors && errors.popup_button_url ? errors.popup_button_url[0] : '' }}</p>
            </b-collapse>
          </div>
        </div>

        <div class="my-page_info">
          <img
              :src="require('../../../assets/img/info-pages.svg').default"
              class="my-page_info-img"
          />
          <span class="my-page_info-text">Убедитесь, что все обязательные поля заполнены во всех вкладках</span>
        </div>

        <div class="d-flex justify-content-start mt-5 ml-4 btn-block">
          <div class="btn-cancel_create" @click="isCreating = false">
            Отмена
          </div>
          <button class="btn-create_page" type="submit">Создать</button>
        </div>
      </form>
    </div>
    <a v-if="isCreating" href="#top" class="up-img"><img
        :src="require('../../../assets/img/up-arrow.svg').default"
        class="profile-widget_main__arrow"
    /></a>
  </div>
</template>

<script>
import ProfileWidget from '../ProfileWidget.vue'
import PageDescription from '../PageDescription.vue'
import HeaderMobile from '../header-mobile/Header.vue'

export default {
  data() {
    return {
      createBtnText: 'Создать страницу',
      isCreating: false,
      visible: true,
      pageCounter: 0,
      domains: [],
      pages: [],
      form: {
        page_name: '',
        page_photo: '',
        domain: '',
        link: '',
        title: '',
        description: '',
        bg_color: '',
        button_text: '',
        presubscribe_text: '',
        is_timer_active: false,
        timer_text: '',
        timer_time: '',
        instagram_username: '',
        instagram_avatar: '',
        fb_pixel: '',
        tik_tok_pixel: '',
        vk_pixel: '',
        yandex_metrics: '',
        popup_title: '',
        popup_text: '',
        popup_button_text: '',
        popup_button_url: '',
      },
      imagePreview: null,
      showPreview: false,
      user: null,
      isMyPageBlock1: true,
      isMyPageBlock2: false,
      isMyPageBlock3: false,
      isMyPageBlock4: false,
      isMyPageBlock5: false,
        errors: []
    }
  },
  methods: {
    createPage() {
      this.isCreating = true
      axios.get('/').then(response => {
        console.log(response)
      })
    },

    onSubmit() {
      let formData = new FormData()
      formData.append('page_photo', this.form.page_photo)
      formData.append('instagram_avatar', this.form.instagram_avatar)
      formData.append('page_name', this.form.page_name)
      formData.append('domain', this.form.domain)
      formData.append('link', this.form.link)
      formData.append('title', this.form.title)
      formData.append('description', this.form.description)
      formData.append('bg_color', this.form.bg_color)
      formData.append('button_text', this.form.button_text)
      formData.append('presubscribe_text', this.form.presubscribe_text)
      formData.append('is_timer_active', this.form.is_timer_active)
      formData.append('timer_text', this.form.timer_text)
      formData.append('timer_time', this.form.timer_time)
      formData.append('instagram_username', this.form.instagram_username)
      formData.append('fb_pixel', this.form.fb_pixel)
      formData.append('tik_tok_pixel', this.form.tik_tok_pixel)
      formData.append('vk_pixel', this.form.vk_pixel)
      formData.append('yandex_metrics', this.form.yandex_metrics)
      formData.append('popup_title', this.form.popup_title)
      formData.append('popup_text', this.form.popup_text)
      formData.append('popup_button_text', this.form.popup_button_text)
      formData.append('popup_button_url', this.form.popup_button_url)

      axios
        .post('./new-subscribe-page', formData)
        .then(res => {
          //Perform Success Action
          this.pages = res.data.pages
          this.isCreating = false
          this.pageCounter = this.pages.length
        })
        .catch(error => {
            this.errors = error.response.data.errors;
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        })
    },

    onFileChange(event) {
      this.form.instagram_avatar = event.target.files[0]
    },

    pageImageChange(event) {
      this.form.page_photo = event.target.files[0]
    },

    isOpenBlock1() {
      this.isMyPageBlock1 = !this.isMyPageBlock1
    },
    isOpenBlock2() {
      this.isMyPageBlock2 = !this.isMyPageBlock2
    },
    isOpenBlock3() {
      this.isMyPageBlock3 = !this.isMyPageBlock3
    },
    isOpenBlock4() {
      this.isMyPageBlock4 = !this.isMyPageBlock4
    },
    isOpenBlock5() {
      this.isMyPageBlock5 = !this.isMyPageBlock5
    },
    incrementArrow() {
      this.form.timer_time++
    },
    decrementArrow() {
      this.form.timer_time--
    },
  },
  computed: {},
  components: {
    ProfileWidget,
    PageDescription,
    HeaderMobile
  },
  emits: ['createPage'],
  created() {
    axios.get('./user-domains').then(response => {
      this.domains = response.data.domains
      this.pages = response.data.pages
      this.user = response.data.user
      this.pageCounter = this.pages.length
    })
  },
}
</script>

<style lang="css" scoped src="./MyPages.css"></style>
