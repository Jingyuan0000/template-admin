<template>
  <div class="gauge-container">

    <div
      ref="runwayAverage"
      class="wind-gauge"
    />

  </div>

</template>
<script>
export default {
  mounted() {
    const windAverage = this.$echarts.init(this.$refs.runwayAverage)

    const option2 = {
      title: {
        offsetCenter: ['40%', 0]
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
          value: 330
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
        detail: { formatter: '{value}%',
          textStyle: {
            'fontSize': 16
          },
          offsetCenter: ['4%', '20%']
        }

      }]

    }

    windAverage.setOption(option2)
  }
}
</script>

