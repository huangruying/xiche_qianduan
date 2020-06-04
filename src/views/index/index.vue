<template>
  <div class="index">
    <div class="img_box" :style="{backgroundImage:`url(${indexSrc}) `}">
      <div class="search_box">
        <div class="address">
          <img src="@/assets/index/address-icon@2x.png" alt="">
          <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option1" />
          </van-dropdown-menu> -->
          <div class="tou_bu" @click="pickerShow = true">
            <span>{{ area }}</span>
            <img src="@/assets/index/多边形 1@2x.png" alt="">
          </div>
        </div>
        <div class="search_input">
          <van-search v-model="search" placeholder="请输入搜索关键词" @blur="blurSearch"/>
        </div>
        <div class="text">地图</div>
      </div>
    </div>
    <div class="tabs clearFix">
      <div class="grid" v-for="(value,index) in tabsList" :key="index" @click="vanTabList(value.carwashsTypes,value.id)">
        <img :src="value.washPic" alt="" class="imgtab"/>
        <span>{{value.dotType}}</span>
      </div>
    </div>
    <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
      <van-tab :title="tab.dotsType" :name="tab.ids" v-for="tab in vanTab" :key="tab.name"></van-tab>
    </van-tabs>
    <div class="commodity_box">
      <!-- 加载 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >

      <div class="commodity" @click="particulars(item)" v-for="(item,ind) in shopList" :key="ind">
        <img :src="item.storeImage" alt="">
        <div class="text_box">
          <div class="title">
            <span>{{item.dotName}}</span>
            <em>{{item.distance}} 公里</em>
          </div>
          <div class="rate">
            <van-rate v-model="item.score" allow-half readonly size="16px" color="#ffaf00"/>
            <span>{{item.score}} 分</span>
          </div>
          <div class="bottom_address">
            <div class="left">
              <img src="@/assets/index/定位@2x.png" alt="">
              <span>{{item.city}}/{{item.region}}</span>
            </div>
            <div class="right">
              <img src="@/assets/index/时间@2x.png" alt="" class="img">
              <span>{{item.businessHours}}</span>
            </div>
          </div>
        </div>
      </div>

      </van-list>
      <!-- <div class="nodata" v-if="nodata">
        暂无数据~
      </div> -->
    </div>
     <div id="container" />
    <!-- 省市区联动 -->
    <div class="cell">
      <van-popup v-model="pickerShow" position="bottom" :style="{ height: '50%' }">
          <van-area
              :area-list="areaList"
              :visible-item-count="4"
              @confirm="areaChange"
              @click.stop
              cancel-button-text=" "
              title="请选择位置"
              :value="adcode" 
            />
      </van-popup>
    </div>
  </div>
</template>

