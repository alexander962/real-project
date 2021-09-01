я<template>
  <!-- header -->
  <section class="main">
    <header class="header" :style="{ background: `${color}` }">
      <div class="container">
        <div class="header-main">
          <div class="header-mobile" v-if="!isOpen">
            <img
              :src="require('../../../assets/img/hamburger.svg').default"
              alt="hamburger"
              @click="openMobileModal()"
            />
            <img
              :src="require('../../../assets/img/avatar.png').default"
              width="52px"
              height="52px"
              alt="avatar"
              class="avatar"
            />
          </div>

          <div v-if="auth">
            <!--  ToDo change mobile menu for auth users  -->
            <div class="modal-menu" v-if="isOpen">
              <div class="modal-menu_main-auth">
                <div class="modal-menu_header-block">
                  <img
                    :src="require('../../../assets/img/close.svg').default"
                    alt="Close"
                    @click="openMobileModal()"
                    class="modal-menu_header-block__close"
                  />

                  <img
                    :src="require('../../../assets/img/avatar.png').default"
                    alt="Avatar"
                    @click="openMobileModal()"
                    class="modal-menu_logo"
                  />
                </div>

                <ul class="modal-menu_nav">
                  <a href="http://5.187.7.180/#about-service_mobile" @click="openMobileModal()">
                    <li>О сервисе</li>
                  </a>
                  <a href="http://5.187.7.180/#cost" @click="openMobileModal()">
                    <li>Стоимость</li>
                  </a>
                  <a href="http://5.187.7.180/#faq" @click="openMobileModal()">
                    <li>FAQ</li>
                  </a>
                </ul>
                <p class="modal-menu_name-text">{{ user.name }}</p>
                <div class="modal-menu_insta-block">
                  <img
                    :src="require('../../../assets/img/insta.svg').default"
                    alt="Avatar"
                    @click="openMobileModal()"
                    class="modal-menu_logo"
                  />
                  <p class="modal-menu_name-text">{{ user.email }}</p>
                </div>
                <router-link to="/logout">
                  <p class="modal-menu_sign">Выйти</p>
                </router-link>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="modal-menu" v-if="isOpen">
              <div class="modal-menu_main">
                <div class="header-mobile_close">
                  <div class="container">
                  <img
                    :src="require('../../../assets/img/close.svg').default"
                    alt="Close"
                    @click="openMobileModal()"
                    class="modal-menu_close"
                  />

                <img
                  :src="require('../../../assets/img/new-logo.png').default"
                  alt="Close"
                  @click="openMobileModal()"
                  class="modal-menu_logo"
                />
                <p></p>
                </div>
                </div>

                <ul class="modal-menu_nav">
                  <a href="#about-service_mobile" @click="openMobileModal()">
                    <li>О сервисе</li>
                  </a>
                  <a href="http://5.187.7.180/#cost" @click="openMobileModal()">
                    <li>Стоимость</li>
                  </a>
                  <a href="http://5.187.7.180/#faq" @click="openMobileModal()">
                    <li>FAQ</li>
                  </a>
                </ul>
                <router-link to="/register" @click.native="scrollToTop">
                  <button class="modal-menu_reg-btn">
                    Регистрация
                  </button>
                </router-link>
                <router-link to="/login" @click.native="scrollToTop">
                  <p class="modal-menu_sign">Войти</p>
                </router-link>
              </div>
            </div>
          </div>
          <!-- </div> -->

          <p class="logo">InstaGo</p>
          <ul class="nav">
            <a href="http://5.187.7.180/#about-service">
              <li>О сервисе</li>
            </a>
            <a href="http://5.187.7.180/#cost">
              <li>Стоимость</li>
            </a>
            <a href="http://5.187.7.180/#faq">
              <li>FAQ</li>
            </a>
          </ul>
        </div>
        <div class="header-btns">
          <router-link
            @click.native="scrollToTop"
            to="/register"
            class="modal-menu_reg-btn-rout"
          >
            <button>Регистрация</button>
          </router-link>
          <router-link @click.native="scrollToTop" to="/login">
            <p>Вход</p>
          </router-link>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  name: 'Header',
  props: ['color'],
  data() {
    return {
      isOpen: false,
      auth: false,
      user: null,
    }
  },
  methods: {
    openMobileModal: function() {
      this.isOpen = !this.isOpen
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },

  beforeCreate() {
    axios
      .get('./check-auth')
      .then(res => {
        if (res.data) {
          this.auth = true
          this.user = res.data
          console.log(this.user)
        }
      })
      .catch(error => {
        // error.response.status Check status code
      })
      .finally(() => {
        //Perform action in always
      })
  },
}
</script>

<style lang="sass" scoped src="./Header.sass"></style>
