<template>
  <div class="app-container">
    <el-table>
      <el-row><Echarts /></el-row>
    </el-table>
  </div>
</template>
<script>
import echarts from '../echarts/echarts'
export default {
  components: {
    Echarts: echarts
  }
}</script>

