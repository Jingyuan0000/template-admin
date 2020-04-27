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
        text: '跑道起点风向',
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
          value: 340
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

    windStart.setOption(option1)
  }
}
</script>

