<template>
  <div class="merchantIndex">
    <!-- merchantIndex -->
    <div class="slideshow">
      <img src="https://dot-bucket.oss-cn-shenzhen.aliyuncs.com/2020-06-09/1.jpeg" alt />
    </div>
    <div class="tabs clearfix">
      <div class="box" @click="tabsIndex(0)">
        <img src="@/assets/merchantIndex/icon-1@2x.png" alt />
        <span>养车资讯</span>
      </div>
      <div class="box" @click="tabsIndex(1)">
        <img src="@/assets/merchantIndex/icon-2@2x.png" alt />
        <span>联系我们</span>
      </div>
      <div class="box" @click="tabsIndex(2)">
        <img src="@/assets/merchantIndex/tuichu.jpg" alt />
        <span>退出登录</span>
      </div>
      <!-- <div class="box" @click="haha">
          <img src="@/assets/merchantIndex/icon-3@2x.png" alt="">
          <span>机油检查</span>
      </div> -->
    </div>
    <div class="shan_hu">
      <div class="title_box_box">
        <div class="title">服务商中心</div>
        <!-- <van-button type="default">退出</van-button> -->
      </div>
      <div class="content_tabs clearfix">
        <div class="box border" @click="userContent(0)">
          <img src="@/assets/merchantIndex/grzh-icon@2x.png" alt />
          <span>个人账户</span>
        </div>
        <div class="box border" @click="userContent(1)">
          <img src="@/assets/merchantIndex/ddgl-icon@2x.png" alt />
          <span>订单管理</span>
        </div>
        <!-- <div class="box" @click="userContent(2)">
          <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt />
          <span>手动核销</span>
        </div> -->
        <div class="box border" @click="userContent(3)">
          <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt />
          <span>扫码核销</span>
        </div>
        <!-- <div class="box border" @click="userContent(4)">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>商务核销</span>
              </div>
              <div class="box" @click="userContent(5)">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>平台核销</span>
        </div>-->
      </div>
    </div>
    <span class="ccc">版权所有</span>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import axios from "@/utils/myaxios";
