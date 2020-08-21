<template>
  <div class="dashboard-container dashboard-container__home">
    <div class="upper-part">
      <div class="tag-container">
        <ul class="time-ul">
          <li>
            <p class="time-ul__date">UTC时间：{{utcDate}}</p>
            <p class="time-ul__time"> {{utcTime}}</p>

          </li>
          <li>
            <p class="time-ul__date">北京时间：{{date}}</p>
            <p class="time-ul__time"> {{timestamp}}</p>
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) in taglist">
            <span>
              {{item.name}}
            </span>
            <h3>
              {{item.value}}
            </h3>
          </li>
        </ul>
      </div>
      <div class="panel-container">
        <windDirecStart
          :direction1="windDirection"
          v-if="showPanel"
        />
      </div>

    </div>
    <div class="lower-part">
      <div class="classify-area">
        <el-card class="classify-card cloud-class">
          <div
            slot="header"
            class="clearfix card1"
          >
            <span>云</span>
          </div>
          <speedTable
            :tableData="cloud"
            :tableStyle="{ width: '500px' }"
          ></speedTable>
        </el-card>
        <el-card class="classify-card wind-class">
          <div
            slot="header"
            class="clearfix card1"
          >
            <span>风向</span>
          </div>
          <windDirectTable
            :tableData="windDir"
            :tableStyle="{ width: '500px' }"
          ></windDirectTable>
        </el-card>
        <el-card class="speed-class">
          <div
            slot="header"
            class="clearfix card1"
          >
            <span>风速</span>
          </div>
          <cloudTable
            :tableData="windSpeed"
            :tableStyle="{ width: '500px' }"
          ></cloudTable>
        </el-card>

      </div>

      <el-card>
        <mailTable
          :tableData="allNewSocket"
          :tableStyle="{ width: '400px' }"
        ></mailTable>

      </el-card>

      <el-row class="param-area">
        <el-col>
          <Echarts
            :pressure="pressureHistory"
            :tmp="tmpHistory"
            :timeline="timeLine"
            v-if="showLine"
          />
        </el-col>
      </el-row>
    </div>
    <div class="report">
      <div class="report-title">报文 METAR</div>
      <div class="report-content"></div>

    </div>
  </div>
</template>

<script>
import windDirecStart from "../echarts/windDirecStart"
import echarts from "../echarts/echarts" // 右下折线图
import sensorTable from "../echarts/sensorTable" // 下方中间表格
import speedTable from "../echarts/speedTable"
import windDirectTable from "../echarts/windDirectTable"
import cloudTable from "../echarts/cloudTable"
import SocketIO from "socket.io-client"
import { sensorName } from "../../utils/sensor"
import { showLoading, hideLoading } from '../../utils/loading'

