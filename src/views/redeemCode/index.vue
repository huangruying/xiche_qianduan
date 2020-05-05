<template>
  <div class="redeemCode">
    <van-form @submit="useGeneralCoupon" :show-error="false">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>兑换码核销</span>
      </div>
      <van-cell-group>
         <van-field label="兑换码" v-model="redeemCode" placeholder="请输入兑换码" :rules="[{ required: true, message: '请输入兑换码!' }]"/>
         <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="" class="img" @click="WxAdd">
     </van-cell-group>
     <van-cell-group>
        <van-field
            v-model="licensePlate"
            label="车牌号"
            placeholder="请输入车牌号"
            class="input"
            :rules="[{ required: true, message: '请输入车牌号!' }]"
        />
        <div class="cardTitle" @click="show = true">
            <span>{{plate}}</span>
            <i class="iconfont icon-xiala"></i>
        </div>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="default" block @click="routerGo" style="margin-right:30px;">返回</van-button>
      <van-button type="info" block native-type="submit">
        <span style="color:#fff;">立即核销</span>
      </van-button>
    </div>
    <div class="explain_box">
        <div class="title">使用规则：</div>
        <p class="one">1.车主可在有效期内持兑换码到指定商家消费；</p>
        <p>2.商家可输入有效兑换码创建订单，并在订单管理查看信息；</p>
        <p>3.车主凭兑换码成功创建订单后无需再向商家支付额外费用，小鱼养车与商家自行结算；</p>
      </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="车牌选择" :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    </van-form>
  </div>
</template>

<script>
import { cardTitle , letter } from '@/utils/plateNumber'
import api from "@/api/merchantIndex";
export default {
    data (){
        return{
            redeemCode: "",
            licensePlate: "",
            signature: "",
            timestamp: "",
            noncestr: "",
            plate: "粤A",
            show: false,
            columns: [
                // 第一列
                {
                values: cardTitle,
                defaultIndex: 2,
                },
                // 第二列
                {
                values: letter,
                defaultIndex: 1,
                },
            ],
        }
    },
    created() {
      api.getParameter({url: location.href}).then(res=>{
              this.noncestr = res.data.noncestr
              this.timestamp = res.data.timestamp
              this.signature = res.data.signature
      })
    },
    mounted(){
      var { use } = this.$route.query
      if(use.indexOf(",") == -1){
        this.redeemCode = use
      }else{
        var as = use.split(',')
        this.redeemCode = as[1]
      }
      // 商家登录
      var obj = localStorage.getItem("userMerchant");
      if(obj === 'undefined'){
      }else{
        var obj = JSON.parse(obj);
        if (obj === null) {
          this.$parent.login(1);
        } else {
        }
      }
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }
        },
        routerGo(){
            this.$router.go(-1)
        },
        onCancel(){
           this.show = false
        },
        onConfirm(value, index){
           this.show = false
           this.plate = value[0] + value[1]
        },
        useGeneralCoupon(){
          api.useGeneralCoupon({
            couponCode: this.redeemCode,
            licensePlate: this.plate + this.licensePlate
          }).then(res=>{
             if(res.data.code == 200){
               this.$toast('核销成功！')
               this.$router.push({name: 'merchantIndex'})
             }else{
               this.$toast(res.data.msg)
             }
          })
        },
        WxAdd() {
          var this3 = this
          // alert('时间戳' + this.timestamp)
          // alert('随机字符串' + this.noncestr)
          // alert('签名' + this.signature)
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
          // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
          // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
          wx.ready(function(res) {
            // alert('配置成功' + res)
            wx.checkJsApi({
              // 判断当前客户端版本是否支持指定JS接口
              jsApiList: ["scanQRCode"],
              success: function(res) {
                // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
                // console.log(res);
                if (res.checkResult.scanQRCode === true) {
                  wx.scanQRCode({
                    // 微信扫一扫接口
                    desc: "scanQRCode desc",
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                      const getCode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                      this3.$router.push({ name: 'redeemCode', query: {
                        use: getCode
                      }})
                    }
                  })
                } else {
                  this3.$toast("抱歉，当前客户端版本不支持扫一扫");
                }
              },
              fail: function(res) {
                this3.$toast("扫一扫调用失败！");
                // 检测getNetworkType该功能失败时处理
              }
            });
          });
          /* 处理失败验证 */
          wx.error(function(res) {
            // alert('配置失败' + res)
            this3.$toast("服务器炸啦！");
            // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
            // console.log('微信sdk配置失败！');
          });
        // });
      },
    }
}
</script>

<style lang="less" scoped>
.explain_box {
  padding: 12px 18px;
  .title {
    color: #111111;
    font-size: 17px;
    font-weight: bold;
  }
  > p {
    color: #5e5e5e;
    line-height: 25px;
    // margin-top: 23px;
    &.one {
      margin-top: 5px;
    }
  }
}
.btn_box {
  display: flex;
  padding: 30px 15px;
  /deep/.van-button--block {
    height: 35px;
    line-height: 34px;
    color: #079fd5;
    font-size: 16px;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 4px;
  }
}
/deep/.van-ellipsis{
  font-size: 17px;
}
/deep/.van-picker__toolbar{
    height: 40px;
    line-height: 40px;
    .van-picker__cancel,.van-picker__title,.van-picker__confirm{
      font-size: 14px;
    }
  }
.cardTitle{
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background:rgba(243,243,243,1);
    border-radius: 5px;
    position: absolute;
    top: 12px;
    left: 70px;
  }
.van-field{
    display: flex;
    align-items: center;
    padding: 10px 12.5px;
}
/deep/.van-cell__value{
    padding-left: 10px;
}
.input /deep/.van-cell__value{
    padding-left: 70px;
}
.img{
    width: 27.5px;
    height: 27.5px;
    position: absolute;
    right: 14px;
    top: 6.5px;
}
</style>