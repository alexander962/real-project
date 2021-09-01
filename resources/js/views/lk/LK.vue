<template lang="html">
  <div class="d-flex" style="background: #23203F;">
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
</template>

<script>
import Tab from '../../components/Tab.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    Tab
  }
}
</script>

<style lang="css" scoped>
</style>
