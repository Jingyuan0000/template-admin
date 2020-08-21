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
          length: 20,
          lineStyle: {
            color: [[0.2, '#6495ed'], [0.8, '#6495ed'], [1, '#6495ed']],
            width: 16
          }


        },
        splitLine: {
          length: '20%',
          lineStyle: {
            color: '#336699'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#336699'
          }
        },
        axisLabel: {
          show: true,
          fontSize: 10,
          distance: 4
        },
        poiter: {
          length: '20%',
          width: 1
        },
        detail: {          formatter: '{value}°',
          textStyle: {
            'fontSize': 16,
            'color': '#B03A5B'
          },
          offsetCenter: ['4%', '-34%']
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

