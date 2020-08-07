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
          // name: '风向',
          value: parseInt(this.direction3)
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
          length: '20%',
          width: 2
        },
        detail: {          formatter: '{value}%',
          textStyle: {
            'fontSize': 16
          },
          offsetCenter: ['4%', '20%']
        }

      }]

    }
    windEnd.setOption(option3)
  },
  props: [
    "direction3"
  ]
}
</script>
<style>
.gauge-container {
  display: flex;
  flex-direction: row;
}
.wind-gauge {
  width: 600px;
  height: 280px;
}
</style>

