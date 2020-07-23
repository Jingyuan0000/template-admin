<template>
  <div class="dashboard-container dashboard-container__home">
    <!-- <div class="dashboard-text">观测业务平台</div> -->
    <el-card class="gauge-area">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple" />
          <windDirecStart />
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" />
          <windDirecAvg />
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" />
          <windDirectEnd />
        </el-col>
      </el-row>
    </el-card>
    <el-row class="param-area">
      <!-- <div v-if="dew_point">{{ '露点：' + dew_point }}</div>
      <div v-if="pressure">{{ '气压：' + pressure }}</div>
      <div v-if="visibility">{{ '能见度：' + visibility }}</div>
      <div v-if="visibility">{{ '温度： ' + env_tmp }}</div>
      <div v-if="visibility">{{ 'ID:  ' + sensors['id'] }}</div>
      <div v-if="visibility">{{ '时间:  ' + sensors['time'] }}</div> -->
      <el-button
        type="primary"
        @click="clickButton()"
      >获取气象数据</el-button>

      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          fixed
          prop="radiation1_total"
          label="辐射1_累计(J/m²)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="radiation2_total"
          label="辐射2_累计(J/m²)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="land_tmp1"
          label="环境温度1(℃)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="land_tmp2"
          label="环境温度2(℃)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="land_tmp3"
          label="环境温度3(℃)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="land_tmp4"
          label="环境温度4(℃)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="land_tmp5"
          label="环境温度5(℃)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="env_tmp"
          label="环境温度(℃)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="env_hum"
          label="环境湿度(%RH)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="dew_point"
          label="露点(℃)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="pressure"
          label="气压(hPa)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="altitude"
          label="海拔(m)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="speed"
          label="风速(m/s)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="avg_speed2"
          label="两分钟平均风速(m/s)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="avg_speed10"
          label="十分钟平均风速(m/s)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="avg_speed10"
          label="十分钟内风速(m/s)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          fixed
          prop="radiation1"
          label="辐射1(J/m²)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="radiation2"
          label="辐射2(J/m²)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="land_hum"
          label="土湿(%m³/m³)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="battery_voltage"
          label="电池电压(V)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="rain_total"
          label="雨量日累计(mm)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="visibility"
          label="能见度(m)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="avg_visibility10"
          label="十分钟平均能见度(m)"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="sunshine_total"
          label="日照时日累计(min)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="co2"
          label="CO2(ppm)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="compass"
          label="电子罗盘(°)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="pm2_5"
          label="PM2.5(ug/m³)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="pm10"
          label="PM10(ug/m³)"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="noise"
          label="噪声"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="illumination"
          label="光照"
          width="60"
        >
        </el-table-column>

      </el-table>

    </el-row>
  </div>

</template>


<script>
import { mapGetters } from 'vuex'
// import echarts from '../echarts/echarts'
import windDirecStart from '../echarts/windDirecStart'
import windDirectEnd from '../echarts/windDirectEnd'
import windDirecAvg from '../echarts/windDirecAvg'
export default {
  name: 'Dashboard',
  components: {
    // Echarts: echarts,
    windDirecStart,
    windDirectEnd,
    windDirecAvg
  },
  data() {
    return {
      tableData1: [
        {
          param: '风向',
          max2min: '340 °',
          min2min: '330 °',
          avg2min: '340 °',
          max10min: '20 °',
          avg10min: '320 °',
          min10min: '280 °'
        },
        {
          param: '风速',
          max2min: '',
          min2min: '',
          avg2min: '',
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '光学能见度',
          max2min: '',
          min2min: '',
          avg2min: '',
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '场面气压',
          max2min: '',
          min2min: '',
          avg2min: '799.4',
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '修正海压',
          max2min: '',
          min2min: '',
          avg2min: '',
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '云低高度',
          max2min: '',
          min2min: '',
          avg2min: 'NCD',
          max10min: '',
          avg10min: 'NCD',
          min10min: ''

        },
        {
          param: '露点',
          max2min: '',
          min2min: '',
          avg2min: '17.3',
          max10min: '',
          avg10min: '',
          min10min: ''

        }

      ],
      tableData2: [
        {
          param: '风向',
          max2min: '340 °',
          min2min: '330 °',
          avg2min: '340 °',
          max10min: '20 °',
          avg10min: '320 °',
          min10min: '280 °'
        },
        {
          param: '风速',
          max2min: '',
          min2min: '',
          avg2min: '',
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '光学能见度',
          max2min: '',
          min2min: '',
          avg2min: this.visibility && this.visibility,
          max10min: '',
          avg10min: '',
          min10min: ''
        },
        {
          param: '跑道起点温度',
          max2min: '',
          min2min: '',
          avg2min: ' ',
          max10min: '',
          avg10min: ' ',
          min10min: ''
        },
        {
          param: '跑道终点温度',
          max2min: '',
          min2min: '',
          avg2min: ' ',
          max10min: '',
          avg10min: '',
          min10min: ''
        }

      ],
      tableData3: [
        {
          weather: '雷电',
          light: '3',
          bg: '16 cd/m²'
        }
      ],
      getDataUrl: 'http://127.0.0.1:8443/login',
      sensors: [],
      dew_point: '',
      pressure: '',
      visibility: '',
      env_tmp: '',
      tableData: [],
      loading: false
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },

  watch: {
    sensors() {
    }
  },
  created() {

  },
  mounted() {
    // this.$socket.emit('request', this.id)
    this.getData()
  },
  destroyed() {
    // this.$socket.close()
  },

  methods: {
    CellStyle({ row, rowIndex }) {
      return 'text-align:center;'
    },
    HeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#F5F7FA;color:#999;font-wight:30;font-size:14px;text-align:center;border-color:#ddd'
    },
    // 测试获取数据

    getData() {
      this.loading = true
      var that = this
      this.$.ajax({
        url: that.getDataUrl,
        type: 'get',
        success: function (data) {
          console.log('success: ', data.data[0])
          that.sensors = data.data[0]
          that.dew_point = that.sensors['dew_point']
          that.pressure = that.sensors['pressure']
          that.visibility = that.sensors['visibility']
          that.env_tmp = that.sensors['env_tmp']
          that.tableData.push(that.sensors)
          that.loading = false
        },
        error: function (xhr, errorType, error) {
          console.log('Ajax error: ' + error)
          that.loading = false
        }

      })
    },
    clickButton() {
      this.tableData = []
      this.getData()

      // this.$socket.emit('request', val)
      // console.log('clickButton', val)
    }
  },
  sockets: {
    // connect() {
    //   this.id = this.$socket.id
    //   // this.$socket.emit('request', this.id)
    //   console.log('连接服务器')
    // },
    disconnect() {
      console.log('断开服务器')
    },
    msg(data) {
      console.log(data)
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 46px;
    text-align: center;
  }
}
.dashboard-text {
  padding-bottom: 16px;
  font-size: 26px;
  font-weight: bold;
  color: #999;
}
.dashboard-container__home {
  margin-top: 0;
}
.gauge-area {
  padding-bottom: 0;
}
.param-area {
  margin-top: 30px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.tb-avg,
.tb-avg:after {
  border: 2px solid #336699;
  border-right: 1px;
}
.tb-extra {
  border: 2px dashed #3d9970;
}
</style>
