<template>
  <div class="particulars">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="( item , index) in dataList.storeImages" :key="index">
            <img :src="item" alt="">
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/ {{length}}
            </div>
        </template>
      </van-swipe>
      <div class="title">{{dataList.dotName}}</div>
      <div class="rate_box">
          <div class="rate">
            <van-rate v-model="dataList.score" allow-half readonly size="16px" color="#ffaf00"/>
            <span>{{dataList.score}} 分</span>
          </div>
          <span>销量{{dataList.volume}}</span>
      </div>
      <div class="bottom_address">
        <div class="left">
          <img src="@/assets/particulars/电话@2x.png" alt="">
          <span>电话 <span>{{dataList.storePhone}}</span></span>
        </div>
        <div class="right">
          <img src="@/assets/index/时间@2x.png" alt="" class="img">
          <span>{{dataList.businessHours}} - {{dataList.businessHours2}}</span>
        </div>
      </div>
      <div class="bgd_box">
          <div class="navigation">
              <div class="nav">
                  <img src="@/assets/index/定位@2x.png" alt="">
                  <span>{{dataList.address}}</span>
              </div>
              <div class="nav_btn" @click="navigation(dataList.address)">
                  <div>
                      <img src="@/assets/particulars/指路牌@2x.png" alt="">
                      <span>{{distance}}km</span>
                  </div>
                  <span>导航</span>
              </div>
          </div>
          <div class="service clearFix">
              <div class="service_text fl" :class="index === 0?'color':''" @click="service(0)">
                  <i class="iconfont icon-wodeyouhuijuan"></i>
                  <span>服务项目</span>
              </div>
              <div class="service_text fl" :class="index === 1?'color':''" @click="service(1)">
                  <i class="iconfont icon-fuwu"></i>
                  <span>一键用券</span>
              </div>
          </div>
          <div class="service_tab">
              <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
                <van-tab :title="tab.title" :name="tab.name" v-for="tab in vanTab" :key="tab.name"></van-tab>
              </van-tabs>
          </div>
      </div>
      <div class="price_box">
          <div class="price" @click="payTheBil">
              <span>普通洗车</span>
              <div>
                  <span>门市价：</span>￥46
              </div>
          </div>
          <div class="price">
              <span>普通洗车</span>
              <div>
                  <span>门市价：</span>￥46
              </div>
          </div>
          <div class="price">
              <span>普通洗车</span>
              <div>
                  <span>门市价：</span>￥46
              </div>
          </div>
      </div>
      <van-share-sheet v-model="showShare" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import api from '@/api/particulars'
