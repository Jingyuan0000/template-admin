<template>
  <div
    id="container"
    style="width:1000px;height:800px;"
  ></div>

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
      var station = new qq.maps.LatLng(102.761722, 25.080056);
      console.log('myLatlng', myLatlng)
      //定义工厂模式函数
      var myOptions = {
        zoom: 13,               //设置地图缩放级别
        center: station,    //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
      }
      // //获取dom元素添加地图信息
      var map = new qq.maps.Map(document.getElementById("container"), myOptions);
      //第三部分
      //给定位的位置添加图片标注
      var marker = new qq.maps.Marker({
        position: station,
        map: map
      });
      // var marker = new qq.maps.Marker({
      //   position: myLatlng,
      //   map: map
      // });
      //给定位的位置添加文本标注
      var marker = new qq.maps.Label({
        position: station,
        map: map,
        content: '这是我当前的位置，偏差有点大，哈哈'
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
 <style>
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
