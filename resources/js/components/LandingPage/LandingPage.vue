<template>
  <div id="home" v-scroll="handleScroll">
    <Header :color="color" />
    <Method />
    <ForWhom />
    <ServiceWork />
    <Possibilities />
    <Cost />
    <Questions />
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './header/Header.vue'
import Method from './method/Method.vue'
import ForWhom from './for-whom/ForWhom.vue'
import ServiceWork from './service-work/ServiceWork.vue'
import Possibilities from './possibilities/Possibilities.vue'
import Cost from './cost/Cost.vue'
import Questions from './questions/Questions.vue'

Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  },
})

export default {
  name: 'HomePage',
  components: {
    Header,
    Method,
    ForWhom,
    ServiceWork,
    Possibilities,
    Cost,
    Questions,
  },
  data() {
    return {
      color: 'transparent',
      scrollTop: 0,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.r) {
      localStorage.referrerCode = to.query.r
    }
    return next()
  },

  methods: {
    handleScroll: function(evt, el) {
      this.color = window.scrollY > 50 ? '#3B3C72' : 'transparent'
      return window.scrollY > 10000
    },
  },
}
</script>

<style lang="sass" scoped src="./LandingPage.sass"></style>
