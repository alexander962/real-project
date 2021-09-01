<template>
  <!-- header -->
  <section class="main">
    <header class="header">
      <div class="container">
        <div class="header-main">
          <div class="header-mobile" v-if="!isOpen">
            <img
              :src="require('../../../assets/img/hamburger.svg').default"
              alt="hamburger"
              @click="openMobileModal()"
              class="humberger"
            />
            <img
              :src="require('../../../assets/img/logo-mobile.png').default"
              alt="logo"
              class="modal-menu_logo"
            />
            <img
              :src="require('../../../assets/img/avatar.png').default"
              width="52px"
              height="52px"
              alt="avatar"
              @click="openProfileWidget()"
              class="avatar"
            />
          </div>

          <div class="profile-widget">
            <div
              :class="[
                isArrow ? 'profile-widget_block' : 'profile-widget_block__none',
              ]"
            >
              <div class="d-flex flex-column justify-content-start w-75">
                <div class="profile-widget_el">
                  <router-link to="/lk/profile">
                    <img
                      :src="require('../../../assets/img/profile.svg').default"
                      height="20px"
                      class="mr-3"
                    />
                    <span>Профиль</span>
                  </router-link>
                </div>
                <div class="profile-widget_el">
                  <router-link to="/support">
                    <img
                      :src="require('../../../assets/img/support.svg').default"
                      height="20px"
                      class="mr-3"
                    />
                    <span>Поддержка</span>
                  </router-link>
                </div>
              </div>
              <button type="button" class=" btn custom_btn" @click="logout">
                Выйти
              </button>
            </div>
          </div>

          <div class="modal-menu" v-if="isOpen">
            <div class="modal-menu_main">
              <img
                :src="require('../../../assets/img/close.svg').default"
                alt="Close"
                @click="openMobileModal()"
                class="modal-menu_close"
              />
              <img
                :src="require('../../../assets/img/logo-mobile.png').default"
                alt="logo"
                class="modal-menu_logo"
              />
              <ul class="modal-menu_nav">
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile1.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Статистика</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile2.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Мои страницы</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile3.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Баланс</span>
                  <span class="modal-menu_balance">1934,00</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile4.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Домены</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile5.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Партнерская программа</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile6.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Инструкции</span>
                </li>
                <li>
                  <img
                    :src="
                      require('../../../assets/img/menu-mobile7.svg').default
                    "
                    alt="Close"
                    @click="openMobileModal()"
                  />
                  <span>Профиль</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isOpen: false,
      isArrow: false,
    }
  },
  methods: {
    logout() {
      axios.post('/admin/logout').then(response => {
        console.log(response.data)
      })
      this.$router.push('/login')
    },
    openMobileModal: function() {
      this.isOpen = !this.isOpen
    },
    openProfileWidget: function() {
      this.isArrow = !this.isArrow
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped src="./Header.sass"></style>
