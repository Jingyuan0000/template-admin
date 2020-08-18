<template>
  <div class="line-container">

    <div
      id="myCharts"
      ref="myCharts"
    />
    <div
      id="myCharts2"
      ref="myCharts2"
    />
  </div>
</template>
<script>
export default {
  mounted() {
    const myCharts = this.$echarts.init(this.$refs.myCharts)
    const myCharts2 = this.$echarts.init(this.$refs.myCharts2)

    const options = {
      title: {
        text: '10分钟内气压变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['气压']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        data: this.timeline
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        },
        interval: 2,
        // min: 795,
        // max: 804
        max: function (value) {
          return (value.max + 0.01 * (value.min)).toFixed(2);
        },
        min: function (value) {
          return (value.min - 0.01 * (value.min)).toFixed(2);
        },
      }],
      grid: {
        left: 70,
        bottom: 20,
        top: 30

      },
      series: [ // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: '气压',
          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          data: this.pressure,
          lineStyle: {
            color: 'rgb(220, 87, 18)'
          }
        }
      ]    }

    const options2 = {
      title: {
        text: '10分钟内温度变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['温度']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        data: this.timeline
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        },
        interval: 1,
        // min: 795,
        // max: 804
        max: function (value) {
          return (value.max + 0.01 * (value.min)).toFixed(3);
        },
        min: function (value) {
          return (value.min - 0.01 * (value.min)).toFixed(3);
        },
      }],
      grid: {
        left: 70,
        bottom: 20,
        top: 30


      },
      series: [ // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: '温度',
          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          data: this.tmp,
          lineStyle: {
            color: 'rgb(229, 131, 8)'
          }
        }

      ]    }

    myCharts.setOption(options)
    myCharts2.setOption(options2)
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (this.timeline) {
          if (newVal) {
            this.myCharts.setOption(newVal)
          } else {
            this.myCharts.setOption(oldVal)
          }
        }
      },
      deep: true
    }

  },
  props: [
    "pressure",
    "tmp",
    "timeline"
  ]
}
</script>

<style scoped>
.line-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#myCharts {
  width: 600px;
  height: 180px;
}
#myCharts2 {
  width: 600px;
  height: 180px;
  margin-top: 30px;
}
</style>
