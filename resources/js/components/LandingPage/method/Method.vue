<template>
  <!-- method -->
  <section class="method">
    <div class="method-gradient_back"></div>
    <div class="method-gradient"></div>
    <div class="container">
      <img
        :src="require('../../../assets/img/rocketnew2.png').default"
        alt="rocket"
        class="method_img"
      />
      <div class="method_text">
        <p class="method_text-main">
          Эффективный <br> метод привлечения <br> подписчиков в Instagram
        </p>
        <p class="method_text-descr">
          Создайте подписную страницу, которая будет автоматически отдавать
          контент за подписку на ваш аккаунт
        </p>
          <div class="method_btn-elips">
            <router-link @click.native="scrollToTop" to="/register">
              <button class="method_btn">Попробовать бесплатно</button>
            </router-link>
          </div>
           <a name="about-service_mobile"></a>
      </div>
    </div>
    <a name="about-service"></a>
  </section>
</template>

<script>
export default {
  name: 'Method',
  data() {
    return {}
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  }

}
</script>

<style lang="sass" scoped src="./Method.sass"></style>
