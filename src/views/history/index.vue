<template>
  <div class="history-container">
    <div class="history-row">
      <el-card>
        <history1 />
      </el-card>

    </div>
    <div class="history-row">
      <el-card>
        <history2 />
      </el-card>
    </div>

  </div>

</template>
<script>
import history1 from "../echarts/history1"
import history2 from "../echarts/history2"
export default {
  components: {
    history1,
    history2

  },
}
</script>
<style scoped>
.history-row {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
