<template>
  <div class="yuyuePurchase">
    <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>购买</span>
          <div></div>
    </div>
    <div class="card_box">
        <div class="icon_card">
            <i class="iconfont icon-fuwu"></i>
            <span>{{value.name}}</span>
        </div>
        <div class="describe">
            <img :src="value.picfilepath" alt="">
            <div class="describe_text">
                <div class="top">{{value.name}}</div>
                <span>￥{{value.price}}</span>
                <div class="text">
                    <img src="@/assets/yuyueIndex/ico.png" alt="">
                    <span>{{value.desc}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="coupon_box" v-if="codeList.length <= 0">
        <i class="iconfont icon-wodeyouhuijuan"></i>
        <span>你还没有任何优惠券</span>
    </div>
    <!-- <van-checkbox-group v-model="radio" v-if="codeList.length > 0" @change="radioBarCode" :max="1"> -->
    <van-radio-group v-model="radio" v-if="codeList.length > 0">
        <div class="coupon_box">
            <i class="iconfont icon-wodeyouhuijuan"></i>
            <span class="lijian">有可用优惠券</span>
        </div>
        <div class="radio_box">
            <!-- <van-checkbox :name="value.radio" checked-color="#de9c4a" v-for="(value,index) in codeList" :key="index" v-if="value.status == 1">{{value.title}}</van-checkbox> -->
            <van-radio @click="radioBarCode(value.radio)" :name="value.radio" checked-color="#de9c4a" v-for="(value,index) in codeList" :key="index" v-if="value.status == 1">{{value.title}}</van-radio>
        </div>
    </van-radio-group>
    <!-- </van-checkbox-group> -->
    <van-submit-bar
        :price="price"
        button-text="提交订单"
        :tip="tip"
        tip-icon="info-o"
        @submit="onSubmit"
    />
  </div>
</template>

<script>
import api from "@/api/yuyueMyCoupon"
import apis from "@/api/merchantIndex";
import wx from "weixin-js-sdk";
export default {
    data(){
        return{
            radio: null,
            radio2: null,
            value: {},
            openId: "",
            codeList: [],
            codeList2: [],
            tip: "",
            price: 0,
            noncestr: "",
            timestamp: "",
            signature: "",
            timer: null
        }
    },
    mounted(){
        this.value = this.$store.getters.value
        this.price = Number(this.value.price)*100
        this.openId = localStorage.getItem("wxUserId")
        if(this.openId){
            this.apiCoupon()
        }
        apis.getParameter({url: location.href}).then(res=>{
            this.noncestr = res.data.noncestr
            this.timestamp = res.data.timestamp
            this.signature = res.data.signature
        })
    },
    // 这里是组件被销毁的声明周期钩子函数
    destroyed () {
        // 记得在这里清理定时器
        clearTimeout(this.timer)
    },
    methods: {
        onSubmit(){
            if(!(this.openId)){
                this.$parent.phoneDialog()
                return
            }
            var data = {}
            var radio = JSON.parse(this.radio)
            if(radio){
                data.coupon = radio[0]
            }
            data.pid = this.value.id
            data.openId = this.openId
            api.wxOfficialPay(data).then(res=>{
                if(res.data.code == 200){
                    var this2 = this
                    var openId = this.openId
                    wx.config({
                    debug: false, // true:调试时候弹窗
                    // appId: res.data.data.appid, // 微信appid
                    appId: "wx1008eb4c001227c4", // 微信appid
                    timestamp: this2.timestamp, // 时间戳
                    nonceStr: this2.noncestr, // 随机字符串
                    signature: this2.signature, // 签名
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        // 'onMenuShareTimeline', // 分享到朋友圈接口
                        // 'onMenuShareAppMessage', //  分享到朋友接口
                        // 'onMenuShareQQ', // 分享到QQ接口
                        // 'onMenuShareWeibo', // 分享到微博接口
                       //  "scanQRCode", // 微信扫一扫功能
                        // "openLocation", //微信地理位置
                        "chooseWXPay" // 微信支付
                    ]
                    })
                    wx.error(function(res3) {
                    this.$toast("服务器炸啦！")
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
                            //  跳转到支付成功页面有这个页面
                            // var res = JSON.stringify(res)
                            // alert('支付成功' + res)
                            this2.apiPayment(res.data.data.orderNo)
                        },
                        cancel: function (res) { //提示引用的是mint-UI里toast
                            this2.$toast('已取消支付');
                        },
                        fail: function (res) {
                            this2.$toast('支付失败，请重试');
                        }
                        })
                    })
                 
                }else{
                    // this.$toast("服务器炸啦！")
                    this.$toast(res.data.msg)
                    this.$parent.phoneDialog()
                }
            })
        },
        apiPayment(orderNo){
            api.getStatusByOrderNo({orderNo}).then(res2=>{
                if(res2.data.code == 200){
                    this.$toast.success('支付成功！');
                    this.$router.push({name: "yuyueUser"})
                }else{
                    this.timer = setTimeout(() => {
                        this.apiPayment(orderNo)
                    }, 1000)
                }
            })
        },
        routerGo(){
            this.$router.go(-1)
        },
        apiCoupon(){
          api.findYyCouponscodeInfos({
            openid: this.openId,
            status: this.cardIndex
          }).then(res=>{
            if( res.data.code == 200 && res.data.data){
              this.codeList = res.data.data
              this.codeList2 = res.data.data
              this.codeList.map(v=>{
                  var radio = [v.barcode,v.price]
                  v.radio = JSON.stringify(radio)
              })
            }else{
            //   this.$toast(res.data.msg)
            }
          })
        },
        radioBarCode(value){
            if(value == this.radio2){
                this.radio = null
                this.radio2 = null
                this.codeList = this.codeList2
                this.tip = ""
                this.price = Number(this.value.price)*100
            }else{
                this.radio2 = value
                var radio = JSON.parse(this.radio)
                var price = Number(this.value.price) - Number(radio[1])
                if( price <= 0 ){
                    this.tip = "优惠券已抵消商品，你只需支付0.01元"
                    this.price = 1
                }else{
                    this.tip = ""
                    this.price = price*100
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.nodeBtn{
    width: 50%;
    position: fixed;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
}
.radio_box{
    background: #fff;
    padding-left: 11px;
    >div{
        padding-bottom: 8px;
    }
}
.coupon_box{
    margin-top: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 11px 10px;
    color: #777;
    >i{
        font-size: 17px;
    }
    >span{
        margin-left: 5px;
        font-size: 13px;
        &.lijian{
            color: #333;
        }
    }
}
.describe{
    padding: 10px;
    display: flex;
    .describe_text{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >span{
            color: #f00;
            font-weight: 600;
            font-size: 15px;
        }
        .top{
            font-size: 14.5px;
            color: #000;
            font-weight: 600;
        }
        .text{
            display: flex;
            align-items: center;
            >span{
                font-size: 12px;
                color: #777;
            }
            >img{
                width: 15px;
                height: 15px;
                margin-right: 6px;
            }
        }
    }
    >img{
        width: 45%;
        height: 90px;
        border-radius: 5px;
        margin-right: 10px;
    }
}
.card_box{
    padding: 10px;
    background: #fff;
}
.icon_card{
    display: flex;
    align-items: center;
    color: #777;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
    >span{
        margin-left: 5px;
    }
}
.yuyuePurchase{
    background: #f0f0f0;
    height: 100vh;
    /deep/.van-submit-bar__button--danger{
        // background: linear-gradient(to right, #d2ae6d, #f3dea8);
    }
}
</style>