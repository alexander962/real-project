<template>
    <div class="w-100">
        <div class="lk_container">
            <div class="menu">
            <!-- лого -->
            <div class="menu_logo">
            InstaGo
            </div>
            <!-- вкладки -->
            <tab></tab>
            </div>
            <!-- вывод вкладки -->
            <router-view/>
        </div>
    </div>
</template>

<script>
import Tab from './Tab.vue'

export default {
  data() {
    return {

    }
  },
  name: 'Lk',
  components: {
    Tab
  },
  provide() {
    return {
      tabs: [
        { name: 'Cтатистика', link: '/lk/statistics', img: 'statistics.svg' },
        { name: 'Мои страницы', link: '/lk/my-pages', img: 'my_pages.svg' },
        { name: 'Баланс', link: '/lk/balance', img: 'balance.svg' },
        { name: 'Домены', link: '/lk/domains', img: 'domains.svg' },
        { name: 'Партнерская программа', link: '/lk/parthner-program', img: 'parthner_program.svg' },
        { name: 'Инструкции', link: '/lk/instructions', img: 'instructions.svg' },
        { name: 'Профиль', link: '/lk/profile', img: 'profile.svg' }
      ]
    }
  }
}
</script>

<style lang="css">
@media(max-width: 1024px) {
  .menu {
    display: none;
  }
}
</style>
