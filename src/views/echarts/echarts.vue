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
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      }],
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
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      }],
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
  props: [
    "pressure",
    "tmp"
  ]
}
</script>

<style scoped>
.line-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#myCharts {
  width: 400px;
  height: 200px;
}
#myCharts2 {
  width: 400px;
  height: 200px;
}
</style>
