<template>
  <!-- cost -->
  <section class="cost">
    <div class="container">
      <h2 class="headline">Стоимость</h2>
      <div class="cost-blue">
        <div class="cost-pink">
          <div class="cost-pink_left">
            <h3>за одного подписчика</h3>
            <!-- <img :src="require('../../../assets/img/cost-text.png').default" alt="" /> -->
            <hr />
            <p>
              Платите всего 1 рубль за успешную подписку на ваш аккаунт
            </p>
          </div>

          <div class="cost-pink_center">
            <img :src="require('../../../assets/img/cost.svg').default" alt="" />
          </div>

          <div class="cost-pink_right">
            <p>Создание подписных страниц <br> БЕЗ ОГРАНИЧЕНИЙ</p>
            <hr />
            <p>
              Количество аккаунтов Instagram БЕЗ ОГРАНИЧЕНИЙ
            </p>
          </div>
        </div>
        <a name="faq"></a>
      </div>

      <div class="cost-img">
        <img :src="require('../../../assets/img/cost-img.png').default" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Cost',
  data() {
    return {}
  },
}
</script>

<style lang="sass" scoped src="./Cost.sass"></style>
