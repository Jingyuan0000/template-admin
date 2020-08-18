<template>
  <div class="gauge-container">
    <div
      ref="runwayStart"
      class="wind-gauge"
    />

  </div>

</template>
<script>
export default {
  mounted() {
    const windStart = this.$echarts.init(this.$refs.runwayStart)
    const option1 = {
      title: {
        text: '风向',
        left: 'center'
      },
      grid: {
        bottom: 0,
        right: 0,
        left: 0

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
          name: '',
          value: parseInt(this.direction1)
        }],
        splitNumber: 12,
        axisLine: {
          show: true,
          length: 20
        },
        axisTick: {
          show: true,
          length: 6,
          lineStyle: {
            color: '#333'
          }
        },
        axisLabel: {
          show: true,
          fontSize: 10
        },
        poiter: {
          length: '40%',
          width: 4
        },
        detail: {          formatter: '{value}%',
          textStyle: {
            'fontSize': 16
          },
          offsetCenter: ['4%', '20%']
        }

      }]

    }

    windStart.setOption(option1)
  },
  props: [
    "direction1"
  ]
}
</script>

<style scoped>
.wind-gauge {
  width: 260px;
  height: 260px;
}
</style>

