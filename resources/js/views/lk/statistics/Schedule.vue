<template lang="html">
  <div class="statistics_schedule">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart({
      labels: ['26.05.2021', '28.05.2021', '30.05.2021', '31.05.2021'],
      datasets: [
        {
          label: 'Просмотров',
          data: [300, 400, 1200, 800],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: [
            'rgba(99, 104, 160, 1)',
            'rgba(99, 104, 160, 1)',
            'rgba(99, 104, 160, 1)',
            'rgba(99, 104, 160, 1)',
          ],
          borderWidth: 3,
          lineTension: 0,
        },
        {
          label: 'Подписчиков',
          data: [0, 800, 450, 2000],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: [
            'rgba(254, 35, 99, 1)',
            'rgba(254, 35, 99, 1)',
            'rgba(254, 35, 99, 1)',
            'rgba(254, 35, 99, 1)',
          ],
          borderWidth: 3,
          lineTension: 0,
        },
        {
          label: 'CTR',
          data: [0, 100, 150, 200],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: [
            'rgba(169, 171, 196, 1)',
            'rgba(169, 171, 196, 1)',
            'rgba(169, 171, 196, 1)',
            'rgba(169, 171, 196, 1)',
          ],
          borderWidth: 3,
          lineTension: 0,
        },
      ],
    })
  },
}
</script>

<style lang="css" scoped>
.statistics_schedule {
  width: 100%;
  margin-bottom: 83px;
  margin-top: 90px;
}
</style>
