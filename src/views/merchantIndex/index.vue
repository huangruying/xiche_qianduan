<template>
  <div class="merchantIndex">
    <!-- merchantIndex -->
    <div class="slideshow">
      <img src="@/assets/merchantIndex/lunbo.png" alt />
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
      <!-- <div class="box" @click="tabsIndex(2)">
              <img src="@/assets/merchantIndex/icon-3@2x.png" alt="">
              <span>机油检查</span>
      </div>-->
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
        <div class="box" @click="userContent(2)">
          <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt />
          <span>手动核销</span>
        </div>
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
      code: ""
    };
  },
  created() {
    // 微信授权
    const code = this.getUrlParam("code");
    if(code){
      this.code = code
      alert("这是code---" + this.code);
    }else{
      // this.authorization()
    }
    this.apiCode(code);
    // 商家登录
    var obj = localStorage.getItem("userMerchant");
    var obj = JSON.parse(obj);
    if (obj === null) {
      this.$parent.login(1);
    } else {
    }
  },
  methods: {
    // 登录授权
    authorization() {
      //获取url中参数
      const code = this.getUrlParam("code");
      if (!code) {
        // const url = encodeURIComponent(location.href.split("#")[0]); // 获取#之前的当前路径
        const url = encodeURIComponent(location.href) // 获取#之前的当前路径
        window.location.href =
          "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1008eb4c001227c4&redirect_uri=" +
          url + 
          "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
      }
    },
    apiCode(code) {
      if (code) {
        api
          .wxUserInfo({
            code: code
          })
          .then(res => {
            // {"msg":"成功", "code":"200", "noncestr":"随机数", "timestamp":"时间戳","signature":"签名"}
            this.noncestr = res.data.noncestr
            this.timestamp = res.data.timestamp
            this.signature = res.data.signature
            // var data = JSON.stringify(res)
            // sessionStorage.setItem("wxUserData", data)
          });
      }
    },
    WxAdd() {
      // api.getParameter({code:this.code}).then(res => {
        // console.log(res);
        // var data = res.data;
        alert('签名--' + this.signature)
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
        wx.ready(function() {
         alert("微信sdk配置成功！ " + res);
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
                    alert(res);
                    const getCode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                  }
                });
              } else {
                alert("抱歉，当前客户端版本不支持扫一扫");
              }
            },
            fail: function(res) {
              // 检测getNetworkType该功能失败时处理
              alert("fail" + res);
            }
          });
        });
        /* 处理失败验证 */
        wx.error(function(res) {
          // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
          alert("微信sdk配置失败！ " + res.errMsg);
          // console.log('微信sdk配置失败！');
        });
      // });
    },
    // 微信扫一扫
    configWx() {
      this.WxAdd();
      // const APPID = 'wx4744f4ba8d477d86';
      // const MCHID = '1375298702';
      // const KEY = 'a8GPtczRuH0m8Ntk11zMWQJNuZIPYOsg';
      // const APPSECRET = '0743d00b723576aeb083fe9296785a88';
    },
    // 微信地理位置
    wxRegister() {
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
           alert("微信sdk配置成功！ " + res);
          wx.getLocation({
            success: function(res) {
              console.log(res);
              var pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              var wxaccuracy = res.accuracy; // 位置精度
              alert("纬度", pointY);
              alert("数据", res);
              // var map = new BMap.Map("allmap");
              // var point = new BMap.Point(pointX,pointY);
              // var gc = new BMap.Geocoder();
              // gc.getLocation(point, function(rs){
              //    var addComp = rs.addressComponents;
              //     if(wxaccuracy==30){
              //         alert(addComp.city);
              //     }
              // });
              // 逆向地理编码方法
              AMap.plugin("AMap.Geocoder", function() {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: "010"
                });
                var lnglat = [116.396574, 39.992706];
                geocoder.getAddress(lnglat, function(status, result) {
                  if (status === "complete" && result.info === "OK") {
                    // result为对应的地理位置详细信息
                  }
                });
              });
            },
            cancel: function(res) {
              alert("用户拒绝授权获取地理位置");
              console.log("用户拒绝授权获取地理位置");
            }
          });
        });
        /* 处理失败验证 */
        wx.error(function(res) {
          // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
          alert("微信sdk配置失败！ " + res.errMsg);
          // console.log('微信sdk配置失败！');
        });
      // });
    },
    UnionID() {
      // let wxConfig = encodeURIComponent(window.location.href.split('#')[0])
      // let url = encodeURIComponent(DefaultConfig.redirectUriWx);  // 注意一定要encodeURIComponent
      //  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4744f4ba8d477d86&redirect_uri=${url}&response_type=code&scope=${DefaultConfig.loginWay}&state=#wechat_redirect`
      // console.log(wxConfig);
    },
    async tabsIndex(index) {
      if (index === 0) {
        // this.$router.push({name: 'information'})
      } else if (index === 1) {
        this.$router.push({ name: "relation" });
      } else if (index === 2) {
        this.$router.push({ name: "oil" });
      }
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    userContent(index) {
      if (index === 0) {
        this.wxRegister(); // 地理位置调试
        // this.$router.push({name: 'userAccount'})
      } else if (index === 1) {
        this.$router.push({ name: "orderManagement" });
      } else if (index === 2) {
        this.$router.push({ name: "redeemCode" });
      } else if (index === 3) {
        this.configWx(); // 微信扫一扫
      } else if (index === 5) {
        // this.$router.push({name: 'platform'})
      } else {
        this.configWx();
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
      margin: 12px 0;
      display: flex;
      // float: left;
      flex-direction: column;
      align-items: center;
      padding: 33px 0;
      width: 33.3%;
      &.border {
        border-right: 1px solid #efefef;
      }
      > img {
        width: 87px;
        height: 87px;
      }
      > span {
        font-size: 24px;
        color: #000;
        display: block;
        margin-top: 13px;
      }
    }
  }
  .title_box_box {
    display: flex;
    padding: 5px 0;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 22px;
      border-left: 10px solid #2f7ffa;
    }
    /deep/.van-button--normal {
      margin-right: 10px;
      padding: 8px 30px;
      height: 60px;
      border-radius: 10px;
      .van-button__text {
        font-size: 24px;
      }
    }
  }
}
.tabs {
  background: #fff;
  height: 195px;
  margin-top: 30px;
  margin-bottom: 30px;
  .box {
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 33px 0;
    width: 25%;
    > img {
      width: 87px;
      height: 87px;
    }
    > span {
      font-size: 24px;
      color: #000;
      display: block;
      margin-top: 13px;
    }
  }
}
.slideshow {
  width: 100%;
  height: 364px;
}
.merchantIndex {
  background: #f7f7f7;
  height: 100vh;
}
</style>