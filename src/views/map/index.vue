<template>
  <div class="map-page">
    <div
      id="txContainer"
      style="width:1200px;height:850px;"
    ></div>
    <div class="map-table">
      <table class="stationTable">
        <tr>
          <td class="row">站点: </td>
          <td class="td-grid">昆明气象站</td>

        </tr>
        <tr>
          <td class="row">地址: </td>
          <td class="td-grid">昆明市盘龙区世博路8号</td>

        </tr>
        <tr>
          <td class="row">观测要素：</td>
          <td class="td-grid">风速、风向、温度、湿度、场面气压、修正海平面气压、降水、能见度、云高</td>
        </tr>
        <tr>
          <td class="row">数据运营维护：</td>
          <td class="td-grid">北京航空航天大学云南创新研究院综合交通大数据应用研究中心</td>
        </tr>
        <tr>
          <td class="row">AWOS电台频率：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">经度：</td>
          <td class="td-grid">102.755235</td>
        </tr>
        <tr>
          <td class="row">纬度：</td>
          <td class="td-grid">25.074138</td>
        </tr>
        <tr>
          <td class="row">联系电话：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">官方网址：</td>
          <td class="td-grid">http://ynii.buaa.edu.cn/info/1005/1556.htm</td>
        </tr>
      </table>

      <table class="stationTable">
        <tr>
          <td class="row">站点: </td>
          <td class="td-grid">测试气象站</td>

        </tr>
        <tr>
          <td class="row">地址: </td>
          <td class="td-grid"></td>

        </tr>
        <tr>
          <td class="row">观测要素：</td>
          <td class="td-grid">风速、风向、温度、湿度、场面气压、修正海平面气压、降水、能见度、云高</td>
        </tr>
        <tr>
          <td class="row">数据运营维护：</td>
          <td class="td-grid">北京航空航天大学云南创新研究院综合交通大数据应用研究中心</td>
        </tr>
        <tr>
          <td class="row">AWOS电台频率：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">经度：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">纬度：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">联系电话：</td>
          <td class="td-grid"></td>
        </tr>
        <tr>
          <td class="row">官方网址：</td>
          <td class="td-grid"></td>
        </tr>
      </table>

    </div>

  </div>

</template>

<script>

var positionNum = 0;
var options = { timeout: 8000 };
function showPosition(position) {
  positionNum++;
  document.getElementById("demo").innerHTML += "序号：" + positionNum;
  document.getElementById("demo").appendChild(document.createElement('pre')).innerHTML = JSON.stringify(position, null, 4);
  document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
};

export default {
  name: 'news',
  data() {
    return {
      longitude: 0,//经度
      latitude: 0,//纬度
      city: '',
      geolocationLLL: '',

    }
  },
  methods: {
    //第一部分
    //定位获得当前位置信息
    getMyLocation() {
      var geolocation = new qq.maps.Geolocation("2AHBZ-LIIKF-6WMJZ-N53VW-TZ5LJ-DYFHP", "sensor-web");
      // geolocation.getIpLocation(this.showPosition, this.showErr);
      geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
    },
    showPosition(position) {
      console.log(position);
      this.latitude = position.lat;
      this.longitude = position.lng;
      console.log('latlong', this.latitude, typeof (this.latitude))
      this.city = position.city;
      this.setMap();
    },
    showErr() {
      console.log("定位失败");
      this.getMyLocation();//定位失败再请求定位，测试使用
    },
    //第二部分
    //位置信息在地图上展示
    setMap() {
      //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      //设置地图中心点
      var myLatlng = new qq.maps.LatLng(this.latitude, this.longitude);
      var station = new qq.maps.LatLng(25.074138, 102.755235);
      console.log('myLatlng', myLatlng)
      console.log('station', station)
      //定义工厂模式函数
      var myOptions = {
        zoom: 13,               //设置地图缩放级别
        center: station,    //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.SATELLITE  //设置地图样式详情参见MapType
      }
      // //获取dom元素添加地图信息
      var map = new qq.maps.Map(document.getElementById("txContainer"), myOptions);
      //第三部分
      //给定位的位置添加图片标注
      // var marker = new qq.maps.Marker({
      //   position: station,
      //   map: map
      // });
      var markerStation = new qq.maps.Marker({
        position: station,
        map: map
      });
      var markerStation = new qq.maps.Label({
        position: station,
        map: map,
        content: '昆明站点'
      });
      var markerCurr = new qq.maps.Marker({
        position: myLatlng,
        map: map
      });
      //给定位的位置添加文本标注
      var markerCurr = new qq.maps.Label({
        position: myLatlng,
        map: map,
        content: '当前的位置'
      });

    },

    // 前端定位
    // showErr() {
    //   positionNum++
    //   document.getElementById("demo").innerHTML += "序号：" + positionNum
    //   document.getElementById("demo").appendChild(document.createElement('p')).innerHTML = "定位失败！"
    //   document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight
    // },

    showWatchPosition() {
      // document.getElementById("demo").innerHTML += "开始监听位置！<br /><br />"
      this.geolocationLLL.watchPosition(showPosition)
      document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight
    },

    showClearWatch() {
      this.geolocationLLL.clearWatch()
      // document.getElementById("demo").innerHTML += "停止监听位置！<br /><br />"
      document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight
    }
  },
  mounted() {
    this.getMyLocation();

  }
}
</script>
 <style scoped>
.map-page {
  display: flex;
  justify-content: space-between;
  padding-right: 66px;
}

.stationTable {
  border: 1px solid #ddd;
  background: #fff;
  border-collapse: collapse;
  width: 500px;
  margin-top: 20px;
}
.stationTable tr {
  border: 1px solid #ddd;
}
　　 .stationTable tr,
.stationTable tr td {
  padding: 10px;
  color: #336699;
  text-align: left;
}
　　.stationTable {
  font-size: 12px;
  color: #71787e;
}
　　.stationTable tr td {
  width: 130px;
  /* height: 35px; */
  /* line-height: 35px; */
  box-sizing: border-box;
  padding: 0 10px;
}
　　.stationTable tr td.row {
  color: #393c3e;
  border-right: 1px solid #999;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}
#pos-area {
  background-color: #009ddc;
  margin-bottom: 10px;
  width: 100%;
  overflow: scroll;
  text-align: left;
  color: white;
}
#demo {
  padding: 8px;
  font-size: small;
}
#btn-area {
  height: 100px;
}
button {
  margin-bottom: 10px;
  padding: 12px 8px;
  width: 42%;
  border-radius: 8px;
  background-color: #009ddc;
  color: white;
}
</style>
