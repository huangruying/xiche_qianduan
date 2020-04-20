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
        <!-- <div class="search">
            <span>搜索</span>           
            <img src="@/assets/index/搜索@2x.png" alt="">
        </div> -->
        <div class="text">地图</div>
      </div>
    </div>
    <div class="tabs clearFix">
      <div class="grid">
        <img src="@/assets/index/洗车icon@2x.png" alt="" class="imgtab"/>
        <span>洗车</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/美容icon@2x.png" alt="" class="imgtab"/>
        <span>美容</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/保养icon@2x.png" alt="" class="imgtab"/>
        <span>保养</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/维修@2x.png" alt="" class="imgtab"/>
        <span>维修</span>
      </div>
    </div>
    <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
      <van-tab :title="tab.title" :name="tab.name" v-for="tab in vanTab" :key="tab.name"></van-tab>
    </van-tabs>
    <div class="commodity_box">
      <div class="commodity" @click="particulars">
        <img src="@/assets/index/2@2x.png" alt="">
        <div class="text_box">
          <div class="title">
            <span>广州市锦辉汽车维修服务342222222.</span>
            <em>1 公里</em>
          </div>
          <div class="rate">
            <van-rate v-model="rate" allow-half readonly size="16px" color="#ffaf00"/>
            <span>4.5 分</span>
          </div>
          <div class="bottom_address">
            <div class="left">
              <img src="@/assets/index/定位@2x.png" alt="">
              <span>广州/天河区</span>
            </div>
            <div class="right">
              <img src="@/assets/index/时间@2x.png" alt="" class="img">
              <span>8:30-17:30</span>
            </div>
          </div>
        </div>
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
import AMap from 'AMap' // 引入高德地图
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  data(){
    return{
      adcode: "",
      area: "",
      pickerShow: false,
      areaList: areaList,
      rate: 4.5,
      value: 0,
      search: "",
      indexSrc: require('@/assets/index/index_img.png'),
      vanTab:[
        {
          title: "全部",
          name: 0
        },
        {
          title: "普通洗车",
          name: 1
        },
        {
          title: "全套精洗",
          name: 2
        }
      ],
      option1: [
        { text: '天河区', value: 0 },
        { text: '白云区', value: 1 },
        { text: '番禺区', value: 2 },
      ],
      activeName: 0
    }
  },
  mounted(){
    this.getLocation()
    Toast.loading({
      message: '正在定位...',
      forbidClick: true,
    });
  },
  methods: {
    onClick(name, title) {
      
    },
    async areaChange(e) {
      console.log(e);
      console.log(this.adcode);
      this.pickerShow = false
      // this.province = e[0].name;
      // this.city = e[1].name;
      this.area = e[2].name;
    },
    particulars(){
      this.$router.push({name:"particulars"})
    },
    getLocation() {
      var thiss = this
        AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
          })

          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data是具体的定位信息
            console.log('定位成功信息：', data)
            self.adcode = data.addressComponent.adcode
            // self.province = data.addressComponent.province
            // self.city = data.addressComponent.city.replace("市", "");
            // self.area = data.addressComponent.district.replace("区", "");
          }

          function onError(data) {
            // 定位出错
            console.log('定位失败错误：', data)
            thiss.getLngLatLocation()
          }
        })
    },
    getLngLatLocation() {
        Toast.fail('定位失败！请点击左上角手动选择位置');
        return
        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              console.log('通过ip获取当前城市：',result)
              //逆向地理编码
              AMap.plugin('AMap.Geocoder', function () {
                  var geocoder = new AMap.Geocoder({
                      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                      city: result.adcode
                      // city: result.city
                  })

                  var lnglat = result.rectangle.split(';')[0].split(',');
                  console.log(lnglat);
                  
                  // geocoder.getLocation(lnglat, function(status, result) {
                  //   if (status === 'complete' && result.info === 'OK') {
                  //     // result中对应详细地理坐标信息
                  //     console.log(result);
                  //   }
                  // })
                  geocoder.getAddress(lnglat, function (status, data) {
                      if (status === 'complete' && data.info === 'OK') {
                          // result为对应的地理位置详细信息
                          console.log(data)
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
        >span{
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
          width: 100px;
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