<template>
  <!-- service-work -->
  <section class="service-work">
    <div class="container">
      <h2 class="headline">Как работает сервис</h2>
      <div class="service-work_main">
        <div class="service-work_block">
          <div class="service-work_block-text">
            <span class="service-work_number">#1</span>
            <div class="service-work_text">
              <div class="service-work_block-mobile">
                <div class="service-work_block-mobile__text">
                  <span class="service-work_number-mobile">#1</span>
                  <span>Подготовка материала</span>
                </div>
                <img
                  :src="
                    require('../../../assets/img/work-service-1-small.png')
                      .default
                  "
                  alt=""
                  class="service-work_img-mobile"
                />
              </div>
              <p>
                Вы загружаете свой чек-лист, гайд или видеоурок на гугл-диск или
                ютуб и открываете доступ только по ссылке
              </p>
            </div>
          </div>
          <div>
            <img
              :src="require('../../../assets/img/work-service-1.png').default"
              class="service-work_img"
            />
          </div>
          <div class="service-work_line">
            <img
              :src="
                require('../../../assets/img/work-service-line.png').default
              "
              alt="Line"
            />
          </div>
        </div>

        <div class="service-work_block">
          <div>
            <img
              :src="require('../../../assets/img/work-service-2.png').default"
              class="service-work_img"
            />
          </div>
          <div class="service-work_block-text">
            <div class="service-work_number">#2</div>
            <div class="service-work_text">
              <div class="service-work_block-mobile">
                <div class="service-work_block-mobile__text">
                  <span class="service-work_number-mobile">#2</span>
                  <span>Создание страницы</span>
                </div>
                <img
                  :src="
                    require('../../../assets/img/work-service-small-2.png')
                      .default
                  "
                  alt=""
                  class="service-work_img-mobile"
                />
              </div>
              <p>
                Создаете подписную страницу в нашем сервисе, заполняете её на
                свой вкус и цвет, и получаете специальную ссылку
              </p>
            </div>
          </div>
          <div class="service-work_line">
            <img
              :src="
                require('../../../assets/img/work-service-line.png').default
              "
              alt="Line"
            />
          </div>
        </div>

        <div class="service-work_block">
          <div class="service-work_block-text">
            <div class="service-work_number">#3</div>
            <div class="service-work_text">
              <div class="service-work_block-mobile">
                <div class="service-work_block-mobile__text">
                  <span class="service-work_number-mobile">#3</span>
                  <span>Привлечение трафика</span>
                </div>
                <img
                  :src="
                    require('../../../assets/img/work-service-small-3.png')
                      .default
                  "
                  alt=""
                  class="service-work_img-mobile"
                />
              </div>
              <p>
                Запускаете таргетированную рекламу или покупаете у блогеров, с
                призывом бесплатно скачать ваш полезный материал
              </p>
            </div>
          </div>
          <div>
            <img
              :src="require('../../../assets/img/work-service-3.png').default"
              class="service-work_img"
            />
          </div>
          <div class="service-work_line">
            <img
              :src="
                require('../../../assets/img/work-service-line.png').default
              "
              alt="Line"
            />
          </div>
        </div>

        <div class="service-work_block">
          <div>
            <img
              :src="require('../../../assets/img/work-service-4.png').default"
              class="service-work_img"
            />
          </div>
          <div class="service-work_block-text service-work_block-text_4">
            <div class="service-work_number">#4</div>
            <div class="service-work_text">
              <div class="service-work_block-mobile">
                <div class="service-work_block-mobile__text">
                  <span class="service-work_number-mobile">#4</span>
                  <span class="service-work_block-text__small">Проверка подписки</span>
                </div>
                <img
                  :src="
                    require('../../../assets/img/work-service-small-4.png')
                      .default
                  "
                  alt=""
                  class="service-work_img-mobile"
                />
              </div>
              <p>
                Сервис попросит человека подписаться на ваш Instagram и
                автоматически проверит подписку
              </p>
            </div>
          </div>
          <div class="service-work_line">
            <img
              :src="
                require('../../../assets/img/work-service-line.png').default
              "
              alt="Line"
            />
          </div>
        </div>

        <div class="service-work_block">
          <div class="service-work_block-text">
            <div class="service-work_number">#5</div>
            <div class="service-work_text">
              <div class="service-work_block-mobile">
                <div class="service-work_block-mobile__text">
                  <span class="service-work_number-mobile">#5</span>
                  <span>Выдача материала</span>
                </div>
                <img
                  :src="
                    require('../../../assets/img/work-service-small-5.png')
                      .default
                  "
                  alt=""
                  class="service-work_img-mobile"
                />
              </div>
              <p>
                Если подписка выполнена, то он получит доступ к вашему
                материалу. Если нет, то ничего не произойдет
              </p>
            </div>
          </div>
          <div>
            <img
              :src="require('../../../assets/img/work-service-5.png').default"
              class="service-work_img service-work_img-mess"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceWork',
  data() {
    return {}
  },
}
</script>

<style lang="sass" scoped src="./ServiceWork.sass"></style>
