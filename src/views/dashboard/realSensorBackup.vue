<template>
  <div class="dashboard-container dashboard-container__home">
    <div class="upper-part">
      <div class="tag-container">
        <div class="time-tag">
          <div class="date-tag">
            {{date}}
          </div>
          {{timestamp}}
        </div>
        <ul>
          <li
            v-for="(item, index) in taglist"
            :class="'tag' + (index + 1)"
          >{{item.name + ': ' + item.value}}
          </li>
        </ul>
        <!-- <el-tag
          :key="tag.index"
          v-for="tag in dynamicTags"
          type=""
          effect="dark"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          class="sensor-tag"
        >
          {{ tag.name + ":     " + tag.value }}
        </el-tag> -->
      </div>
      <div class="panel-container">

        <windDirecStart
          :direction1="windDirection"
          v-if="showPanel"
        />
      </div>

    </div>
    <div class="lower-part">
      <el-card>
        <mailTable
          :tableData="newSocketData"
          :tableStyle="{ width: '600px' }"
        ></mailTable>
      </el-card>
      <el-card>
        <mailTable
          :tableData="newSocketData"
          :tableStyle="{ width: '600px' }"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import windDirecStart from "../echarts/windDirecStart"
import echarts from "../echarts/echarts"
import sensorTable from "../echarts/sensorTable"
import SocketIO from "socket.io-client"
import { sensorName } from "../../utils/sensor"
import { showLoading, hideLoading } from '../../utils/loading'

export default {
  name: "Dashboard",
  components: {
    windDirecStart,
    SocketIO,
    Echarts: echarts,
    mailTable: sensorTable
  },
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
      getDataUrl: "http://127.0.0.1:8500/login",
      sensors: [],
      windDirection: '',
      loading: false,
      showPanel: false,
      showLine: false,
      dynamicTags: JSON.parse(localStorage.dynamicTags) || [],
      selectVisible: false,
      selectValue: "",
      sensorName: sensorName,
      taglist: [],
      pressureHistory: [],
      tmpHistory: [],
      timestamp: '',
      socketData: [],
      newSocketData: [],
      historyData: [],
      timeLine: [],
      date: ''
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
    });




  },
  destroyed() {
    this.$socket.close()
  },

  methods: {
    // openFullScreen() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    //   setTimeout(() => {
    //     loading.close();
    //   }, 5000);
    // },



    // 初始化socket
    initSocket() {
      // showLoading()
      this.sockets.listener.subscribe("relogin", msg => {
        // this.socketData = JSON.parse(msg)
        console.log("msg" + msg)
        this.socketData = msg
        console.log("客户端已收到最新一条", this.socketData)
        this.dealOption()
      });
      this.sockets.listener.subscribe("lastTen", msg => {
        // this.socketData = JSON.parse(msg)
        console.log("msg" + msg)
        this.historyData = msg
        console.log("已收到最新十条", this.historyData)

        this.dealHistory()
        let currdate = new Date()
        this.date = this.dateFormat('YYYY-mm-dd', currdate)

      });
    },

    // 处理标签选项
    dealOption() {
      this.newSocketData = []
      this.taglist = []
      var socketObject = JSON.parse(this.socketData)
      this.windDirection = socketObject.wind_direction
      this.timestamp = socketObject.time.substring(0, 4)
      let fullstamp = this.timestamp.substring(0, 2) + ':' + this.timestamp.substring(2)
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

      this.taglist = this.newSocketData.slice(0, 8)
    },

    // 处理收到的历史数据
    dealHistory() {
      this.pressureHistory = []
      this.timeLine = []
      this.tmpHistory = []
      for (let j = 0; j < this.historyData.length; j++) {
        this.pressureHistory.push(this.historyData[j].pressure)
        this.tmpHistory.push(this.historyData[j].env_tmp)
        let currTimeLine = this.historyData[j].time.substring(0, 2) + ':' + this.historyData[j].time.substring(2, 4)
        this.timeLine.push(currTimeLine)
      }
      this.showLine = true
      console.log('历史数据', this.pressureHistory, this.tmpHistory)
      // hideLoading()
    },

    // 处理时间
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString()        // 日
        // "H+": date.getHours().toString(),           // 时
        // "M+": date.getMinutes().toString(),         // 分
        // "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      console.log('fmt', fmt)
      return fmt;
    },





    //点选添加气象要素
    handleSelectConfirm(v) {
      if (this.dynamicTags.length >= 8) {
        this.$message({
          message: '只能选择八个气象要素',
          type: 'warning'
        })
      }
      let currTag = {}
      console.log("item", v)
      let currArr = v.split(":")
      console.log("currArr", currArr)
      currTag.name = currArr[0];
      currTag.value = parseInt(currArr[1])
      console.log("currTag", currTag)
      this.dynamicTags.push(currTag)
      if (this.dynamicTags.length > 1) {
        this.dynamicTags = this.unique(this.dynamicTags)
      }
      // localStorage.setItem("dynamicTags", JSON.stringify(this.dynamicTags))
      console.log("localStorage", localStorage.dynamicTags)
    },

    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      localStorage.setItem("dynamicTags", JSON.stringify(this.dynamicTags))
    },

    // 显示下拉列表
    showSelect() {
      this.selectVisible = true
      this.$nextTick(_ => {
        console.log("lll", this.$refs.saveSelectInput.value)
        // this.$refs.saveSelectInput.value.focus()
      });
    },


    // 气象标签去重
    unique(arr) {
      var obj = {}
      arr = arr.reduce(function (item, next) {
        obj[next.name] ? "" : (obj[next.name] = true && item.push(next))
        return item
      }, [])
      console.log("unique", arr)
      return arr
    },



  },
  sockets: {
    connect() {
      console.log("链接成功")
    }
  }
};
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
.upper-part {
  padding-bottom: 0;
  margin-bottom: 30px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 20px 10px;
  margin-top: 20px;
}
.tag-container {
  display: flex;
  padding: 20px;
}
.tag-container ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}
.tag-container li {
  width: 280px;
  height: 120px;
  border: 1px solid #eee;
  list-style: none;
  margin: 0 20px 20px 0;
  text-align: center;
  line-height: 120px;
  border-radius: 10px;
  // color: #fff;
  color: #827af3;
  opacity: 0.8;
  font-size: 22px;
  background: linear-gradient(
    to right,
    rgba(130, 122, 243, 0.2) 0%,
    rgba(180, 122, 243, 0.2) 100%
  );
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
  margin-top: 20px;
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
  // margin-bottom: 80px;
}
.input-new-tag {
  // margin-left: 10px;
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  // margin-left: -50px;
}
.time-tag {
  font-size: 36px;
  background: #eee;
  padding: 18px 20px;
  border-radius: 10px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.date-tag {
  font-size: 20px;
  padding-right: 30px;
}
.load-content {
  .el-loading-text {
    font-size: 34px;
    color: #fff;
  }
}
</style>
