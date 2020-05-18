<template>
  <div class="dashboard-container dashboard-container__home">
    <!-- <div class="dashboard-text">观测业务平台</div> -->
    <el-card class="gauge-area">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirecStart /></el-col>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirecAvg /></el-col>
        <el-col :span="8"><div class="grid-content bg-purple" /><windDirectEnd /></el-col>
      </el-row>
    </el-card>
    <el-row class="param-area">
      <el-col :span="8">
        <el-table class="common-table" name="tb1" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData1">
          <el-table-column label="参数" prop="param" width="60" />
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
        <el-table name="tb2" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData2" class="tb-avg">
          <el-table-column label="参数" prop="param" width="60" />
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
        <el-table :data="tableData3" class="tb-extra">
          <el-table-column label="天气现象" prop="weather" />
          <el-table-column label="灯光级别" prop="light" />
          <el-table-column label="背景光亮度" prop="bg" />
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table name="tb3" :cell-style="CellStyle" :header-cell-style="HeaderColor" :data="tableData1">
          <el-table-column label="参数" prop="param" width="60" />
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
    <!-- <el-row class="param-area">
      <el-col :span="8">

      </el-col>
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
          max2min: '1 mps',
          min2min: '1 mps',
          avg2min: '4 mps',
          max10min: '2 mps',
          avg10min: '1 mps',
          min10min: '3 mps'
        },
        {
          param: '光学能见度',
          max2min: '',
          min2min: '',
          avg2min: '1600',
          max10min: '',
          avg10min: '1400',
          min10min: ''
        },
        {
          param: '场面气压',
          max2min: '',
          min2min: '',
          avg2min: '1019.1',
          max10min: '',
          avg10min: '1019',
          min10min: ''
        },
        {
          param: '修正海压',
          max2min: '',
          min2min: '',
          avg2min: '1019.1',
          max10min: '',
          avg10min: '1019',
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
          param: '温度/露点',
          max2min: '',
          min2min: '',
          avg2min: '-16.1/-16.9',
          max10min: '',
          avg10min: '-16.1/-16.9',
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
          max2min: '1 mps',
          min2min: '1 mps',
          avg2min: '4 mps',
          max10min: '2 mps',
          avg10min: '1 mps',
          min10min: '3 mps'
        },
        {
          param: '光学能见度',
          max2min: '',
          min2min: '',
          avg2min: '1600',
          max10min: '',
          avg10min: '1400',
          min10min: ''
        },
        {
          param: '跑道起点温度',
          max2min: '',
          min2min: '',
          avg2min: '1600',
          max10min: '',
          avg10min: '1400',
          min10min: ''
        },
        {
          param: '跑道终点温度',
          max2min: '',
          min2min: '',
          avg2min: '1600',
          max10min: '',
          avg10min: '1400',
          min10min: ''
        }

      ],
      tableData3: [
        {
          weather: '雷电',
          light: '3',
          bg: '16 cd/m²'
        }
      ]

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
      return 'background-color:#F5F7FA;color:#999;font-wight:30;font-size:14px;text-align:center;border-color:#ddd'
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
  .tb-avg, .tb-avg:after {
    border:2px solid #336699;
    border-right: 1px
  }
  .tb-extra {
    border:2px dashed #3D9970;
  }

</style>
