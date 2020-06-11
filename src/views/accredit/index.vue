<template>
  <div class="accredit">
    <div class="cell_box">
      <div @click="routerGo">
        <van-icon name="arrow-left" />
      </div>
      <span>地图</span>
      <div></div>
    </div>
    <div id="container"></div>
    <!-- POI搜索功能 -->
    <!-- <div id="panel" class="scrollbar1">
        <div id="searchBar">
            <input id="searchInput" placeholder="输入关键字搜素POI" />
        </div>
        <div id="searchResults"></div>
    </div>-->
    <div id="pickerBox">
      <input id="pickerInput" placeholder="输入关键字选取地点" />
      <div id="poiInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
      lnglat: [113.35, 23.12]
    };
  },
  created() {},
  mounted() {
    this.mapContainer();
  },
  methods: {
    routerGo() {
      this.$router.go(-1);
    },
    // 以下是地图测试
    mapContainer() {
      // 初始化地图
      var map = new AMap.Map("container", {
        zoom: 12, //级别
        resizeEnable: true,
        // center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
        // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
      });
      this.map = map;
      // 控件 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.OverView",
          "AMap.MapType",
          "AMap.Geolocation"
        ],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          // map.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // map.addControl(new AMap.OverView({isOpen:true}));

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // map.addControl(new AMap.MapType());

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          map.addControl(new AMap.Geolocation());
        }
      );

      //实时路况图层
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
      });
      map.add(trafficLayer); //添加图层到地图

      // var marker = new AMap.Marker({
      //     position: new AMap.LngLat(113.3245904, 23.1066805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // });
      // // 将创建的点标记添加到已有的地图实例：
      // map.add(marker);
      // // 多个点实例组成的数组
      // var markerList = [marker1, marker2, marker3];
      // map.add(markerList);

      // 点标记 创建一个 Marker 实例：
      var lnglats = [
        {
          lnglat: [113.3245904, 23.1066805],
          title: "高德地图",
          content:
            "高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。"
        },
        {
          lnglat: [113.151713, 23.103572],
          title: "百度地图",
          content:
            "百度是中国领先的数字地图内容、导航和位置服务解决方案提供商。"
        },
        {
          lnglat: [113.25, 23.1],
          title: "腾讯地图",
          content:
            "腾讯是中国领先的数字地图内容、导航和位置服务解决方案提供商。"
        },
        {
          lnglat: [113.35, 23.12],
          title: "青果地图",
          content:
            "青果是中国领先的数字地图内容、导航和位置服务解决方案提供商。"
        }
      ];
      var infowindow = new AMap.AdvancedInfoWindow({
        // panel: 'panel',
        // placeSearch: true,
        // asOrigin: true,
        // asDestination: true,
        // content: content, //传入 dom 对象，或者 html 字符串
        offset: new AMap.Pixel(0, -30) // 偏移量
      });
      // this.$nextTick(()=>{

      // })
      for (var i = 0, marker; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
          position: lnglats[i].lnglat,
          map: map
        });
        var content =
          `<div class="info-title">${lnglats[i].title}</div><div class="info-content">` +
          `<img src="https://webapi.amap.com/images/amap.jpg" class="item">` +
          `${lnglats[i].content}<br/>` +
          `<a target="_blank" href = "https://mobile.amap.com/" class="a_gaode">点击下载高德地图</a></div>`;
        marker.content = content;
        marker.on("click", markerClick);
        // marker.emit('click', {target: marker}); // 默认打开最后一个
      }
      function markerClick(e) {
        // infowindow.close() // 关闭信息窗体
        infowindow.open(map, e.target.getPosition()); // 打开信息窗体
        infowindow.setContent(e.target.content); // 动态添加内容
      }
      map.setFitView();

      // POI搜索功能 pc端可用
      // AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
      //     var poiPicker = new PoiPicker({
      //         input: 'searchInput',
      //         placeSearchOptions: {
      //             map: map,
      //             pageSize: 10
      //         },
      //         searchResultsContainer: 'searchResults'
      //     });
      //     poiPicker.on('poiPicked', function(poiResult) {
      //         poiPicker.hideSearchResults();
      //         var source = poiResult.source,
      //             poi = poiResult.item;
      //         if (source !== 'search') {
      //             //suggest来源的，同样调用搜索
      //             poiPicker.searchByKeyword(poi.name);
      //         } else {
      //             //console.log(poi);
      //         }
      //     })
      //     poiPicker.onCityReady(function() {
      //         poiPicker.searchByKeyword('');
      //     });
      // });

      // 搜索位置
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          //city:'北京',
          input: "pickerInput"
        });

        //初始化poiPicker
        poiPickerReady(poiPicker);
      });

      function poiPickerReady(poiPicker) {
        window.poiPicker = poiPicker;

        var marker = new AMap.Marker();

        var infoWindow2 = new AMap.AdvancedInfoWindow({
          offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        poiPicker.on("poiPicked", function(poiResult) {
          var source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };

          marker.setMap(map);
          infoWindow2.setMap(map);

          marker.setPosition(poi.location);
          infoWindow2.setPosition(poi.location);
          var Location = info.location.split(",")
          var infoContent = `<div class="info-title">${info.name}</div>
                             <p class="info_add">地址：${info.address}</p>
                             <p class="info_p"><a target="_blank" href = "http://uri.amap.com/marker?position=${Location[0]},${Location[1]}&name=${info.address}&coordinate=gaode&callnative=1" class="a_gaode" style="margin-left: 4px;">点击使用高德地图导航</a></p>
                             <p class="info_p"><a target="_blank" href = "http://apis.map.qq.com/uri/v1/marker?marker=coord:${Location[1]},${Location[0]};addr:${info.address}" class="a_gaode" style="margin-left: 4px;">点击使用腾讯地图导航</a></p>
                             <p class="info_p"><a target="_blank" href = "http://api.map.baidu.com/marker?location=${Location[1]},${Location[0]}&title=${info.name}&content=${info.address}&output=html" class="a_gaode" style="margin-left: 4px;">点击使用百度地图导航</a></p>`
          infoWindow2.setContent( infoContent );
          infoWindow2.open(map, marker.getPosition());
        //    map.setCenter(marker.getPosition());
           marker.infoContent = infoContent; // 给事件源对象添加内容
           marker.on("click", markerClick2); // 注册点击事件
        });
        function markerClick2(e) {
            infoWindow2.open(map, e.target.getPosition()); // 打开信息窗体
            infoWindow2.setContent( e.target.infoContent ); // 动态添加内容
        }
        poiPicker.onCityReady(function() {
          poiPicker.suggest("");
        });
      }
    },

    // 以上是地图测试
    /**获取地图定位*/
    getLocationPop() {
      let _that = this;
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", result => {
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        _that.province = result.addressComponent.province;
        _that.city = result.addressComponent.city;
        _that.district = result.addressComponent.district;
      });
    },
    concom() {
      var map = new BMapGL.Map("container"); // 创建地图实例
      var point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    },
    com() {
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // alert('成功')
          // data是具体的定位信息
          console.log("定位成功", data);
        }

        function onError(data) {
          // alert('失败')
          // 定位出错
          console.log("定位出错", data);
        }
      });
    }
  }
};
</script>

