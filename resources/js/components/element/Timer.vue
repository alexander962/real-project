<template lang="html">
  <div>
    <div class="page_time">
        {{ text }}
        <span class="page_time_number">
            {{minutes}}:{{seconds}}
        </span>
    </div>
    <div class="timer_box">
        <span :style="{'width': `${progress}%`}">>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.time,
      max: this.time,
      progress: 100,
      minutes: this.getMinutes(this.time),
      seconds: this.getSeconds(this.time),
    };
  },
  props: {
      time: {
        type: Number,
        default: 180
      },
      text: {
        type: String,
        default: "Материал станет недоступным через:"
      }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
        let vm = this;
        let timer = setInterval(function() {
            vm.value -= 1;
            vm.progress = vm.value * 100 / vm.max;
            vm.minutes = vm.getMinutes(vm.value);
            vm.seconds = vm.getSeconds(vm.value);
            if (vm.value <= 0) clearInterval(timer);
        }, 1000);
    },
    getMinutes(time) {
        return Math.trunc(time / 60);
    },
    getSeconds(time) {
        return (time - 60 * this.getMinutes(time)).toString().padStart(2,0);
    }
  }
}
</script>

<style lang="css" scoped>
    .page_time {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;

        margin-top: 21px;
    }

    .page_time_number {
        font-size: 20px;
    }
    .timer_box {
        /* width: 395px; */
        min-width: 320px;
        width: 100%;
        box-sizing: content-box;
        height: 10px;
        position: relative;
        margin: 20px 0 45px 0;
        background: #383E80;
        border-radius: 10px;
    }
    .timer_box span {
        border-radius: 10px;
        display: block;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(#FF9CB9, #FE2363);
        background: #FE2363;
    }
    .timer_box > span:after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        background-size: 60px 60px;
        -webkit-animation: move-data-v-55939dd2 2s linear infinite;
        animation: move-data-v-55939dd2 2s linear infinite;
        border-radius: 10px;
        overflow: hidden;
        background-image: linear-gradient( 45deg, #ff9cb9 25%, transparent 25%, transparent 50%, #ff9cb9 50%, #ff9cb9 75%, transparent 75%, transparent );
    }

    .page_body.type-3 .timer_box {
        background: #898989;
    }
    .page_body.type-3 .page_time, .page_body.type-3 .page_time_number {
        color: #898989;
    }
    .page_body.type-7 .timer_box {
        background: #9FA1B7;
    }

    .page_body.type-7 .page_time, .page_body.type-7 .page_time_number {
        color: #9FA1B7;
    }


    @keyframes move {
        0% {
            background-position: 60px 0;
        }
        100% {
            background-position: 0 0;
        }
    }
</style>

