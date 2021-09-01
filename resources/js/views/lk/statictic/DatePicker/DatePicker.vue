<template>
  <div class="range-date_main">
    <div class="range-date-picker-container">
      <transition name="panelIn">
        <range-date-picker
          class="range-date-picker"
          v-model="dates"
          language="en"
          v-show="show"
          @closePicker="closePicker"
        ></range-date-picker>
      </transition>
      <input
        class="range-date-input"
        @click="showPicker"
        placeholder="26.05.2021 - 31.05.2021"
        :value="rangeDates"
      >
        <img
              :src="require('../../../../../js/assets/img/calendar2.svg').default"
              class="DatePicker-img"
              @click="showPicker"
            />
      </input>
    </div>
  </div>
</template>

<script>
import RangeDatePicker from "vue-easy-range-date-picker";
import { parseTime } from "./util.js";
export default {
  data() {
    return {
      show: false,
      dates: {},
    };
  },
  methods: {
    parseTime,
    closePicker() {
      this.show = false;
    },
    showPicker() {
      this.show = true;
    },
  },
  computed: {
    rangeDates() {
      if (Object.keys(this.dates).length === 2) {
        return `${this.parseTime(
          this.dates.start,
          "d.m.y"
        )}  -  ${this.parseTime(this.dates.end, "d.m.y")}`;
      } else {
        return "";
      }
    },
  },
  components: {
    RangeDatePicker,
  },
};
</script>

<style lang="scss">
.range-date-picker-container {
  position: relative;
  display: inline-block;
  background: #3B3C72;
  box-shadow: 0px 3.28342px 3.28342px rgba(0, 0, 0, 0.25);
  border-radius: 4.92513px;
  width: 342px;
  margin-right: 40px;
  input {
    width: 100%;
    padding: 10px 40px 10px 72px;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: #FFFFFF;
    cursor: pointer;
  }
}
.date-picker .head .text {
  color: black;
}
.DatePicker-img {
  position: absolute;
  top: 12px;
  left: 40px;
  cursor: pointer;
}
@media (max-width: 700px) {
  .range-date-picker-container {
    width: 100%;
    margin-right: 0;

    input {
      text-align: center;
    }
  }
  .range-date_main {
    width: 100%;
  }
}
</style>