import api from "@/api/merchantIndex";
export default {
  data() {
    return {
      code: "",
      noncestr: "",
      timestamp: "",
      signature: ""
    };
  },
  created() {
    api.getParameter({url: location.href}).then(res=>{
      this.noncestr = res.data.noncestr
      this.timestamp = res.data.timestamp
      this.signature = res.data.signature
    })
  },
  activated(){
      // 页面缓存时走这里
      api.getParameter({url: location.href}).then(res=>{
        this.noncestr = res.data.noncestr
        this.timestamp = res.data.timestamp
        this.signature = res.data.signature
      })
  },
  methods: {
    haha(){
      //  localStorage.removeItem("userMerchant")
      // api.weChatUnifiedorder({
      //   money: 1
      // }).then(res=>{
      //   alert(res.data)
      //   window.location.href = res.data
      // })
      // api.wxOfficialPay()
      var this2 = this
      var openId = this.$store.getters.openId
      var pid = "1"
      api.wxOfficialPay({openId: openId,pid}).then(res=>{
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
            "openLocation", //微信地理位置
            "chooseWXPay" // 微信支付
          ]
        })
        wx.error(function(res) {
          this.$toast("服务器炸啦！")
          // console.log('微信sdk配置失败！');
        });
         wx.ready(function(){
             wx.chooseWXPay({
               appId: res.data.data.appid,
               timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
               nonceStr: res.data.data.nonce_str, // 支付签名随机串，不长于 32 
               package: res.data.data.packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
               signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
               paySign: res.data.data.sign, // 支付签名
               success: function (res) {
                  //  跳转到支付成功页面有这个页面
                  //  $this.$router.push({
                  //      path: "/success_page",
                  //      name:"success_page"
                  //  })
                  var res = JSON.stringify(res)
                  // alert('支付成功' + res)
               },
               cancel: function (res) { //提示引用的是mint-UI里toast
                   this2.$toast('已取消支付');
               },
               fail: function (res) {
                   this2.$toast('支付失败，请重试');
               }
             })
         })
      })
    },
    WxAdd() {
        var this2 = this
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
                    if(getCode.indexOf(",") == -1){
                    }else{
                      var as = getCode.split(',')
                      getCode = as[1]
                    }
                    api.getDotsTypeInfo({couponCode: getCode}).then(res=>{
                         if(res.data.code == 200){
                           var text = res.data.data
                           if(!text){
                             text = "无法识别~"
                           }else{
                             text = text + '优惠券'
                           }
                            this2.$dialog.confirm({
                              title: '券码信息',
                              message: text,
                            }).then(() => {
                              this2.$toast.loading({
                                message: '加载中...',
                                forbidClick: true,
                              });
                              var obj = localStorage.getItem("userMerchant");
                              var obj = JSON.parse(obj)
                              api.useGeneralCoupon({
                                  couponCode: getCode,
                                  // licensePlate: this.plate + this.licensePlate,
                                  dotUserId: obj.id,
                                  dotId: obj.dotId
                                }).then(res=>{
                                  if(res.data.code == 200){
                                    this2.$toast.success('核销成功！')
                                  }else{
                                    this2.$toast.fail(res.data.msg)
                                  }
                                })
                            }).catch(() => {
                               this2.$toast.fail('您已取消核销该券码')
                            })
                         }else{
                           this2.$dialog.alert({
                              message: '券码查询失败！',
                            }).then(() => {
                              // on close
                            })
                         }
                    })
                  }
                })
              } else {
                this2.$toast("抱歉，当前客户端版本不支持扫一扫");
              }
            },
            fail: function(res) {
              this2.$toast("扫一扫调用失败！");
              // 检测getNetworkType该功能失败时处理
            }
          });
        });
        /* 处理失败验证 */
        wx.error(function(res) {
          this.$toast("服务器炸啦！");
          // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
        });
    },
    async tabsIndex(index) {
      if (index === 0) {
        // this.$router.push({name: 'information'})
      } else if (index === 1) {
        this.$router.push({ name: "relation" });
      } else if (index === 2) {
        // this.$router.push({ name: "oil" });
        this.$dialog.confirm({
          title: '确定退出登录？'
        })
          .then(() => {
            localStorage.removeItem("userMerchant")
            this.$router.push({name: "login"})
            this.$toast("退出登录成功！")
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    userContent(index) {
      if (index === 0) {
        // this.$router.push({name: 'userAccount'})
      } else if (index === 1) {
          this.$router.push({ name: "orderManagement" })
      } else if (index === 2) {
          this.$router.push({ name: "redeemCode" })
      } else if (index === 3) {
          this.WxAdd() // 微信扫一扫
      } else if (index === 5) {
        // this.$router.push({name: 'platform'})
      } else {
        // this.configWx();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shan_hu {
  background: #fff;
  .content_tabs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .box {
      margin: 6px 0;
      display: flex;
      // float: left;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
      width: 33.3%;
      &.border {
        border-right: 1px solid #efefef;
      }
      > img {
        width: 43px;
        height: 43px;
      }
      > span {
        font-size: 12px;
        color: #000;
        display: block;
        margin-top: 7px;
      }
    }
  }
  .title_box_box {
    display: flex;
    padding: 2.5px 0;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 20px;
      line-height: 20px;
      padding-left: 11px;
      border-left: 5px solid #2f7ffa;
    }
    /deep/.van-button--normal {
      margin-right: 5px;
      padding: 4px 15px;
      height: 30px;
      border-radius: 5px;
      .van-button__text {
        font-size: 12px;
      }
    }
  }
}
.tabs {
  background: #fff;
  height: 98px;
  margin-top: 15px;
  margin-bottom: 15px;
  .box {
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    width: 25%;
    > img {
      width: 44px;
      height: 44px;
      border-radius: 10px;
    }
    > span {
      font-size: 12px;
      color: #000;
      display: block;
      margin-top: 7px;
    }
  }
}
.slideshow {
  width: 100%;
  height: 182px;
}
.merchantIndex {
  background: #f7f7f7;
  height: 100vh;
}
</style>