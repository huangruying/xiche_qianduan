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
          <van-search v-model="search" placeholder="请输入搜索关键词" />
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
      <div class="nodata" v-if="nodata">
        暂无数据~
      </div>
    </div>
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
// import AMap from 'AMap' // 引入高德地图
export default {
  data(){
    return{
      adcode: "",
      area: "",
      city: "",
      region: "",
      pickerShow: false,
      nodata: false,
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
      indexSrc: require('@/assets/index/index_img.png'),
      vanTab:[],
      option1: [
        { text: '天河区', value: 0 },
        { text: '白云区', value: 1 },
        { text: '番禺区', value: 2 },
      ],
      activeName: 0
    }
  },
  created() {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
    this.tabList()
    // this.getLngLatLocation()
  },
  methods: {
    onClick(name, title) {
      this.carwashsIds = name
      this.apiGetlist()
    },
    vanTabList(tab, id){
      this.vanTab = tab
      this.carwashId = id
      this.apiGetlist()
    },
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
    rad(d){
      return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    },
    apiGetlist(){
      api.indexInfo({
        carwashId: this.carwashId,   // 洗车  美容...
        city: this.city,          // 城市名称
        region: this.region,     // 区域名称
        carwashsIds: this.carwashsIds  // 1普通洗车2全套精洗
      }).then(res=>{
        this.shopList = res.data.data
        if(res.data.data){
          this.nodata = false
          this.shopList.map(v=>{
            var distance = this.latLng(v.latitude,v.longitude)
            v.distance = distance
            // console.log(distance) Number;
          })
        }else{
          this.nodata = true
        }
      })
    },
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
        this.apiGetlist()
        // console.log(res);
    },
    areaChange(e) {
      var thiss = this
      this.pickerShow = false
      this.area = e[2].name;
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
            console.log(result);
            thiss.lat = bounds.lat
            thiss.lng = bounds.lng
            thiss.apiGetlist()
          })
        })
    },
    particulars(item){
      console.log(item);
      this.$router.push({name:"particulars",query: {
        dotCode: item.dotCode,
        city: item.city,
        region: item.region,
        distance: item.distance
      }})
    },
    getLocation() {
      const self = this;
      // this.$toast.loading({
      //   message: '',
      //   forbidClick: true,
      // });
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data);
          self.lng = data.position.lng
          self.lat = data.position.lat
          self.area = data.addressComponent.district
          self.city = data.addressComponent.city
          self.region = data.addressComponent.region
          self.apiGetlist()
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

                  var lnglat = result.rectangle.split(';')[0].split(',');
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
                        cat.area = result.geocodes[0].addressComponent.district
                        cat.city = result.geocodes[0].addressComponent.city
                        cat.apiGetlist()
                        for(let key in cat.areaList.city_list){
                          // console.log(cat.areaList.county_list[key]);
                          if(cat.areaList.city_list[key] == cat.city){
                              cat.adcode = key
                          }
                          // console.log(cat.areaList)
                       }
                    }
                  })
                  // geocoder.getAddress(lnglat, function (status, data) {
                  //     if (status === 'complete' && data.info === 'OK') {
                  //         // result为对应的地理位置详细信息
                  //         console.log(data)
                  //     }
                  // })
              })
            }
          })
        })
      }
  }
}
</script>

<style lang="less" scoped>
.nodata{
  text-align: center;
  margin-top: 30px;
}
.cell{
  /deep/.van-cell{
    padding: 20px;
  }
  /deep/.van-ellipsis{
  font-size: 30px;
}
/deep/.van-picker__toolbar{
    height: 80px;
    line-height: 80px;
    .van-picker__cancel,.van-picker__title,.van-picker__confirm{
      font-size: 28px;
    }
  }
}
.search_input{
  flex: 1;
  display: flex;
  align-items: center;
  /deep/.van-search {
    width: 100%;
    margin: 20px;
    border-radius: 30px;
    .van-field__left-icon .van-icon{
      margin: 5px 0 0 3px;
      font-size: 32px;
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
  margin-left: 12px;
  >img{
    width: 23px;
    height: 16px;
    margin-left: 6px;
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
  height: 72px;
  /deep/.van-tab__text{
    color: #666666;
    font-size:25px;
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
    line-height: 72px;
  }
}
.commodity_box{
  padding: 0px 20px;
  .commodity{
    padding: 16px 0;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    .text_box{
      padding-top: 30px;
      flex: 1;
      .bottom_address{
        margin-top: 18px;
        display: flex;
        justify-content: space-between;
        >div{
          display: flex;
          align-items: center;
          >span{
            color: #666666;
          }
          >img{
            width: 15px;
            height: 20px;
            margin-right: 10px;
            &.img{
              width: 20px;
            }
          }
        }
      }
      .rate{
        margin-top: 14px;
        >span{
          margin-left: 9px;
          color: #F62A2A;
        }
      }
      .title{
        display: flex;
        justify-content: space-between;
        >span{
          flex: 1;
          display: block;
          height: 26px;
          line-height:30px;
          font-size:26px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        >em{
          display: block;
          text-align: right;
          margin-top: 10px;
          width: 160px;
          font-size:18px;
          font-family:Microsoft YaHei;
          color:rgba(51,51,51,1);
        }
      }
    }
    >img{
      width: 200px;
      height: 165px;
      border-radius: 4px;
      margin-right: 19px;
    }
  }
}
.tabs{
  margin: -30px 25px 0;
  background: #fff;
  border-radius: 15px;
  .grid{
    float: left;
    width: 25%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    >span{
      font-size: 24px;
    }
  }
  .imgtab{
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  }
}
.img_box{
  height: 320px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .search_box{
    // opacity:  0.5;
    background-color: rgba(0, 0, 0, 0.3);
    height: 70px;
    display: flex;
    justify-content: space-between;
    .text{
      color: #fff;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 13px;
      margin-left: 10px;
    }
    .search{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border-radius: 20px; 
      color: #808080;
      margin: 12px;
      >span{
        display: block;
        margin-left: 18px;
        font-size: 20px;
      }
      >img{
        width: 26px;
        height: 26px;
        margin-right: 19px;
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
        width: 23px;
        height: 37px;
        margin-left: 24px;
      }
    }
  }
}
</style>