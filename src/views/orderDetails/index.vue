<template>
  <div class="orderDetails">
      <div class="bgd_box" :style="{backgroundImage:`url(${bgdSrc}) `}">
          <div>交易完成</div>
          <span>订单编号: {{ dataList.orderNo }}</span>
      </div>
      <div class="title">{{ dataList.alias }}</div>
      <div class="title notop">使用门店</div>
      <div class="order_box">
          <img :src="dataList.storeImage" alt="">
          <div class="text_box">
              <div class="top">{{ dataList.dotName }}</div>
              <div class="xin"><van-rate v-model="dataList.score" size="22px" void-icon="star" readonly /></div>
              <div class="bottom">{{ dataList.dotAddress }}</div>
          </div>
          <div class="img_box">
              <img src="@/assets/order/dinwei.png" alt="" @click="address">
              <img src="@/assets/order/dianhua.png" alt="" @click="phone(dataList.mobile)">
          </div>
      </div>
      <div class="info">
          <div class="title">订单信息</div>
          <div class="info_text">
              <div>下单时间</div>
              <span>{{ dataList.destructionTime }}</span>
          </div>
          <div class="info_text">
              <div>支付方式</div>
              <span>卡券兑换</span>
          </div>
          <div class="info_text">
              <div>购买数量</div>
              <span>1</span>
          </div>
          <div class="info_text">
              <div>车牌号码</div>
              <span>{{ dataList.licensePlate }}</span>
          </div>
      </div>
      <van-share-sheet v-model="showShare" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import api from '@/api/orderDetails'
export default {
    data(){
        return{
            value: 4,
            bgdSrc: require('@/assets/order/ditu.png'),
            dataList: {},
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
            lat: "",
            lng: ""
        }
    },
    mounted(){
        var { couponCode } = this.$route.query
        this.getWriteoffOrderBycouponCode(couponCode)
    },
    methods: {
        getWriteoffOrderBycouponCode(data){
            api.getWriteoffOrderBycouponCode({couponCode: data}).then(res=>{
                console.log(res);
                this.dataList = res.data.data
                this.lat = this.dataList.latitude
                this.lng = this.dataList.longitude
                this.dataList.score = Number(this.dataList.score)
            })
        },
        phone(phoneNumber){
            window.location.href = 'tel://' + phoneNumber
        },
        onSelect(option) {
          if(option.name == '百度地图'){
              window.location.href = `http://api.map.baidu.com/marker?location=${this.lat},${this.lng}&title=${this.dataList.dotAddress}&content=${this.dataList.dotAddress}&output=html`
          }else if(option.name == '高德地图'){
              window.location.href = `http://uri.amap.com/marker?position=lng,lat&name=${this.dataList.dotAddress}&coordinate=${this.lat}&callnative=${this.lng}`
          }else if(option.name == '腾讯地图'){
              window.location.href = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${this.lat},${this.lng};addr:${this.dataList.dotAddress}`
          }
          this.showShare = false;
        },
        address(){
            this.showShare = true;
        }
    }
}
</script>

<style lang="less" scoped>
.orderDetails{
    height: 100vh;
    background: #f5f5f9;
}
.info{
    background: #fff;
    margin-top: 10px;
    padding-bottom: 20px;
    .info_text{
        display: flex;
        padding: 5px 10px;
        >div{
            color: #818181;
        }
        >span{
            flex: 1;
            text-align: right;
        }
    }
}
.bgd_box{
    width: 100%;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
    >div{
        font-size: 18px;
        font-weight: 600;
        padding: 15px 10px 8px;
    }
    >span{
        padding-left: 10px;
    }
}
.order_box{
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 10px;
    .img_box{
        display: flex;
        >img{
            width: 30px;
            height: 30px;
            margin: 38px 8px 8px;
        }
    }
    .text_box{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
        .top{
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .bottom{
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            color: #818181;
        }
    }
    >img{
        width: 80px;
        height: 80px;
    }
}
.title{
    font-size: 16px;
    font-weight: bold;
    background: #fff;
    padding: 10px 10px;
    &.notop{
        margin-top: 10px;
    }
}
</style>