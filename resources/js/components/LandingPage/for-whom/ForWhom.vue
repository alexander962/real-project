<template>
  <div>
    <!-- for-whom -->
    <section class="for-whom">
      <div class="container">
        <h2 class="headline">Для кого сервис</h2>
        <div class="for-whom_main">
          <div class="for-whom_elips"></div>
          <div class="for-whom_block">
            <h3>Блогеры</h3>
            <p>
              Чек-листы, <br />
              гайды – выдавайте <br />
              за подписку на вас
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-1.png').default"
              alt="phone"
              class=""
            />
          </div>

          <div class="for-whom_block">
            <h3>Онлайн школы</h3>
            <p>
              Лид-магниты <br />
              и приглашения на вебинар <br />
              выдавайте за подписку
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-2.png').default"
              alt="phone"
              class=""
            />
          </div>

          <div class="for-whom_block">
            <h3>Эксперты</h3>
            <p>
              Полезные материалы <br />
              и презентации отправляйте <br />
              только вашим подписчикам
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-3.png').default"
              alt="phone"
              class=""
            />
          </div>
        </div>
      </div>
    </section>

    <!-- for-whom mobile -->
    <section class="for-whom-mobile">
      <div class="container">
        <h2 class="headline">Для кого сервис</h2>
        <slick class="slick" ref="slick" :options="slickOptions">
          <div class="for-whom-mobile_block">
            <h3>Блогеры</h3>
            <p>
              Чек-листы, гайды – <br />
              выдавайте за подписку на <br />
              вас
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-1.png').default"
              alt="phone"
              class=""
            />
          </div>

          <div class="for-whom-mobile_block">
            <h3>Онлайн школы</h3>
            <p>
              Лид-магниты <br />
              и приглашения на вебинар <br />
              выдавайте за подписку
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-2.png').default"
              alt="phone"
              class=""
            />
          </div>

          <div class="for-whom-mobile_block">
            <h3>Эксперты</h3>
            <p>
              Полезные материалы и <br />
              презентации отправляйте <br />
              только вашим подписчикам
            </p>
            <img
              :src="require('../../../assets/img/new-whome-img-3.png').default"
              alt="phone"
              class=""
            />
          </div>
        </slick>
      </div>
    </section>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import '../../../../../node_modules/slick-carousel/slick/slick.css'

export default {
  name: 'ForWhom',
  components: { Slick },
  data() {
    return {
      slickOptions: {
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '200px',
            },
          },
          {
            breakpoint: 851,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '170px',
            },
          },
          {
            breakpoint: 801,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '150px',
            },
          },
          {
            breakpoint: 701,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '120px',
            },
          },
          {
            breakpoint: 601,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '85px',
              arrows: false,
            },
          },
          {
            breakpoint: 501,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '55px',
              arrows: false,
            },
          },
          {
            breakpoint: 451,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '40px',
              arrows: false,
            },
          },
          {
            breakpoint: 401,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '25px',
              arrows: false,
            },
          },
          {
            breakpoint: 371,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '18px',
              arrows: false,
            },
          },
          {
            breakpoint: 361,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '15px',
              arrows: false,
            },
          },
          {
            breakpoint: 351,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '12px',
              arrows: false,
            },
          },
          {
            breakpoint: 341,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '16px',
              arrows: false,
            },
          },
          {
            breakpoint: 331,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '12px',
              arrows: false,
            },
          },
        ],
      },
    }
  },
  methods: {
    next() {
      this.$refs.slick.next()
    },

    prev() {
      this.$refs.slick.prev()
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    },
  },
}
</script>

<style lang="sass" scoped src="./ForWhom.sass"></style>
