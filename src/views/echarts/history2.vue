<template>
  <div class="history2-container">

    <div
      id="myChartsPressure"
      ref="myChartsPressure"
    />

    <div
      id="myChartsSpeed"
      ref="myChartsSpeed"
    />

    <div
      id="myChartsDirection"
      ref="myChartsDirection"
    />
  </div>
</template>

<script>

export default {
  data() {
    return {
      pressureHistory: [],
      speedHistory: [],
      directionHistory: [],
      timeline: []

    }
  },

  mounted() {
    const myChartsPressure = this.$echarts.init(this.$refs.myChartsPressure)
    const myChartsSpeed = this.$echarts.init(this.$refs.myChartsSpeed)
    const myChartsDirection = this.$echarts.init(this.$refs.myChartsDirection)

    this.pressureHistory = localStorage.pressureHistory || []
    this.speedHistory = localStorage.speedHistory || []
    this.directionHistory = localStorage.directionHistory || []
    this.timeline = JSON.parse(localStorage.getItem('timeLine')) || []



    const optionPressure = {
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
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline,
        inverse: true
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} (hPa)'
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
          name: '气压',
          connectNulls: true,
          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.pressureHistory,
          lineStyle: {
            color: '#dc3545'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#fff' // 0% 处的颜色
              }, {
                offset: 1, color: '#dc3545' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }

          }
        }
      ]
    }

    const optionSpeed = {
      title: {
        text: '10分钟内风速变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['风速']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline,
        inverse: true
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} (m/s)'
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
          name: '风速',
          connectNulls: true,
          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.speedHistory,
          lineStyle: {
            color: '#fd7e14'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#fff' // 0% 处的颜色
              }, {
                offset: 1, color: '#fd7e14' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }

          }
        }
      ]    }

    const optionDirection = {
      title: {
        text: '10分钟内风向变化', // 图表顶部的标题
        // subtext: '模拟数据' // 副标题
      },
      tooltip: { // 鼠标悬浮框的提示文字
        trigger: 'axis'
      },
      legend: {
        data: ['风向']
      },
      xAxis: [{ // x轴坐标数据
        type: 'category',
        boundaryGap: false,
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data: this.timeline,
        inverse: true
      }],
      yAxis: [{ // y轴坐标数据
        type: 'value',
        axisLabel: {
          formatter: '{value} (°)'
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
          name: '风向',
          connectNulls: true,

          type: 'line', // pie->饼状图  line->折线图  bar->柱状图
          // data: [1, 3, 4, 6, 9, 10],
          data: this.directionHistory,
          lineStyle: {
            color: '#007bff'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#fff' // 0% 处的颜色
              }, {
                offset: 1, color: '#007bff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }

          }
        }

      ]
    }






    myChartsPressure.setOption(optionPressure)
    myChartsSpeed.setOption(optionSpeed)
    myChartsDirection.setOption(optionDirection)
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
  //   "tmp",
  //   "timeline"
  // ]
}
</script>

<style scoped>
.history2-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#myChartsPressure {
  width: 500px;
  height: 300px;
  /* margin-top: 40px; */
}

#myChartsSpeed {
  width: 500px;
  height: 300px;
}
#myChartsDirection {
  width: 500px;
  height: 300px;
}
</style>
