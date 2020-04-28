<template>
  <div class="dashboard-container">
    <div class="dashboard-text">观测业务平台</div>
    <el-card>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirecStart /></el-col>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirecAvg /></el-col>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirectEnd /></el-col>
      </el-row>
    </el-card>

    <!-- <el-row :gutter="20">
      <el-col :span="8"><div class="" />
        <el-table
          :data="tableData1"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="time"
            label="十分钟"
          />
          <el-table-column
            prop="max"
            label="最大"
          />
          <el-table-column
            prop="avg"
            label="平均"
          />
          <el-table-column
            prop="min"
            label="最小"
          />
        </el-table>
      </el-col>
      <el-col :span="8"><div class="" />
        <el-table
          :data="tableData2"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="time"
            label="十分钟"
          />
          <el-table-column
            prop="max"
            label="最大"
          />
          <el-table-column
            prop="avg"
            label="平均"
          />
          <el-table-column
            prop="min"
            label="平均"
          />
        </el-table>
      </el-col>
      <el-col :span="8"><div class="" />
        <el-table
          :data="tableData3"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="time"
            label="十分钟"
          />
          <el-table-column
            prop="max"
            label="最大"
          />
          <el-table-column
            prop="avg"
            label="平均"
          />
          <el-table-column
            prop="min"
            label="平均"
          />
        </el-table>
      </el-col>
      <el-col :span="8"><div class="" /></el-col>
    </el-row> -->
    <el-row class="param-area">
      <el-col :span="8">
        <el-table class="common-table" name="tb1" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData1">
          <el-table-column label="参数" prop="param" />
          <el-table-column label="2分钟内">
            <el-table-column label="最大值" prop="max2min" />
            <el-table-column label="最小值" prop="min2min" />
            <el-table-column label="平均值" prop="avg2min" />
          </el-table-column>
          <el-table-column label="10分钟内">
            <el-table-column label="最大值" prop="max10min" />
            <el-table-column label="最小值" prop="min10min" />
            <el-table-column label="平均值" prop="avg10min" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table name="tb2" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData1">
          <el-table-column label="参数" prop="param" />
          <el-table-column label="2分钟内">
            <el-table-column label="最大值" prop="max2min" />
            <el-table-column label="最小值" prop="min2min" />
            <el-table-column label="平均值" prop="avg2min" />
          </el-table-column>
          <el-table-column label="10分钟内">
            <el-table-column label="最大值" prop="max10min" />
            <el-table-column label="最小值" prop="min10min" />
            <el-table-column label="平均值" prop="avg10min" />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table name="tb2" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData1">
          <el-table-column label="参数" prop="param" />
          <el-table-column label="2分钟内">
            <el-table-column label="最大值" prop="max2min" />
            <el-table-column label="最小值" prop="min2min" />
            <el-table-column label="平均值" prop="avg2min" />
          </el-table-column>
          <el-table-column label="10分钟内">
            <el-table-column label="最大值" prop="max10min" />
            <el-table-column label="最小值" prop="min10min" />
            <el-table-column label="平均值" prop="avg10min" />
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>

    <!-- <el-row :gutter="20">
      <el-col :span="6" class="wind-info">十分钟最强灯光RVR</el-col>
      <el-col :span="2" class="wind-info">P2000  m</el-col>
      <el-col :span="6" class="wind-info">灯光级别 </el-col>
      <el-col :span="2" class="wind-info"> 30%</el-col>
      <el-col :span="6" class="wind-info">十分钟最强灯光RVR</el-col>
      <el-col :span="2" class="wind-info">P2000  m</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="wind-info">十分钟平均RVR</el-col>
      <el-col :span="2" class="wind-info">P2000  m</el-col>
      <el-col :span="6" class="wind-info">天气现象 </el-col>
      <el-col :span="2" class="wind-info"> BR</el-col>
      <el-col :span="6" class="wind-info">十分钟平均RVR</el-col>
      <el-col :span="2" class="wind-info">1900  m</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="wind-info">十分钟光学能见度</el-col>
      <el-col :span="2" class="wind-info">1600  m</el-col>
      <el-col :span="6" class="wind-info">背景光亮度 </el-col>
      <el-col :span="2" class="wind-info"> 16 cd/m²</el-col>
      <el-col :span="6" class="wind-info">十分钟光学能见度</el-col>
      <el-col :span="2" class="wind-info">1400  m</el-col>
    </el-row> -->
    <!-- <el-row>
        <Echarts />
      </el-row> -->
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
      tableData1: [{
        param: '风向',
        max2min: '340 °',
        min2min: '330 °',
        avg2min: '340 °',
        max10min: '20 °',
        avg10min: '320 °',
        min10min: '280 °'
      }]

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    CellStyle({ row, rowIndex }) {
      return 'text-align:center;'
    },
    HeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#eee;color:#999;font-wight:30;font-size:16px;text-align:center;border-color:#ddd'
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
  padding-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
  color: #999;
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
  // .el-col {
  //   border-radius: 4px;
  // }
  // .bg-purple-light {
  //   background: #e5e9f2;
  // }
  // .grid-content {
  //   border-radius: 4px;
  //   min-height: 36px;
  // }
  // .row-bg {
  //   padding: 10px 0;
  //   background-color: #f9fafc;
  // }
  // .wind-info {
  //   border: 1px solid #eee;
  //   padding: 6px 20px;
  // }
</style>
