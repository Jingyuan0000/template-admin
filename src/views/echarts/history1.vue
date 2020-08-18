<template>
  <div class="history-container">
    <div
      id="myChartsTmp"
      ref="myChartsTmp"
    />
    <div
      id="myChartsHum"
      ref="myChartsHum"
    />

    <div
      id="myChartsDew"
      ref="myChartsDew"
    />

  </div>
</template>
<script>

export default {
  data() {
    return {
      tmp: [],
      hum: [],
      dew: [],
      timeline: []
    }
  },

  mounted() {
    const myChartsTmp = this.$echarts.init(this.$refs.myChartsTmp)
    const myChartsHum = this.$echarts.init(this.$refs.myChartsHum)
    const myChartsDew = this.$echarts.init(this.$refs.myChartsDew)

    console.log('localStorage.tmpHistory111', JSON.parse(localStorage.getItem('tmpHistory')))

    this.tmp = JSON.parse(localStorage.getItem('tmpHistory')) || []
    this.hum = JSON.parse(localStorage.getItem('humHistory')) || []
    this.dew = JSON.parse(localStorage.getItem('dewHistory')) || []
    this.timeline = JSON.parse(localStorage.getItem('timeLine')) || []


    const optionTmp = {
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
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        },
        interval: 2,
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
        top: 36

      },
      series: [ // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: '温度',
          connectNulls: true,

          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.tmp,
          lineStyle: {
            color: 'rgb(220, 87, 18)'
          }
        }
      ]    }

    const optionHum = {
      title: {
        text: '10分钟内湿度变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['湿度']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} (%RH)'
        },
        interval: 1,
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
        top: 36


      },
      series: [ // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: '湿度',
          connectNulls: true,

          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.hum,
          lineStyle: {
            color: 'rgb(229, 131, 8)'
          }
        }

      ]
    }

    const optionDew = {
      title: {
        text: '10分钟内露点变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['露点']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        },
        interval: 2,
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
        top: 36

      },
      series: [ // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: '露点',
          connectNulls: true,

          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.dew,
          lineStyle: {
            color: 'rgb(220, 87, 18)'
          }
        }
      ]
    }


    myChartsTmp.setOption(optionTmp)
    myChartsHum.setOption(optionHum)
    myChartsDew.setOption(optionDew)
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
  // props: [
  //   "pressure",
  //   "hum",
  //   "dew",
  //   "timeline"
  // ],

}
</script>

<style scoped>
.history-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#myChartsTmp {
  width: 500px;
  height: 300px;
}
#myChartsHum {
  width: 500px;
  height: 300px;
}
#myChartsDew {
  width: 500px;
  height: 300px;
}
#myChartsPressure {
  width: 300px;
  height: 200px;
  /* margin-top: 40px; */
}
</style>
