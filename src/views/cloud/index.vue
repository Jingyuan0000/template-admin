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
  },
  data() {
    return {
      getDataUrl: 'http://127.0.0.1:8443/login'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      var that = this
      this.$.ajax({
        url: that.getDataUrl,
        type: 'get',
        success: function(data) {
          console.log('success: ', data)
        },
        error: function(xhr, errorType, error) {
          console.log('Ajax error: ' + error)
        }

      })
    }
  }

}
</script>

