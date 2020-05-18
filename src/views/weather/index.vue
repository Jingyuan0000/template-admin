<template>
  <div class="extra-weather">
    <el-form ref="weatherForm" label-width="100px">
      <el-form-item label="降雨量" prop="rain">
        <el-input v-model="form.rain" />
      </el-form-item>
      <el-form-item label="降雪量" prop="snow">
        <el-input v-model="form.snow" />
      </el-form-item>
      <el-form-item label="特殊天气">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="冰雹" />
          <el-checkbox label="风沙" />
          <el-checkbox label="雷电" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="云低高度" prop="cloud">
        <el-input v-model="form.cloud" />
      </el-form-item>
      <el-form-item label="能见度" prop="visibility">
        <el-input v-model="form.visibility" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        rain: '',
        snow: '',
        type: [],
        cloud: '',
        visibility: ''
      }
    }
  }
}
</script>
<style scoped>
.extra-weather {
  padding: 40px 30px;
  width: 600px;

}
</style>