<script>
import areaList from "@/utils/area";
import api from '@/api/index'
import { location } from "@/utils/LocationUtil";
import wx from "weixin-js-sdk";
// import AMap from 'AMap' // 引入高德地图
export default {
  data(){
    return{
      loading: true,
      finished: false,
      adcode: "",
      area: "",
      city: "",
      region: "",
      pickerShow: false,
      // nodata: false,
      areaList: areaList,
      rate: 4.5,
      value: 0,
      search: "",
      lat: "",
      lng: "",
      carwashsIds: "",
      carwashId: "",
      tabsList: [],
      shopList: [],
      shopList2: [],
      indexSrc: require('@/assets/index/index_img.png'),
      vanTab:[],
      option1: [
        { text: '天河区', value: 0 },
        { text: '白云区', value: 1 },
        { text: '番禺区', value: 2 },
      ],
      activeName: 0,
      duration: 0,
      total: "",
      pageNum: 1,
      noncestr: "",
      timestamp: "",
      signature: ""
    }
  },
  mounted (){
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();   // 高德定位
    this.tabList()     
    // this.wxLocation()  // 微信地理位置
  },
  created() {
    // this.getLocationPop(); // 调用获取地理位置 
  },
  computed:{
      // shopList:function(){
      //     return this.sortByKey(this.shopList,'distance')
      // }
  },
  methods: {
    wxLocation(){
        api.getParameter({url: window.location.href}).then(res=>{
            this.noncestr = res.data.noncestr
            this.timestamp = res.data.timestamp
            this.signature = res.data.signature
            this.wxRegister()
        })
    },
    // 排序
    sortByKey(array,key){
        return array.sort(function(a,b){
            var x = a[key];
            var y = b[key];
            return((x<y)?-1:((x>y)?1:0));
        })
    },
    // 微信地理位置
    wxRegister() {
      var this2 = this
      // api.getParameter({code: this.code}).then(res => {
        // var data = res.data;
        wx.config({
          debug: false, // true:调试时候弹窗
          appId: "wx1008eb4c001227c4", // 微信appid
          timestamp: this.timestamp, // 时间戳
          nonceStr: this.noncestr, // 随机字符串
          signature: this.signature, // 签名
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            // 'onMenuShareTimeline', // 分享到朋友圈接口
            // 'onMenuShareAppMessage', //  分享到朋友接口
            // 'onMenuShareQQ', // 分享到QQ接口
            // 'onMenuShareWeibo', // 分享到微博接口
            "scanQRCode", // 微信扫一扫功能
            "openLocation" //微信地理位置
          ]
        });
        wx.ready(res => {
          wx.getLocation({
            success: function(res) {
              var pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              this2.lat = pointY
              this2.lng = pointX
              var wxaccuracy = res.accuracy; // 位置精度
              // 逆向地理编码方法
              AMap.plugin("AMap.Geocoder", function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: wxaccuracy
                });
                var lnglat = [pointX, pointY];
                this2.$store.dispatch('disCenter',lnglat) // vuex存起来
                geocoder.getAddress(lnglat, function(status, result) {
                  if (status === "complete" && result.info === "OK") {
                    var data = JSON.stringify(result)
                    // result为对应的地理位置详细信息
                    var bounds = result.regeocode.addressComponent
                      this2.city = bounds.city
                      this2.area = bounds.district
                      this2.region = bounds.district
                      this2.pageNum = 1
                      this2.adcode = bounds.adcode
                      this2.apiGetlist()
                  }
                });
              });
            },
            cancel: function(res) {
              this.getLocation()
            }
          });
        });
        /* 处理失败验证 */
        wx.error(function(res) {
          // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
          // alert("微信sdk配置失败！ " + res.errMsg);
          this2.$toast('获取地理位置失败，请点击左上角手动获取当前位置！')
        });
      // });
    },
    // 上拉加载
    onLoad() {
          // this.loading = false;
          this.apiGetlist()
    },
    // 搜索
    blurSearch(){
      this.pageNum = 1
      if(this.search == ""){
        this.tabList()
        this.apiGetlist()   
      }else{
        this.vanTab = [{
                dotsType: "全部",
                ids: ""
        }]
        this.apiGetlist()
      }
    },
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
    // 点击分类
    onClick(name, title) {
      this.pageNum = 1
      this.carwashsIds = name
      this.apiGetlist()
    },
    // 点击总分类
    vanTabList(tab, id){
      this.carwashId = id
      this.pageNum = 1
      this.vanTab = tab    
      this.apiGetlist()
    },
    // 经纬度计算距离    15817495925  88888888
    latLng(lat,lng){
       var lat2 = this.lat
       var lng2 = this.lng
      //  console.log(this.lat, this.lng);
       var radLat1 = this.rad(lat);
       var radLat2 = this.rad(lat2);
       var a = radLat1 - radLat2;
       var b = this.rad(lng) - this.rad(lng2);
       var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
       s = s * 6378.137;
       // EARTH_RADIUS;
       s = Math.round(s * 10000) / 10000;
       return s.toFixed(2)
    },
    //经纬度转换成三角函数中度分表形式。
    rad(d){
      return d * Math.PI / 180.0;
    },
    // 获取数据
    apiGetlist(){
      api.indexInfo({
        pageNum: this.pageNum,
        pageSize: 4,
        search: this.search,
        carwashId: this.carwashId,   // 洗车  美容...
        city: this.city,          // 城市名称
        region: this.region,     // 区域名称
        carwashsIds: this.carwashsIds  // 1普通洗车2全套精洗
      }).then(res=>{
        // console.log(res);
        if(res.data.data.length > 0){
          if(this.pageNum == 1){
               this.shopList = []
              this.finished = false
          }
           ++this.pageNum
          // this.nodata = false
          res.data.data.map(v=>{
            v.storeImage = v.storeImages[0]
            var distance = this.latLng(v.latitude,v.longitude)
            v.distance = distance
          })
          this.shopList = [...this.shopList , ...res.data.data]
          this.total = res.data.total
          this.loading = false
          this.shopList = this.sortByKey(this.shopList,'distance')
        }else if(res.data.data.length <= 0){
              if(this.pageNum == 1){
                this.shopList = []
                this.finished = true
                return
              }
              this.finished = true;    
        }
        if(this.shopList.length >= res.data.total){
          this.finished = true;
        }
      })
    },
    // 获取总分类数据
    async tabList(){
        var res = await api.findCarwashTypeInfos()
        this.tabsList = res.data.data
        this.tabsList.map(v=>{
          var obj = {
              dotsType: "全部",
              ids: ""
           }
            v.carwashsTypes.unshift(obj)
        })
        this.vanTab = this.tabsList[0].carwashsTypes
        this.carwashId = this.tabsList[0].id
        this.carwashsIds = this.tabsList[0].carwashsTypes[0].ids
        // this.pageNum = 1
        // this.apiGetlist()   
    },
    // 手动选择省市区
    areaChange(e) {
      var thiss = this
      this.pickerShow = false
      this.area = e[2].name;
      this.region = e[2].name;
      this.adcode = e[2].code;  
      this.city = e[1].name;
      AMap.plugin('AMap.DistrictSearch', function () {
      // 创建行政区查询对象
      var district = new AMap.DistrictSearch({
        // 返回行政区边界坐标等具体信息
        extensions: 'all',
        // 设置查询行政区级别为 区 
        level: 'district'
      })
      district.search(e[2].name, function(status, result) {
            var bounds = result.districtList[0].center
            thiss.lat = bounds.lat
            thiss.lng = bounds.lng
            thiss.pageNum = 1
            thiss.apiGetlist()
          })
        })
    },
    // 点击跳转详情页
    particulars(item){
      this.$router.push({name:"particulars",query: {
        dotCode: item.dotCode,
        city: item.city,
        region: item.region,
        distance: item.distance
      }})
    },
    // 定位
    getLocation() {
      // const url =
      //   'https://webapi.amap.com/maps?v=1.4.15&key=56ff9418fd027ac8fbfb82ff4787e38c&callback=onLoad'
      // const jsapi = document.createElement('script')
      // jsapi.charset = 'utf-8'
      // jsapi.src = url
      // document.head.appendChild(jsapi)
      const self = this;
      this.$toast.loading({
        duration: self.duration, // 持续展示 toast
        message: '',
        forbidClick: true,
      });
      // var map = new AMap.Map('container',{
      //   resizeEnable: true
      // })
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
       // map.addControl(geolocation); //geolocation.getCurrentPosition(); //精准定位
       // geolocation.getCityInfo();  //定位到城市
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          // console.log("定位成功信息：", data);
          self.duration = 1
          self.lng = data.position.lng
          self.lat = data.position.lat
          self.$store.dispatch('disCenter',[self.lng,self.lat]) // vuex存起来
          self.area = data.addressComponent.district
          self.city = data.addressComponent.city
          self.region = data.addressComponent.district
          self.apiGetlist()
          self.finished = false
          for(let key in self.areaList.county_list){
             if(self.areaList.county_list[key] == self.area){
               self.adcode = key
               return 
             }
          }
          // self.district = data.addressComponent.district.replace("区", "");
        }

        function onError(data) {
          // 定位出错
          // console.log("定位失败错误：", data);
          // self.$toast('定位失败！请点击左上角选择位置');
          // 调用ip定位
          self.getLngLatLocation();
        }
      });
    },
    // 定位出错，调用ip定位
    getLngLatLocation() {
        this.$toast.fail('定位失败！');
        // return
        var cat = this
        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              // console.log('通过ip获取当前城市：',result)
              //逆向地理编码
              var citysty = result.city + "中心"
              // console.log(citysty);
              AMap.plugin('AMap.Geocoder', function () {
                  var geocoder = new AMap.Geocoder({
                      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                      // city: result.adcode
                      city: result.city
                  })
                  // 经纬度查询地址
                  var lnglat = result.rectangle.split(';')[0].split(',');
                  // geocoder.getAddress(lnglat, function (status, data) {
                  //     if (status === 'complete' && data.info === 'OK') {
                  //         // result为对应的地理位置详细信息
                  //         console.log(data)
                  //     }
                  // })
                  // cat.lng = lnglat[0]
                  // cat.lat = lnglat[1]
                  // cat.area = result.city
                  // cat.city = result.city
                  // cat.apiGetlist()
                  // console.log(cat.area);
                  //  for(let key in cat.areaList.city_list){
                  //         if(cat.areaList.city_list[key] == result.city){
                  //           cat.adcode = key
                  //         }
                  //         // console.log(cat.areaList)
                  //   }
                  geocoder.getLocation(citysty, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                      // result中对应详细地理坐标信息
                      var location = result.geocodes[0].location
                        // console.log(result.geocodes[0].addressComponent);
                        cat.lng = location.lng
                        cat.lat = location.lat
                        cat.$store.dispatch('disCenter',[cat.lng,cat.lat]) // vuex存起来
                        cat.area = result.geocodes[0].addressComponent.district
                        cat.city = result.geocodes[0].addressComponent.city
                        cat.apiGetlist()
                        cat.finished = false
                        for(let key in cat.areaList.city_list){
                          // console.log(cat.areaList.county_list[key]);
                          if(cat.areaList.city_list[key] == cat.city){
                              cat.adcode = key
                          }
                          // console.log(cat.areaList)
                       }
                    }
                  })
              })
            }
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__line{
  height: 2px;
}
.nodata{
  text-align: center;
  margin-top: 15px;
}
// .cell{
//   /deep/.van-cell{
//     padding: 20px;
//   }
//   /deep/.van-ellipsis{
//   font-size: 30px;
// }
// /deep/.van-picker__toolbar{
//     height: 80px;
//     line-height: 80px;
//     .van-picker__cancel,.van-picker__title,.van-picker__confirm{
//       font-size: 28px;
//     }
//   }
// }
.search_input{
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  /deep/.van-search {
    width: 100%;
    height: 100%;
    background: none;
    // margin: 0 10px;
    // border-radius: 20px;
    /deep/.van-search__content{
      border-radius: 20px;
    }
    .van-field__left-icon .van-icon{
      margin: 0px 0 0 1.5px;
      font-size: 16px;
      color: #999;
    }
    .van-cell{
      padding: 0;
    }
  }
  // >img{
  //       width: 26px;
  //       height: 26px;
  //       margin-right: 19px;
  // }
}
.tou_bu{
  flex: 1;
  color: #fff;
  display: flex;
  align-items: center;
  margin-left: 6px;
  >img{
    width: 12px;
    height: 8px;
    margin-left: 3px;
  }
}
/deep/.van-cell{
  // background: #07abae;
  color: #fff;
}
/deep/.van-hairline--top-bottom::after{
  border: none;
}
/deep/.van-tabs--line .van-tabs__wrap {
  // background: #F8F8F8;
  height: 36px;
  /deep/.van-tab__text{
    color: #666666;
    font-size: 12.5px;
  }
  /deep/.van-tab--active{
    >span{
      color: #ee0a24;
    }
  }
  /deep/.van-tabs__nav{
     background: #F8F8F8;
  }
  /deep/.van-tab{
    line-height: 36px;
  }
}
.commodity_box{
  padding: 0px 10px;
  .commodity{
    padding: 8px 0;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    .text_box{
      padding-top: 15px;
      flex: 1;
      .bottom_address{
        margin-top: 9px;
        display: flex;
        justify-content: space-between;
        >div{
          display: flex;
          align-items: center;
          >span{
            color: #666666;
          }
          >img{
            width: 7.5px;
            height: 10px;
            margin-right: 5px;
            &.img{
              width: 10px;
            }
          }
        }
      }
      .rate{
        margin-top: 7px;
        >span{
          margin-left: 4.5px;
          color: #F62A2A;
        }
      }
      .title{
        display: flex;
        justify-content: space-between;
        >span{
          flex: 1;
          display: block;
          height: 13px;
          line-height: 15px;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        >em{
          display: block;
          text-align: right;
          margin-top: 5px;
          width: 80px;
          font-size: 9px;
          font-family:Microsoft YaHei;
          color:rgba(51,51,51,1);
        }
      }
    }
    >img{
      width: 100px;
      height: 82px;
      border-radius: 2px;
      margin-right: 9px;
    }
  }
}
.tabs{
  margin: -15px 13px 0;
  background: #fff;
  border-radius: 7.5px;
  .grid{
    float: left;
    width: 25%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    >span{
      font-size: 13px;
    }
  }
  .imgtab{
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
  }
}
.img_box{
  height: 160px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .search_box{
    // opacity:  0.5;
    background-color: rgba(0, 0, 0, 0.3);
    height: 35px;
    display: flex;
    justify-content: space-between;
    .text{
      color: #fff;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 7px;
      margin-left: 5px;
    }
    .search{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border-radius: 10px; 
      color: #808080;
      margin: 6px;
      >span{
        display: block;
        margin-left: 9px;
        font-size: 10px;
      }
      >img{
        width: 13px;
        height: 13px;
        margin-right: 9px;
      }
    }
    .address{
      display: flex;
      align-items: center;
      /deep/.van-dropdown-menu {
        background: transparent;
        color: #fff;
        border: none;
        /deep/.van-ellipsis{
          padding-right: 7px;
        }
        /deep/.van-dropdown-menu__title::after{
          color: #fff;
          border: 6px solid;
          border-color: transparent transparent currentColor currentColor;
          top: 23%;
        }
        /deep/.van-ellipsis{
          color: #fff;
        }
      }
      >img{
        width: 12px;
        height: 19px;
        margin-left: 12px;
      }
    }
  }
}
</style>