<style>
#container {
  width: 375px;
  height: calc(100vh - 40px);
}
.accredit {
  position: relative;
}
.info_name{
    padding: 7px 4px;
    border-bottom: 1px solid #666;
}
.info_add{
    padding: 10px 4px;
    color: #666;
}
.info_p{
    padding: 5px 4px;
}
#pickerBox {
    position: absolute;
    z-index: 9999;
    top: 45px;
    right: 0px;
    width: 200px;
}

#pickerInput {
    width: 100%;
    padding: 5px 5px;
}

#poiInfo {
    background: #fff;
}

.amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
}

.amap_lib_placeSearch .poi-more {
    display: none!important;
}
/* POI搜索功能样式 */
/* #panel {
    position: absolute;
    top: 40px;
    right: 0;
    height: calc(100vh - 40px);
    overflow: auto;
    width: 180px;
    z-index: 999;
    border-left: 1px solid #eaeaea;
    background: #fff;
}

#searchBar {
    height: 30px;
    background: #ccc;
}

#searchInput {
    width: 100%;
    height: 30px;
    line-height: 30%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0 5px;
}

#searchResults {
    overflow: auto;
    height: calc(100% - 30px);
}

.amap_lib_placeSearch,
.amap-ui-poi-picker-sugg-container {
    border: none!important;
}

.amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
}

.poi-more {
    display: none!important;
} */

.a_gaode {
  font-size: 12px;
  color: mediumblue;
}
.custom-input-card {
  width: 11px;
}

.custom-input-card .btn {
  margin-right: 1px;
}

.custom-input-card .btn:last-child {
  margin-right: 0;
}

.info-title {
  color: white;
  font-size: 14px;
  background-color: #3f3f3f;
  line-height: 26px;
  padding: 0px 0 0 6px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.info-content {
  font: 12px Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", Arial;
  padding: 4px;
  color: #666666;
  line-height: 23px;
}

.info-content .item {
  width: 30px;
  height: 30px;
  float: left;
  margin: 3px;
}

.amap-info-combo .keyword-input {
  height: 25px;
  border-radius: 2px 0 0 2px;
}
</style>