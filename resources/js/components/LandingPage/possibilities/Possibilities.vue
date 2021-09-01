<template>
  <!-- possibilities -->
  <section class="possibilities">
    <div class="container">
      <h2 class="headline">Возможности</h2>
      <div class="possibilities_main">
        <div class="possibilities_block">
          <div class="possibilities_block__text">
            <h3>Детальная информация</h3>
            <div class="possibilities_img-mobile">
              <img
                :src="
                  require('../../../assets/img/possibilities-1.png').default
                "
                alt=""
              />
            </div>
            <ul>
              <li>Статистика по нескольким срезам</li>
              <li>Графики просмотров и динамика подписок</li>
              <li>История проверки подписок</li>
            </ul>
          </div>
          <div class="possibilities_img">
            <img
              :src="require('../../../assets/img/possibilities-1.png').default"
              alt=""
            />
          </div>
        </div>

        <div class="possibilities_block">
          <div class="possibilities_img">
            <img
              :src="require('../../../assets/img/possibilities-2.png').default"
              alt=""
            />
          </div>
          <div class="possibilities_block__text">
            <h3>Аналитика и оптимизация</h3>
            <div class="possibilities_img-mobile">
              <img
                :src="
                  require('../../../assets/img/possibilities-2.png').default
                "
                alt=""
              />
            </div>
            <ul>
              <li>
                Трендовые пиксели (Facebook, TikTok, ВК и прочие)
              </li>
              <li>
                Возможность использования Facebook оптимизации
              </li>
              <li>
                Создание похожей аудитории из тек, кто подписался
              </li>
            </ul>
          </div>
        </div>

        <div class="possibilities_block">
          <div class="possibilities_block__text">
            <h3>Работа с доменами</h3>
            <div class="possibilities_img-mobile">
              <img
                :src="
                  require('../../../assets/img/possibilities-3.png').default
                "
                alt=""
              />
            </div>
            <ul>
              <li>
                Привязка своего домена к подписным страницам
              </li>
              <li>Гарантия безопасности вашего бренда</li>
              <li>
                Возможность подтверждения домена на Facebook
              </li>
            </ul>
          </div>
          <div class="possibilities_img">
            <img
              :src="require('../../../assets/img/possibilities-3.png').default"
              alt=""
            />
          </div>
        </div>

        <div class="possibilities_block">
          <div class="possibilities_img">
            <img
              :src="require('../../../assets/img/possibilities-4.png').default"
              alt=""
            />
          </div>
          <div class="possibilities_block__text possibilities_block__text-last">
            <h3>Кастомизация</h3>
            <div class="possibilities_img-mobile">
              <img
                :src="
                  require('../../../assets/img/possibilities-4.png').default
                "
                alt=""
              />
            </div>
            <ul>
              <li>
                Полный контроль над подписными страницами
              </li>
              <li>Широкий выбор цветовых тем</li>
              <li>У нас есть пример страницы</li>
              <div class="possibilities_ellips-btn">
                <router-link
                  @click.native="scrollToTop"
                  to="/register"
                  name="cost"
                >
                  <button>Посмотреть</button>
                </router-link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Posibilities',
  data() {
    return {}
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="sass" scoped src="./Possibilities.sass"></style>
