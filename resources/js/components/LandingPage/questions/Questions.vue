<template>
  <!-- questions -->
  <section class="questions">
    <div class="questions-footer_gradient">
      <div class="container">
        <h2 class="headline">ЧАСТЫЕ ВОПРОСЫ</h2>
        <div class="questions-main">
          <div class="questions-main_block">
            <p
              :class="[
                isQuestion1
                  ? 'questions-main_number-true'
                  : 'questions-main_number-false',
              ]"
            >
              #1
            </p>
            <div class="questions-main_block-inner">
              <div
                class="questions-main_block-inner__1"
                @click="openQuestion1()"
              >
                <p>Вопрос</p>
                <img
                  :src="require('../../../assets/img/minus.svg').default"
                  alt=""
                  width="24px"
                  height="29px"
                  v-if="isQuestion1"
                />
                <img
                  :src="require('../../../assets/img/plus.svg').default"
                  alt=""
                  width="29px"
                  height="29px"
                  v-else
                />
              </div>
              <div v-if="isQuestion1" class="questions-main_block-inner__2">
                <p>Ответ на вопрос</p>
              </div>
            </div>
          </div>

          <div class="questions-main_block">
            <p
              :class="[
                isQuestion2
                  ? 'questions-main_number-true'
                  : 'questions-main_number-false',
              ]"
            >
              #2
            </p>
            <div class="questions-main_block-inner">
              <div
                class="questions-main_block-inner__1"
                @click="openQuestion2()"
              >
                <p>Вопрос</p>
                <img
                  :src="require('../../../assets/img/minus.svg').default"
                  alt=""
                  width="24px"
                  height="29px"
                  v-if="isQuestion2"
                />
                <img
                  :src="require('../../../assets/img/plus.svg').default"
                  alt=""
                  width="29px"
                  height="29px"
                  v-else
                />
              </div>
              <div v-if="isQuestion2" class="questions-main_block-inner__2">
                <p>Ответ на вопрос</p>
              </div>
            </div>
          </div>

          <div class="questions-main_block">
            <p
              :class="[
                isQuestion3
                  ? 'questions-main_number-true'
                  : 'questions-main_number-false',
              ]"
            >
              #3
            </p>
            <div class="questions-main_block-inner">
              <div
                class="questions-main_block-inner__1"
                @click="openQuestion3()"
              >
                <p>Вопрос</p>
                <img
                  :src="require('../../../assets/img/minus.svg').default"
                  alt=""
                  width="24px"
                  height="29px"
                  v-if="isQuestion3"
                />
                <img
                  :src="require('../../../assets/img/plus.svg').default"
                  alt=""
                  width="29px"
                  height="29px"
                  v-else
                />
              </div>
              <div v-if="isQuestion3" class="questions-main_block-inner__2">
                <p>Ответ на вопрос</p>
              </div>
            </div>
          </div>

          <div class="questions-main_block">
            <p
              :class="[
                isQuestion4
                  ? 'questions-main_number-true'
                  : 'questions-main_number-false',
              ]"
            >
              #4
            </p>
            <div class="questions-main_block-inner">
              <div
                class="questions-main_block-inner__1"
                @click="openQuestion4()"
              >
                <p>Вопрос</p>
                <img
                  :src="require('../../../assets/img/minus.svg').default"
                  alt=""
                  width="24px"
                  height="29px"
                  v-if="isQuestion4"
                />
                <img
                  :src="require('../../../assets/img/plus.svg').default"
                  alt=""
                  width="29px"
                  height="29px"
                  v-else
                />
              </div>
              <div v-if="isQuestion4" class="questions-main_block-inner__2">
                <p>Ответ на вопрос</p>
              </div>
            </div>
          </div>

          <div class="questions-main_block">
            <p
              :class="[
                isQuestion5
                  ? 'questions-main_number-true'
                  : 'questions-main_number-false',
              ]"
            >
              #5
            </p>
            <div class="questions-main_block-inner">
              <div
                class="questions-main_block-inner__1"
                @click="openQuestion5()"
              >
                <p>Вопрос</p>
                <img
                  :src="require('../../../assets/img/minus.svg').default"
                  alt=""
                  width="24px"
                  height="29px"
                  v-if="isQuestion5"
                />
                <img
                  :src="require('../../../assets/img/plus.svg').default"
                  alt=""
                  width="29px"
                  height="29px"
                  v-else
                />
              </div>
              <div v-if="isQuestion5" class="questions-main_block-inner__2">
                <p>Ответ на вопрос</p>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer">
          <div class="container">
            <div class="footer_text">
              <router-link to="/offer" @click.native="scrollToTop">
                <p>Публичная офферта</p>
              </router-link>

              <router-link to="/confidentiality" @click.native="scrollToTop">
                <p>Политика конфиденциальности</p>
              </router-link>
            </div>
            <div class="footer_img">
              <img
                :src="require('../../../assets/img/footer-img.png').default"
                alt="footer-img"
              />
            </div>

            <hr />

            <div class="footer_text footer_block">
              <p>ИП Пупкин Василий Петрович</p>
              <p>ОГРНИП 123456789123456</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      isQuestion1: false,
      isQuestion2: false,
      isQuestion3: false,
      isQuestion4: false,
      isQuestion5: false,
    }
  },
  methods: {
    openQuestion1: function() {
      this.isQuestion1 = !this.isQuestion1
    },
    openQuestion2: function() {
      this.isQuestion2 = !this.isQuestion2
    },
    openQuestion3: function() {
      this.isQuestion3 = !this.isQuestion3
    },
    openQuestion4: function() {
      this.isQuestion4 = !this.isQuestion4
    },
    openQuestion5: function() {
      this.isQuestion5 = !this.isQuestion5
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="sass" scoped src="./Questions.sass"></style>
