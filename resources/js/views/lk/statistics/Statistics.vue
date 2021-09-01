<template lang="html">
  <div class="wrapper" id="statistics">
    <HeaderMobile />
    <ProfileWidget />
    <h2 class="statistics_header">Статистика страницы</h2>
    <p class="statistics_link">Моя первая страница</p>
    <div class="statistics_block-btns">
      <DatePicker />
      <button type="button" class="statistics_btn" @click="performLogout">
        показать
      </button>
    </div>

    <Schedule />

    <div class="statistics_block-export">
      <a href="file.csv" download>
        <span>Экспорт</span>
        <img
          :src="require('../../../assets/img/file-img.svg').default"
          class="statistics-data_arrow"
        />
      </a>
    </div>

    <div class="statistics-table_block">
      <table class="statistics-table">
        <tbody class="statistics-table_body">
          <tr class="table-row">
            <th>
              Дата
              <img
                :src="require('../../../assets/img/balance-up.svg').default"
                class="statistics-data_arrow"
              />
            </th>
            <th class="statistics-column_center">
              <div class="statistics-block">
                <span>Никнейм</span>
                <div class="statistics-block_arrows">
                  <img
                    :src="require('../../../assets/img/balance-up.svg').default"
                    class="statistics-data_arrow"
                  />
                  <img
                    :src="
                      require('../../../assets/img/balance-down.svg').default
                    "
                    class="statistics-data_arrow"
                  />
                </div>
              </div>
            </th>
            <th class="appoint-column_center">
              <div class="statistics-block">
                <span>Статус</span>
                <div class="statistics-block_arrows">
                  <img
                    :src="require('../../../assets/img/balance-up.svg').default"
                    class="statistics-data_arrow"
                  />
                  <img
                    :src="
                      require('../../../assets/img/balance-down.svg').default
                    "
                    class="statistics-data_arrow"
                  />
                </div>
              </div>
            </th>
          </tr>
          <tr
            class="appoint-row"
            v-for="item in statisticsTable"
            :key="item.date"
          >
            <td class="appoint-column">{{ item.date }}</td>
            <td class="appoint-column_center">{{ item.nick }}</td>
            <td class="appoint-column_center">{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProfileWidget from '../ProfileWidget.vue'
import HeaderMobile from '../header-mobile/Header.vue'
import DatePicker from './DatePicker/DatePicker.vue'
import Schedule from './Schedule.vue'

export default {
  data() {
    return {
      date: '',
      statisticsTable: [
        {
          date: '31.05.2021 в 14:35',
          nick: 'petypupkin',
          status: 'Подписался',
        },
        {
          date: '31.05.2021 в 12:54',
          nick: 'vasynosik',
          status: 'Неподписался',
        },
        {
          date: '30.05.2021 в 07:17',
          nick: 'ptashkin',
          status: 'Подписался',
        },
      ],
    }
  },
  components: {
    ProfileWidget,
    HeaderMobile,
    DatePicker,
    Schedule,
  },
}
</script>

<style lang="css" scoped src="./Statistics.css"></style>
