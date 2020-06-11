<template>
  <div class="pay">
      <div class="state_box" v-if="Yes">
          <img src="@/assets/payYes.jpg" alt="" class="img">
          <span>支付成功</span>
      </div>
      <div class="state_box" v-if="No">
          <img src="@/assets/4740.gif" alt="">
          <span class="no">支付失败</span>
      </div>
    <div class="goods_box">
        <div>
            <span>商品名称</span>
            <div>{{dataList.name}}</div>
        </div>
        <div>
            <span>商品价格</span>
            <div>{{dataList.price}} 元</div>
        </div>
        <div>
            <span>悦途商品编号</span>
            <div>{{dataList.commodityCode}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/merchantIndex";
import wx from "weixin-js-sdk";
export default {
    data(){
        return{
            noncestr: "",
            timestamp: "",
            signature: "",
            dataList: {},
            openId: null,
            Yes: false,
            No: false
        }
    },
    created(){
        api.getParameter({url: location.href}).then(res=>{
            this.noncestr = res.data.noncestr
            this.timestamp = res.data.timestamp
            this.signature = res.data.signature
            this.pay()
        })
    },
    mounted(){
        var { goodsId } = this.$route.query
        api.getYyIproductById({goodsId: goodsId}).then(res=>{
            this.dataList = res.data.data
        })
    },
    methods: {
       async pay(){
           this.openId = localStorage.getItem("wxUserId") 
            if(!this.openId){
              this.$parent.wxSQ()
            }
            var { goodsId, ChannelId, customerId, orderId, belongOrg, belongSys, cardEffTime, cardInvTime, bindMemName, bindMemPhone } = this.$route.query
            var res = await api.buyBearercardjsapi({openId: this.openId, goodsId, ChannelId, customerId, orderId, belongOrg, belongSys, cardEffTime, cardInvTime, bindMemName, bindMemPhone })
             var this2 = this
             wx.config({
             debug: false, // true:调试时候弹窗
             appId: res.data.data.appid, // 微信appid
            //  appId: "wx1008eb4c001227c4", // 微信appid
             timestamp: this2.timestamp, // 时间戳
             nonceStr: this2.noncestr, // 随机字符串
             signature: this2.signature, // 签名
             jsApiList: [
                "chooseWXPay" // 微信支付
             ]
             })
             wx.error(function(res3) {
                 this2.Yes = false
                 this2.No = true
                 this2.$toast("服务器炸啦！")
                 // console.log('微信sdk配置失败！');
             });
             wx.ready(function(){
                 wx.chooseWXPay({
                 appId: res.data.data.appid,
                 timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的字符
                 nonceStr: res.data.data.nonce_str, // 支付签名随机串，不长于 32 
                 package: res.data.data.packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                 signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                 paySign: res.data.data.sign, // 支付签名
                 success: function (v) {
                     this2.Yes = true
                     this2.No = false
                     //  跳转到支付成功页面有这个页面
                     // var res = JSON.stringify(res)
                     // alert('支付成功' + res)
                    //  this2.apiPayment(res.data.data.orderNo)
                 },
                 cancel: function (res) { //提示引用的是mint-UI里toast
                     this2.Yes = false
                     this2.No = true
                     this2.$toast('已取消支付');
                 },
                 fail: function (res) {
                     this2.Yes = false
                     this2.No = true
                     this2.$toast('支付失败，请重试');
                 }
                 })
             })
        }
    }
}
</script>

<style lang="less">
.goods_box{
    background: #fff;
    padding: 20px 0;
    border-top: 1px solid #999;
    >div{
        display: flex;
        justify-content: space-between;
        padding: 4px 10px;
        color: #777;
    }
}
.pay{
    height: 100vh;
    background: #f3f3f3;
}
.state_box{
    display: flex;
    align-items: center;
    padding: 14px 18px;
    background: #fff;
    >img{
        width: 35px;
        height: 35px;
        &.img{
            width: 60px;
            height: 50px;
        }
    }
    >span{
        color: #1aac19;
        font-weight: bold;
        font-size: 16px;
        margin-left: 10px;
        &.no{
            color: red;
        }
    }
}
</style>