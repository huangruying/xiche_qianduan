<template>
  <div class="accredit">
     <div id="container">授权</div> 
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    created(){
       
    },
    methods:{
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
        concom(){
            var map = new BMapGL.Map("container");          // 创建地图实例 
            var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标 
            map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        },
        com(){
            AMap.plugin('AMap.Geolocation', function() {
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
                buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)

            function onComplete (data) {
                // alert('成功')
                // data是具体的定位信息
                console.log('定位成功' , data);
            }

            function onError (data) {
                // alert('失败')
                // 定位出错
                console.log('定位出错' , data);
            }
            })
        }
    }
}
</script>

<style>
#container {width:750px; height: 300px; }  
</style>