export default {
  name: "Dashboard",
  components: {
    windDirecStart,
    SocketIO,
    Echarts: echarts,
    mailTable: sensorTable,
    speedTable,
    windDirectTable,
    cloudTable

  },
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
      getDataUrl: "http://127.0.0.1:8500/login",
      windDirection: '', // 右上方风向仪表盘
      showPanel: false,
      showLine: false, // 右下方折线图
      sensorName: sensorName,
      taglist: [], // 上方主要气象要素
      timestamp: '', // 传来的时间
      socketData: [], // 最新一条所有数据
      newSocketData: [], // 有传感器的数据
      historyData: [],
      date: '',
      windSpeed: [], // 下方左边风速区
      windDir: [], // 下方左边风向区
      cloud: [], // 下方左边云区
      allNewSocket: [], // 下方中间综合数据

      pressureHistory: [],
      tmpHistory: [],
      humHistory: [],
      dewHistory: [],
      speedHistory: [],
      directionHistory: [],
      timeLine: [],
      QNH: '',
      altitude: '',
      pressure: '',
      utcDate: '',
      utcTime: ''
    };
  },

  created() {
    this.initSocket()
    this.styleObject = this.tableStyle
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow
    }
  },
  computed: {
    rowCount: function () {
      return Math.ceil(this.tableData.length / 2)
    }
  },
  mounted() {
    this.$nextTick(function () {
      var _this = this
    })
    let currdate = new Date()
    this.date = this.dateFormat('YYYY-mm-dd', currdate)


    // 判断localStorage 是否有数据
    if (!JSON.parse(localStorage.getItem('newSocketData'))) {
      showLoading()
      return
    } else {
      let oleSocketData = JSON.parse(localStorage.getItem('newSocketData'))
      this.taglist = oleSocketData.slice(0, 8)
      this.timestamp = JSON.parse(localStorage.getItem('timestamp'))
      this.windDirection = JSON.parse(localStorage.getItem('windDirection'))
      this.showPanel = true
      this.allNewSocket = JSON.parse(localStorage.getItem('allNewSocket'))
      this.windDir = JSON.parse(localStorage.getItem('windDir'))
      this.windSpeed = JSON.parse(localStorage.getItem('windSpeed'))
      this.cloud = JSON.parse(localStorage.getItem('cloud'))


      this.pressureHistory = JSON.parse(localStorage.getItem('pressureHistory'))
      this.tmpHistory = JSON.parse(localStorage.getItem('tmpHistory'))
      this.timeLine = JSON.parse(localStorage.getItem('timeLine'))
      this.humHistory = JSON.parse(localStorage.getItem('humHistory'))
      this.dewHistory = JSON.parse(localStorage.getItem('dewHistory'))
      this.speedHistory = JSON.parse(localStorage.getItem('speedHistory'))
      this.directionHistory = JSON.parse(localStorage.getItem('directionHistory'))
      this.QNH = JSON.parse(localStorage.getItem('QNH'))
      this.utcDate = JSON.parse(localStorage.getItem('utcDate'))
      this.utcTime = JSON.parse(localStorage.getItem('utcTime'))

      this.showLine = true
    }
  },
  destroyed() {
    this.$socket.close()
  },

  methods: {

    // 初始化socket
    initSocket() {
      // showLoading()
      this.sockets.listener.subscribe("relogin", msg => {
        // this.socketData = JSON.parse(msg)
        this.socketData = msg
        console.log("客户端已收到最新一条", this.socketData)
        this.dealOption()
      });
      this.sockets.listener.subscribe("lastTen", msg => {
        this.historyData = msg
        console.log("已收到最新十条", this.historyData)

        this.dealHistory()
        let currdate = new Date()
        this.date = this.dateFormat('YYYY-mm-dd', currdate)
        var y = currdate.getUTCFullYear();
        var m = currdate.getUTCMonth();
        var d = currdate.getUTCDate();
        var h = currdate.getUTCHours();
        var M = currdate.getUTCMinutes();
        console.log('UTC 各部分时间', m, d, h, M)
        if (m < 10) {
          this.utcDate = y + '-' + '0' + (m + 1) + '-' + d
        } else {
          this.utcDate = y + '-' + (m + 1) + '-' + d
        }
        if (h < 10) {
          this.utcTime = '0' + h + ':' + M
        } else {
          this.utcTime = h + ':' + M

        }

        localStorage.setItem('utcDate', JSON.stringify(this.utcDate))
        localStorage.setItem('utcTime', JSON.stringify(this.utcTime))



      });
    },

    // 处理标签选项
    dealOption() {
      this.newSocketData = []
      this.taglist = []
      this.windSpeed = []
      this.windDir = []
      this.cloud = []
      let currAllSocket = []
      let currWindSpeed = []
      let currCloud = []
      let currWindDir = []
      var socketObject = JSON.parse(this.socketData)
      // var socketObject = this.socketData
      this.windDirection = socketObject.wind_direction
      this.altitude = socketObject.altitude
      this.pressure = socketObject.pressure
      this.QNH = (this.altitude && this.pressure ? this.pressure + this.altitude / 8.25 : '/').toFixed(2)
      localStorage.setItem('QNH', JSON.stringify(this.QNH))
      localStorage.setItem('windDirection', JSON.stringify(this.windDirection))
      this.timestamp = socketObject.time.substring(0, 4)
      let fullstamp = this.timestamp.substring(0, 2) + ':' + this.timestamp.substring(2)
      localStorage.setItem('timestamp', JSON.stringify(fullstamp))
      this.timestamp = fullstamp
      this.showPanel = true
      var socketKeys = Object.keys(socketObject)

      for (let i = 0; i < this.sensorName.length; i++) {
        if (socketKeys.indexOf(this.sensorName[i].prop) !== -1) {
          var a = {
            name: "",
            prop: "",
            value: ""
          };
          a.name = this.sensorName[i].name
          a.prop = this.sensorName[i].prop
          let v = a.prop
          a.value = socketObject[v]
          this.newSocketData.push(a)
        }
      }
      localStorage.setItem('newSocketData', JSON.stringify(this.newSocketData))

      this.taglist = this.newSocketData.slice(0, 8)

      currWindSpeed.push(this.newSocketData[4], this.newSocketData[5], this.newSocketData[3])
      this.windSpeed = currWindSpeed
      localStorage.setItem('windSpeed', JSON.stringify(this.windSpeed))


      let wd1 = {
        name: '两分钟平均风向(°)',
        prop: '',
        value: '/'
      }
      let wd2 = {
        name: '十分钟平均风向(°)',
        prop: '',
        value: '/'
      }
      currWindDir.push(wd1, wd2, this.newSocketData[6])
      this.windDir = currWindDir
      localStorage.setItem('windDir', JSON.stringify(this.windDir))

      let cld1 = {
        name: '云高(m)',
        prop: '',
        value: '/'
      }
      let cld2 = {
        name: '云量(%)',
        prop: '',
        value: '/'
      }
      let cld3 = {
        name: '云状',
        prop: '',
        value: '/'
      }

      currCloud.push(cld1, cld2, cld3)
      this.cloud = currCloud
      localStorage.setItem('cloud', JSON.stringify(this.cloud))


      let light1 = {
        name: '修正海平面气压 QNH(hPa)',
        prop: '',
        value: this.QNH
      }

      let light2 = {
        name: '1小时降雨量(mm)',
        prop: '',
        value: '/'
      }

      let light3 = {
        name: '跑道灯光强度(Lux)',
        prop: '',
        value: '/'
      }
      let light4 = {
        name: '跑道视程 RVR(m)',
        prop: '',
        value: '/'
      }
      let light5 = {
        name: '气象光学视程 MOR(m)',
        prop: '',
        value: '/'
      }

      currAllSocket.push(this.newSocketData[0], this.newSocketData[1], this.newSocketData[2],
        this.newSocketData[3], this.newSocketData[4], this.newSocketData[9], this.newSocketData[10], light1, light2, light3, light4, light5)
      this.allNewSocket = currAllSocket
      localStorage.setItem('allNewSocket', JSON.stringify(this.allNewSocket))

    },

    // 处理收到的历史数据
    dealHistory() {
      let currPressureH = []
      let currTimeLineH = []
      let currTmpH = []
      let currHumH = []
      let currDewH = []
      let currSpeedH = []
      let currDirectionH = []
      for (let j = 0; j < this.historyData.length; j++) {
        currPressureH.push(this.historyData[j].pressure)
        currTmpH.push(this.historyData[j].env_tmp)
        let currTimeLine = this.historyData[j].time.substring(0, 2) + ':' + this.historyData[j].time.substring(2, 4)
        currTimeLineH.push(currTimeLine)
        currHumH.push(this.historyData[j].env_hum)
        currDewH.push(this.historyData[j].dew_point)
        currSpeedH.push(this.historyData[j].speed)
        currDirectionH.push(this.historyData[j].wind_direction)
      }
      this.pressureHistory = currPressureH
      this.tmpHistory = currTmpH
      this.timeLine = currTimeLineH
      this.humHistory = currHumH
      this.dewHistory = currDewH
      this.speedHistory = currSpeedH
      this.directionHistory = currDirectionH
      this.showLine = true
      if (this.tmpHistory.length > 0) {
        localStorage.setItem('tmpHistory', JSON.stringify(this.tmpHistory))
      }
      localStorage.setItem('pressureHistory', JSON.stringify(this.pressureHistory))
      localStorage.setItem('timeLine', JSON.stringify(this.timeLine))
      localStorage.setItem('humHistory', JSON.stringify(this.humHistory))
      localStorage.setItem('dewHistory', JSON.stringify(this.dewHistory))
      localStorage.setItem('speedHistory', JSON.stringify(this.speedHistory))
      localStorage.setItem('directionHistory', JSON.stringify(this.directionHistory))


      hideLoading()
    },

    // 处理时间
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString()        // 日
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      return fmt;
    }




  },
  sockets: {
    connect() {
      console.log("链接成功")
    }
  }
};
</script>

