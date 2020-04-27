<template>
  <div class="dashboard-container">
    <div class="dashboard-text">观测业务平台</div>
    <el-row :gutter="20">
      <!-- <el-col :span="8"><div class="grid-content bg-purple" /></el-col> -->
      <el-col :span="8"><div class="grid-content bg-purple" /><windDirecStart /></el-col>
      <el-col :span="8"><div class="grid-content bg-purple" /><windDirecAvg /></el-col>
      <el-col :span="8"><div class="grid-content bg-purple" /><windDirectEnd /></el-col>
    </el-row>

    <el-row :gutter="20">
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
    </el-row>
    <el-row :gutter="20">
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
    </el-row>
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
        time: '风向',
        max: '340 °',
        avg: '340 °',
        min: '330 °'
      }, {
        time: '风速',
        max: '1 mps',
        avg: '1 mps',
        min: '1 mps°'
      }],
      tableData2: [{
        time: '风向',
        max: '10 °',
        avg: '330 °',
        min: '270 °'
      }, {
        time: '风速',
        max: '4 mps',
        avg: '2 mps',
        min: '1 mps°'
      }],
      tableData3: [{
        time: '风向',
        max: '20 °',
        avg: '320 °',
        min: '280 °'
      }, {
        time: '风速',
        max: '3 mps',
        avg: '2 mps',
        min: '0 mps°'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .wind-info {
    border: 1px solid #eee;
    padding: 6px 20px;
  }
</style>
