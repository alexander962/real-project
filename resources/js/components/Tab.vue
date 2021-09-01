<template lang="html">
  <ul class="tab_list">
    <li v-for="tab in tabs">
      <router-link :to="tab.link">
        <div class="tab_item">
            <img :src="require('../assets/img/' + tab.img).default">
            {{ tab.name }}
        </div>
    </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  inject: ['tabs']
}
</script>

<style lang="css" scoped>
</style>