<style lang="scss">
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
.upper-part {
  padding-bottom: 0;
  margin-bottom: 20px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  margin-top: 20px;
}
.tag-container {
  display: flex;
  padding: 0 10px;
  margin-right: -242px;
}
.tag-container ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.tag-container .time-ul {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}
.tag-container .time-ul li {
  width: 100%;
  // height: 100px;
  background: #eee;
  color: #336699;

  border: 1px solid #eee;
  list-style: none;
  margin: 0 20px 10px 0;
  padding: 10px;
  border-radius: 10px;
  font-size: 22px;
}

.tag-container .time-ul li p {
  margin: 0;
  padding-bottom: 14px;
}
.time-ul__date {
  font-size: 18px;
}
.time-ul__time {
  font-size: 30px;
}
.tag-container li {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  justify-content: center;
  border: 1px solid #eee;
  list-style: none;
  margin: 0 20px 10px 0;
  padding: 8px;
  border-radius: 10px;
  color: #827af3;
  opacity: 0.8;
  font-size: 22px;
  background: linear-gradient(
    to right,
    rgba(130, 122, 243, 0.2) 0%,
    rgba(180, 122, 243, 0.2) 100%
  );
}
.tag-container h3 {
  font-size: 36px;
  padding-top: 10px;
  margin: 0;
}
.lower-part {
  padding-bottom: 0;
  margin-bottom: 30px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  padding: 20px 10px;
  // margin-top: 10px;
}
.param-area {
  margin-top: 5px;
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
}
.input-new-tag {
  vertical-align: bottom;
}

