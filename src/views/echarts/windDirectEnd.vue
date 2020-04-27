<template>
  <div class="gauge-container">
    <div
      ref="runwayEnd"
      class="wind-gauge"
    />

  </div>

</template>
<script>
export default {
  mounted() {
    const windEnd = this.$echarts.init(this.$refs.runwayEnd)

    const option3 = {
      title: {
        text: '跑道终点风向',
        left: 'center'
      },
      series: [{
        type: 'gauge',
        center: ['50%', '50%'],
        startAngle: 90,
        endAngle: -269,
        radius: '60%',
        min: 0,
        max: 360,
        data: [{
          name: '风向',
          value: 320
        }],
        splitNumber: 12,
        axisLine: {
          show: true,
          length: 20
        },
        axisTick: {
          show: true,
          length: 10,
          lineStyle: {
            color: '#333'
          }
        },
        axisLabel: {
          show: true
        },
        poiter: {
          length: '40%',
          width: 4
        }

      }]

    }
    windEnd.setOption(option3)
  }
}
</script>
<style>
.gauge-container {
  display: flex;
  flex-direction: row;

}
.wind-gauge {
  width: 600px;
  height: 400px;

}
</style>

