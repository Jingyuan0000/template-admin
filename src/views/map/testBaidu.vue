<template>
  <div>
    <div class="map-box">
      <div class="map-header">
        <button @click="fixedPos">定位</button>
        <div>
          <label>当前纬度</label>
          <input v-model="latitude" />
        </div>
        <div>
          <label>当前经度</label>
          <input v-model="longitude" />
        </div>
        <div>
          <input
            v-model="keyWords"
            placeholder="请输入要搜索的地址"
          />
          <button @click="setPlace">搜索</button>
        </div>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      local: null,
      mk: null,
      latitude: '',
      longitude: '',
      keyWords: ''
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new BMap.Map('map')
      let point = new BMap.Point(116.404, 39.915)
      this.map.centerAndZoom(point, 12)
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      this.map.addControl(new BMap.NavigationControl())
    },
    // 点击定位-定位到当前位置
    fixedPos() {
      const _this = this
      const geolocation = new BMap.Geolocation()
      this.confirmLoading = true
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          _this.handleMarker(_this, r.point)
          let myGeo = new BMap.Geocoder()
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
            _this.confirmLoading = false
            if (result) {
              _this.latitude = result.point.lat
              _this.longitude = result.point.lng
            }
          })
        } else {
          _this.$message.error('failed' + this.getStatus())
        }
      })
    },
    // 搜索地址
    setPlace() {
      this.local = new BMap.LocalSearch(this.map, {
        onSearchComplete: this.searchPlace
      })
      this.local.search(this.keyWords)
    },
    searchPlace() {
      if (this.local.getResults() != undefined) {
        this.map.clearOverlays() //清除地图上所有覆盖物
        if (this.local.getResults().getPoi(0)) {
          let point = this.local.getResults().getPoi(0).point //获取第一个智能搜索的结果
          this.map.centerAndZoom(point, 18)
          this.handleMarker(this, point)
          console.log('经度：' + point.lng + '--' + '纬度' + point.lat)
          this.latitude = point.lat
          this.longitude = point.lng
        } else {
          this.$message.error('未匹配到地点!')
        }
      } else {
        this.$message.error('未找到搜索结果!')
      }
    },
    // 设置标注
    handleMarker(obj, point) {
      obj.mk = new BMap.Marker(point)
      obj.map.addOverlay(obj.mk)
      obj.mk.enableDragging() // 可拖拽
      obj.mk.addEventListener('dragend', function (e) { // 监听标注的拖拽，获取拖拽后的经纬度
        this.latitude = point.lat
        this.longitude = point.lng
      })
      obj.map.panTo(point)
    }
  }
}
</script>
<style>
/* 样式自己看心情写吧 */
</style>