.sensor-tag {
  font-size: 22px;
  padding: 30px 40px;
  position: relative;
  height: auto;
  margin-left: 10px;
  margin-top: 10px;
}
.sensor_tag .el-icon-close {
  position: absolute !important;
  right: 2%;
  top: 2%;
}
.sensor-select {
  height: auto;
  font-size: 18px;
  padding: 10px 12px;
  line-height: 32px;
}
.flush {
  margin-top: 10px;
  margin-bottom: 40px;
}

.tag1 {
  background: #17a2b8;
  // background: linear-gradient(
  //   to right,
  //   rgba(12, 210, 227, 0.2) 0%,
  //   rgba(62, 210, 227, 0.2) 100%
  // );
}
.tag2 {
  background: #6f42c1;
  // background: linear-gradient(
  //   to right,
  //   rgba(63, 121, 241, 0.2) 0%,
  //   rgba(63, 121, 241, 0.2) 100%
  // );
}
.tag3 {
  background: #e83e8c;
}
.tag4 {
  background: #dc3545;
}
.tag5 {
  background: #fd7e14;
}

.tag6 {
  background: #ffc107;
}
.tag7 {
  background: #007bff;
}
.tag8 {
  background: #28a745;
}
.panel-container {
  margin-right: -32px;
}
.time-tag {
  background: #eee;
  border-radius: 10px;
}

.load-content {
  .el-loading-text {
    font-size: 34px;
    padding-top: 30px;
    color: #336699;
  }
}
.classify-card {
  margin-bottom: 20px;
  // margin-bottom: 84px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.card1 {
  // background: #17a2b8;
  padding: 0;
}
.classify-card .el-card__header {
  padding: 12px 20px;
}
.classify-card .el-card__body {
  padding: 10px 20px !important;
}
.cloud-class .el-card__header {
  background-color: #3dbb58;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.wind-class .el-card__header {
  background-color: #17a2b8;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.speed-class .el-card__header {
  // background-color: #ddd;
  background: #ffc107;
  color: #fff;
  text-align: center;
  font-size: 18px;
}

.report {
  color: #303133;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px 10px 10px;
  margin-top: -10px;
}
.report-title {
  width: 10%;
  font-size: 22px;
  color: #336699;
}
.report-content {
  background: #827af3;
  width: 90%;
  height: 40px;
  opacity: 0.6;
}
</style>