import axios from 'axios'
export default {
    data () {
        return {
            imgArr: [],
            rate: 4.5,
            current: 0,
            index: 0,
            length: "",
            activeName: 0,
            showShare: false,
            options: [
                {
                name: '百度地图',
                icon: require('@/assets/baidu.png') ,
                },
                {
                name: '高德地图',
                icon: require('@/assets/gaode.png'),
                },
                {
                name: '腾讯地图',
                icon: require('@/assets/tenxun.png'),
                },
            ],
            distance: "",
            city: "",
            lat: "",
            lng: "",
            dataList: {},
            vanTab:[
                {
                title: "洗车",
                name: 0
                },
                {
                title: "美容",
                name: 1
                },
                {
                title: "喷漆",
                name: 2
                }
            ],
        }
    },
    mounted(){
        var { dotCode , city , region , distance} = this.$route.query
        this.apiGetList(dotCode,city,region)
        this.city = city
        this.distance = distance
    },
    methods: {
        payTheBil(){
            // axios({
            //     method: 'post',
            //     url: 'http://test2.yuyuetrip.com.cn/weChatUnifiedorder',
            //     data:{ money: '1' }
            // }).then(res=>{
            //     window.location.href = res                      
            // }).catch(err=>{
            //     console.log(err);
            // })
        },
        onSelect(option) {
          if(option.name == '百度地图'){
              window.location.href = `http://api.map.baidu.com/marker?location=${this.lat},${this.lng}&title=${this.dataList.address}&content=${this.dataList.address}&output=html`
          }else if(option.name == '高德地图'){
              window.location.href = `http://uri.amap.com/marker?position=${this.lng},${this.lat}&name=${this.dataList.address}&coordinate=gaode&callnative=1`
          }else if(option.name == '腾讯地图'){
              window.location.href = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${this.lat},${this.lng};addr:${this.dataList.address}`
          }
          this.showShare = false;
            // 掉起百度
            // getBaidu: function(){
            //     return 'http://api.map.baidu.com/marker?location=' + this.position1+'&output=html&title='+this.fahuoAddress
            // },
            // //掉起高德地图
            // getGaode: function() {
            //     return 'https://uri.amap.com/marker?position=' + this.position+'&name='+this.fahuoAddress
            // },
            // //调起腾讯地图
            // getTencent: function(){
            //     return 'https://apis.map.qq.com/uri/v1/marker?marker=coord:'+this.position1+';title:'+this.fahuoAddress+';addr:'+this.addressName+'&referer=聚品'
            // }
        },
        async apiGetList(dotCode,city,region){
            var res = await api.getOfficialDotByDotCode({dotCode,city,region})
            // console.log(res.data.data);
            this.dataList = res.data.data
            // var imgArr = JSON.parse(this.dataList.storeImage)
            // let imgArr2 = imgArr.filter((num) => {
            // return num != 'null';
            // });
            this.length = this.dataList.storeImages.length
            // this.imgArr = imgArr2
        },
        navigation(address){
            var thiss = this
            AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: thiss.city
            })
            geocoder.getLocation( address, function(status, result) {
                // console.log(result);
                if (status === 'complete' && result.info === 'OK') {
                   // result中对应详细地理坐标信息
                   thiss.lat = result.geocodes[0].location.lat
                   thiss.lng = result.geocodes[0].location.lng
                   thiss.showShare = true
                }else{
                    thiss.$toast("地理位置查询失败,请联系客服!")
                }
              })
            })
        },
        onChange(index) {
         this.current = index;
        },
        onClick(name, title) {
        
        },
        service(index){
            this.index = index
        }
    }
}
</script>

<style lang="less" scoped>
// /deep/.van-share-sheet__options{
//     padding: 40px 30px;
//     /deep/.van-share-sheet__icon{
//         width: 100px;
//         height: 100px;
//         border-radius: 20px;
//     }
// }
// /deep/.van-share-sheet__cancel{
//     height: 80px;
//     line-height: 80px;
// }
/deep/.van-swipe-item{
    height: 220px;
    >img{
        width: 100%;
        height: 100%;
    }
}
.price_box{
    background: #fff;
    padding: 0 12px;
    .price{
        margin-top: 11px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 25px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        box-shadow:0px 2.5px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius:6px;
        >span{
            font-size: 15px;
        }
        >div{
            color: #FE0006;
            font-size: 15px;
            font-weight: bold;
            >span{
                color: #666666;
                font-size: 12px;
                font-weight: 400;
            }
        }
    }
}
/deep/.van-tabs--line .van-tabs__wrap {
  background: #F8F8F8;
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
.bgd_box{
    background: #f7f7f7;
    padding-top: 12px;
    .service{
        background: #fff;
        .service_text{
            color: #666666;
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 55px;
            padding: 0 12px;
            &.color{
                color: #F62A2A;
                font-weight:bold;
            }
            >i{
                font-size: 13px;
                margin-right: 5px;
            }
        }
    }
    .navigation{
        margin-bottom: 12px;
        background: #fff;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav_btn{
            display: flex;
            >div{
                background: #0F8FFF;
                border-radius: 3px 0 0 3px;
                display: flex;
                align-items: center;
                height: 27px;
                padding: 0 6.5px;
                color: #fff;
                >img{
                    width: 10px;
                    height: 11px;
                }
            }
            >span{
                display: block;
                color: #0F8FFF;
                width: 60px;
                font-size: 12px;
                height: 27px;
                text-align: center;
                line-height: 27px;
                border: 1px solid #0F8FFF;
                border-radius: 0 3px 3px 0;
            }
        }
        .nav{
            display: flex;
            align-items: center;
            >img{
                width: 14px;
                height: 17.5px;
                margin-right: 5px;
            }
            >span{
                color: #333333;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
}
/deep/.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 4px 7px;
    font-size: 12px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
}
.title{
    padding-left: 12px;
    color: #010101;
    font-size: 14px;
    margin-top: 22.5px;
}
.bottom_address{
    margin-top: 9px;
    padding: 8px 12px 17.5px;
    display: flex;
    justify-content: space-between;
    >div{
      display: flex;
      align-items: center;
      >span{
        color: #666666;
        font-size: 12px;
        >span{
            font-size: 12px;
            color: #0f8fff;
        }
      }
      >img{
        width: 10px;
        height: 11px;
        margin-right: 5px;
        &.img{
          width: 12px;
          height: 12px;
        }
      }
    }
}
.rate_box{
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding-left: 12px;
    >span{
        display: block;
        margin-left: 9px;
        color: #666666;
    }
    .rate{
        >span{
            margin-left: 4.5px;
            color: #F62A2A;
        }
    }
}
</style>