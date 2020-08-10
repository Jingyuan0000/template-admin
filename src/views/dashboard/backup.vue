<template>
  <div class="dashboard-container dashboard-container__home">
    <div class="upper-part">
      <div class="tag-container">
        <ul>
          <li v-for="item in 8">添加要素</li>
        </ul>
        <el-tag
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
        </el-tag>
        <!-- <el-button
            v-else
            class="button-new-tag sensor-tag"
            size="small"
            @click="showSelect"
          >+ 气象要素</el-button> -->
        <!-- <p>{{this.socketData}}</p> -->
        <!-- <el-select
          class="sensor-select"
          v-model="selectValue"
          ref="saveSelectInput"
          @change="handleSelectConfirm(selectValue)"
          placeholder="请选择气象要素"
        >
          <el-option
            v-for="item in newSocketData"
            :key="item.index"
            :label="item.name"
            :value="item.name + ':' + item.value"
          >
          </el-option>
        </el-select> -->
      </div>
      <windDirecStart :direction1="windDirection" />
    </div>
    <div class="lower-part">
      <mailTable
        :tableData="newSocketData"
        :tableStyle="{ width: '600px' }"
      ></mailTable>

      <el-row class="param-area">
        <el-col :span="12">
          <Echarts />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import windDirecStart from "../echarts/windDirecStart";
import echarts from "../echarts/echarts";
import sensorTable from "../echarts/sensorTable";
import SocketIO from "socket.io-client";
import { sensorName } from "../../utils/sensor";

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
      windDirection: "70",
      // tableData: [
      //   { key: '单号', value: '1001' },
      //   { key: '商品名称', value: '篮球' },
      //   { key: '价格', value: '120.00' },
      //   { key: '订单日期', value: '2017-03-01' },
      //   { key: '付款方式', value: '在线支付' },
      //   { key: '收货地址', value: '北京市海淀区西北旺镇' },
      // ],
      loading: false,
      flag: true,
      dynamicTags: JSON.parse(localStorage.dynamicTags) || [],
      selectVisible: false,
      selectValue: "",
      sensorName: sensorName,
      sensorValue: [
        { name: "1", value: "30" },
        { name: "2", value: "40" },
        { name: "3", value: "50" }
      ],
      // socketData: [],
      socketData: {
        id: 680,
        radiation1_total: 0,
        radiation2_total: 0,
        land_tmp1: 0,
        land_tmp2: 0,
        land_tmp3: 0,
        land_tmp4: 0,
        land_tmp5: 0,
        env_tmp: 25,
        env_hum: 63.3,
        dew_point: 17.54,
        pressure: 802.6,
        altitude: 1927,
        speed: 0,
        avg_speed2: 0,
        avg_speed10: 0,
        wind_direction: 0,
        radiation1: 0,
        radiation2: 0,
        land_hum: 0,
        battery_voltage: 13.2,
        rain_total: 0,
        visibility: 0,
        avg_visibility10: 0,
        sunshine_total: 0,
        co2: 0,
        compass: 0,
        pm2_5: 0,
        pm10: 0,
        noise: 0,
        illumination: 0,
        dtu: "13722000038",
        device_no: "0001",
        function_code: "030C",
        date: "2020-08-05T16:00:00.000Z",
        time: "102000"
      },
      newSocketData: []
    };
  },
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },

  watch: {
    // newSocketData() {
    // }
  },
  created() {
    // this.initSocket()
    this.styleObject = this.tableStyle;
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
  computed: {
    rowCount: function () {
      return Math.ceil(this.tableData.length / 2);
    }
  },
  mounted() {
    this.$nextTick(function () {
      var _this = this;
    });
    // this.getData()
    this.dealOption();
  },
  destroyed() {
    this.$socket.close();
  },

  methods: {
    CellStyle({ row, rowIndex }) {
      return "text-align:center;";
    },
    HeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:#F5F7FA;color:#999;font-wight:30;font-size:14px;text-align:center;border-color:#ddd";
    },

    // 获取数据
    getData() {
      this.loading = true;
      var that = this;
      this.$.ajax({
        url: that.getDataUrl,
        type: "get",
        success: function (data) {
          // console.log('success: ', data.data[0])
          that.sensors = data.data[0];
          that.env_tmp = that.sensors["env_tmp"];
          that.windDirection = that.sensors["wind_direction"];
          that.flag = true;
          that.tableData.push(that.sensors);
          that.loading = false;
        },
        error: function (xhr, errorType, error) {
          console.log("Ajax error: " + error);
          that.loading = false;
        }
      }).then(function (data) { });
    },

    // 点击获取新数据
    clickButton() {
      this.tableData = [];
      this.getData();
    },

    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      localStorage.setItem("dynamicTags", JSON.stringify(this.dynamicTags));
    },
    showSelect() {
      this.selectVisible = true;
      this.$nextTick(_ => {
        console.log("lll", this.$refs.saveSelectInput.value);
        // this.$refs.saveSelectInput.value.focus()
      });
    },
    // 处理下拉选项
    dealOption() {
      var socketKeys = Object.keys(this.socketData);
      console.log(socketKeys);

      for (let i = 0; i < this.sensorName.length; i++) {
        console.log(socketKeys.indexOf(this.sensorName[i].prop));

        if (socketKeys.indexOf(this.sensorName[i].prop) !== -1) {
          var a = {
            name: "",
            prop: "",
            value: ""
          };
          a.name = this.sensorName[i].name;
          a.prop = this.sensorName[i].prop;
          let v = a.prop;
          a.value = this.socketData[v];
          this.newSocketData.push(a);
        }
      }
      console.log("newSocketData: ", this.newSocketData);
    },

    //点选添加气象要素
    handleSelectConfirm(v) {
      if (this.dynamicTags.length >= 8) {
        this.$message({
          message: '只能选择八个气象要素',
          type: 'warning'
        })

      }
      let currTag = {};
      console.log("item", v);
      let currArr = v.split(":");
      console.log("currArr", currArr);
      currTag.name = currArr[0];
      currTag.value = parseInt(currArr[1]);
      console.log("currTag", currTag);
      this.dynamicTags.push(currTag);
      if (this.dynamicTags.length > 1) {
        this.dynamicTags = this.unique(this.dynamicTags);
      }
      localStorage.setItem("dynamicTags", JSON.stringify(this.dynamicTags));
      console.log("localStorage", localStorage.dynamicTags);
    },

    // 初始化socket
    initSocket() {
      this.sockets.listener.subscribe("relogin", msg => {
        // this.socketData = JSON.parse(msg);
        console.log("msg" + msg);
        this.socketData = msg;
        console.log("客户端已收到", this.socketData);
      });
    },
    unique(arr) {
      var obj = {};
      arr = arr.reduce(function (item, next) {
        obj[next.name] ? "" : (obj[next.name] = true && item.push(next));
        return item;
      }, []);
      console.log("unique", arr);
      return arr;
    }
  },
  sockets: {
    connect() {
      console.log("链接成功");
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
  justify-content: space-between;
  padding: 20px 10px;
  margin-top: 20px;
}
.tag-container {
  // max-width: 1000px;
}
.tag-container ul {
  display: flex;
  flex-wrap: wrap;
}
.tag-container li {
  width: 280px;
  height: 120px;
  border: 1px solid #eee;
  list-style: none;
  margin: 0 20px 20px 0;
  text-align: center;
  line-height: 120px;
  border-radius: 4px;
}
.lower-part {
  padding-bottom: 0;
  margin-bottom: 30px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
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
</style>
