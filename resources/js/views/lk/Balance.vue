<template lang="html">
  <div class="wrapper" id="balance">
    <HeaderMobile />
    <ProfileWidget />
    <h2 class="balance_header">Баланс</h2>
    <div class="balance_bill">{{ balance }} ₽</div>
    <div class="balance-form">
      <input
        type="number"
        v-model="form.sum_text"
        placeholder="Введите сумму"
      />
      <input type="text" v-model="form.promo_text" placeholder="Промокод" />
      <button class="balance_btn" type="submit">Пополнить баланс</button>
    </div>
    <p class="balance_text">
      Минимальная сумма пополнения составляет 500 рублей
    </p>
    <p class="balance_text">
      Стоимость сервиса - 1 рубль за успешную проверку подписки. Баланс не будет
      списываться, если человек запустил проверку и не подписался на вас.
    </p>
    <div class="balance-table_block">
      <table class="balance-table">
        <tbody class="balance-table_body">
          <tr class="table-row">
            <th>
              Дата
              <img
                :src="require('../../assets/img/balance-up.svg').default"
                class="balance-data_arrow"
              />
            </th>
            <th class="appoint-column_center">
              <div class="balance-block">
                <span>Сумма</span>
                <div class="balance-block_arrows">
                  <img
                    :src="require('../../assets/img/balance-up.svg').default"
                    class="balance-data_arrow"
                  />
                  <img
                    :src="require('../../assets/img/balance-down.svg').default"
                    class="balance-data_arrow"
                  />
                </div>
              </div>
            </th>
            <th class="appoint-column_center">
              <div class="balance-block">
                <span>Статус</span>
                <div class="balance-block_arrows">
                  <img
                    :src="require('../../assets/img/balance-up.svg').default"
                    class="balance-data_arrow"
                  />
                  <img
                    :src="require('../../assets/img/balance-down.svg').default"
                    class="balance-data_arrow"
                  />
                </div>
              </div>
            </th>
          </tr>
          <tr class="appoint-row" v-for="item in balanceTable" :key="item.date">
            <td class="appoint-column">{{ item.date }}</td>
            <td class="appoint-column_center">{{ item.sum }}</td>
            <td class="appoint-column_center">
              <img
                :src="require('../../assets/img/balance-ok.svg').default"
                class="my-page_block-img"
                v-if="item.status"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProfileWidget from './ProfileWidget.vue'
import HeaderMobile from './header-mobile/Header.vue'

export default {
  data() {
    return {
      balance: 1934,
      form: {
        popup_sum_text: '',
        popup_promo_text: '',
      },
      balanceTable: [
        {
          date: '04.05.2021',
          sum: '6000 (+10% бонус)',
          status: true,
        },
        {
          date: '05.05.2021',
          sum: '1500',
          status: true,
        },
      ],
    }
  },
  components: {
    ProfileWidget,
    HeaderMobile,
  },
}
</script>

<style lang="css" scoped>
#balance {
  width: 100%;
  display: block;
}
.wrapper {
  width: 100%;
  margin: 108px 100px 160px 113px;
}

.balance_header {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 58px;
}

.balance_bill {
  display: inline-block;
  padding: 16px 63px;
  background: #6368a0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 58px;
}

.balance-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

input {
  width: 240px;
  padding: 17px 0 17px 24px;
  color: white;
  background: transparent;
  border: 1px solid #6368a0;
  box-sizing: border-box;
  border-radius: 6px;
  resize: none;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type='number']:hover,
input[type='number']:focus {
  appearance: none;
  -moz-appearance: textfield;
}

.balance_btn {
  padding: 18px 35px;
  cursor: pointer;
  background: linear-gradient(
    118.66deg,
    #fe2363 31.25%,
    #fe2363 33.84%,
    #e20042 67.67%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-family: Comfortaa;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
}

.balance_text {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 150%;
  color: #aba7a7;
  margin-bottom: 30px;
}

.balance-table_block {
  width: 844px;
  max-height: 50vh;
  overflow: scroll;
}

.balance-table_block::-webkit-scrollbar {
  width: 0; 
  height: 0;
}

.balance-table {
  width: 844px;
  background: rgba(59, 60, 114, 0.5);
  border-radius: 5px;
  border-collapse: collapse;
}

.balance-table td,
th {
  padding-left: 45px;
}

.balance-table td:first-child {
  width: 180px;
}

.balance-table th {
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: Montserrat Subrayada;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
}

.balance-table td {
  padding-top: 19px;
  padding-bottom: 19px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
}

.balance-table tr {
  border-bottom: 1px solid #3b3c72;
}

.balance-table tr:last-child {
  border-bottom: 0px solid red;
}

.balance-table tr:first-child {
  border-bottom: 0px solid red;
}

.balance-table .appoint-column_center {
  text-align: center;
  padding-left: 0 !important;
}

.table-row {
  background: rgba(59, 60, 114, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4.44739px 4.44739px 0px 0px;
}

.balance-data_arrow {
  margin-left: 15px;
  margin-bottom: 4px;
}

.balance-block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance-block_arrows {
  display: flex;
  flex-direction: column;
}

.balance-data_arrow {
  cursor: pointer;
}

@media (max-width: 1024px) {
  .wrapper {
    margin: 0;
    padding: 0 100px;
  }
}

@media (max-width: 768px) {
  .wrapper {
    margin: 0;
    padding: 0 40px;
  }

  .balance-form {
    flex-direction: column;
  }

  .balance-table_block::-webkit-scrollbar {
    width: 8px; 
    height: 8px; 
    background-color: #2F2D5C;;
  }

  .balance-table_block::-webkit-scrollbar-thumb {
    background: #FE2363;
    border-radius: 6px;
  }

  .balance_bill {
    width: 100%;
    text-align: center;
    font-family: Rubik;
    font-size: 24px;
}

  .balance-form input {
    margin-bottom: 30px;
    width: 100%;
  }

  .balance_btn {
    width: 100%;
  }

  .balance-table_block {
    width: 99.9%;
    max-height: 50vh;
    overflow-x: auto;
    margin-bottom: 40px;
  }

  .balance-table {
    min-width: 99.9%;
    background: rgba(59, 60, 114, 0.5);
    border-radius: 5px;
    border-collapse: collapse;
  }
}

@media (max-width: 500px) {
  .wrapper {
    margin: 0;
    padding: 0 10px;
  }

  .balance_btn {
    font-size: 14px;
  }
}
</style>
