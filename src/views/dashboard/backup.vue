<template>
  <div class="dashboard-container dashboard-container__home">
    <el-card class="gauge-area">
      <el-row>
        <el-col :span="18">
          <el-tag
            :key="tag.index"
            v-for="tag in dynamicTags"
            type="success"
            effect="plain"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            class="sensor_tag"
          >
            {{tag.name + ' ' + tag.value}}
          </el-tag>
          <el-select
            class="input-new-tag"
            v-if="selectVisible"
            v-model="selectValue"
            ref="saveSelectInput"
            size="small"
            @change="handleSelectConfirm(selectValue)"
            placeholder="请选择气象信息"
          >
            <el-option
              v-for="item in newSocketData"
              :key="item.index"
              :label="item.name"
              :value="item.name + ':'+item.value"
            >

            </el-option>
          </el-select>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showSelect"
          >+ 气象要素</el-button>
          <p>{{this.socketData}}</p>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" />
          <windDirecStart
            v-if="flag"
            :direction1="windDirection"
          />
        </el-col>

        <!-- <el-col :span="8">
          <div class="grid-content bg-purple" />
          <windDirecAvg
            v-if="flag"
            :direction2="windDirection"
          />
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" />
          <windDirectEnd
            v-if="flag"
            :direction3="windDirection"
          />
        </el-col> -->
      </el-row>
    </el-card>
    <el-card>

      <el-row class="param-area">
        <!-- <el-button
        type="primary"
        @click="clickButton()"
        class="flush"
      >获取气象数据</el-button> -->
        <el-col :span="12">
          <el-table
            border
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column
              fixed
              label="气象参数"
            >

            </el-table-column>
            <el-table-column
              v-for="(item, index) of sensorName"
              :key="index"
              :prop="item.prop"
              :label="item.name"
              width="90"
            >
            </el-table-column>

          </el-table>

        </el-col>

      </el-row>
    </el-card>

  </div>

</template>


<script>
import { mapGetters } from 'vuex'
import windDirecStart from '../echarts/windDirecStart'
import windDirectEnd from '../echarts/windDirectEnd'
import windDirecAvg from '../echarts/windDirecAvg'
import SocketIO from 'socket.io-client'
import { sensorName } from '../../utils/sensor'

export default {
  name: 'Dashboard',
  components: {
    windDirecStart,
    windDirectEnd,
    windDirecAvg,
    SocketIO
  },
  data() {
    return {

      getDataUrl: 'http://127.0.0.1:8500/login',
      sensors: [],
      windDirection: '70',
      tableData: [],
      loading: false,
      flag: true,
      dynamicTags: JSON.parse(localStorage.dynamicTags) || [],
      selectVisible: false,
      selectValue: '',
      sensorName: sensorName,
      sensorValue: [
        {          name: '1',
          value: '30'        },
        {          name: '2',
          value: '40'        },
        {          name: '3',
          value: '50'        }
      ],
      socketData: { "id": 680, "radiation1_total": 0, "radiation2_total": 0, "land_tmp1": 0, "land_tmp2": 0, "land_tmp3": 0, "land_tmp4": 0, "land_tmp5": 0, "env_tmp": 25, "env_hum": 63.3, "dew_point": 17.54, "pressure": 802.6, "altitude": 1927, "speed": 0, "avg_speed2": 0, "avg_speed10": 0, "wind_direction": 0, "radiation1": 0, "radiation2": 0, "land_hum": 0, "battery_voltage": 13.2, "rain_total": 0, "visibility": 0, "avg_visibility10": 0, "sunshine_total": 0, "co2": 0, "compass": 0, "pm2_5": 0, "pm10": 0, "noise": 0, "illumination": 0, "dtu": "13722000038", "device_no": "0001", "function_code": "030C", "date": "2020-08-05T16:00:00.000Z", "time": "102000" },
      newSocketData: []
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
    // this.initSocket()

  },
  mounted() {
    this.$nextTick(function () {
      var _this = this
    })
    // this.getData()
    this.dealOption()

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

    // 获取数据
    getData() {
      this.loading = true
      var that = this
      this.$.ajax({
        url: that.getDataUrl,
        type: 'get',
        success: function (data) {
          // console.log('success: ', data.data[0])
          that.sensors = data.data[0]
          that.env_tmp = that.sensors['env_tmp']
          that.windDirection = that.sensors['wind_direction']
          that.flag = true
          that.tableData.push(that.sensors)
          that.loading = false


        },
        error: function (xhr, errorType, error) {
          console.log('Ajax error: ' + error)
          that.loading = false
        }

      }).then(function (data) {


      })
    },

    // 点击获取新数据
    clickButton() {
      this.tableData = []
      this.getData()
    },

    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showSelect() {
      this.selectVisible = true
      this.$nextTick(_ => {
        console.log('lll', this.$refs.saveSelectInput.value)
        // this.$refs.saveSelectInput.value.focus()
      })
    },
    // 处理下拉选项
    dealOption() {

      var socketKeys = Object.keys(this.socketData)
      console.log(socketKeys)

      for (let i = 0; i < this.sensorName.length; i++) {
        console.log(socketKeys.indexOf(this.sensorName[i].prop))

        if (socketKeys.indexOf(this.sensorName[i].prop) !== -1) {
          var a = {
            name: '',
            prop: '',
            value: ''
          }
          a.name = this.sensorName[i].name
          a.prop = this.sensorName[i].prop
          let v = a.prop
          a.value = this.socketData[v]
          this.newSocketData.push(a)
        }

      }
      console.log('newSocketData: ', this.newSocketData)
    },

    //点选添加气象要素
    handleSelectConfirm(v) {
      let currTag = {}
      console.log('item', v)
      let currArr = v.split(':')
      console.log('currArr', currArr)
      currTag.name = currArr[0]
      currTag.value = parseInt(currArr[1])
      console.log('currTag', currTag)
      this.dynamicTags.push(currTag)
      if (this.dynamicTags.length > 1) {

        this.dynamicTags = this.unique(this.dynamicTags);

      }
      localStorage.setItem('dynamicTags', JSON.stringify(this.dynamicTags))
      console.log('localStorage', localStorage.dynamicTags)
    },

    // 初始化socket
    initSocket() {
      this.sockets.listener.subscribe('relogin', (msg) => {
        // this.socketData = JSON.parse(msg);
        console.log('msg' + msg);
        this.socketData = msg;
        console.log('客户端已收到', this.socketData);

      })


    },
    unique(arr) {
      var obj = {};
      arr = arr.reduce(function (item, next) {
        obj[next.name] ? '' : obj[next.name] = true && item.push(next);
        return item;
      }, []);
      console.log('unique', arr)
      return arr
    }

  },
  sockets: {
    connect() {
      console.log('链接成功')


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
  margin-bottom: 30px;
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
// 标签
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 80px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.sensor_tag {
  // height: 40px;
  // width: 120px;
  position: relative;
}
.sensor_tag .el-icon-close {
  position: absolute !important;
  right: 2%;
  top: 2%;
}
.flush {
  margin-top: 10px;
  margin-bottom: 40px;
}
</style>
