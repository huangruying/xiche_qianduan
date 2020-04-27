<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 登录提示 -->
    <van-action-sheet v-model="show" title cancel-text="取消" @close="closeLogin">
      <div class="title">为了你的账号安全，请绑定手机号</div>
      <div class="content">
        <!-- <div class="btn_box">
          <van-button type="primary" block @click="submit(0)">微信授权登录</van-button>
        </div> -->
        <div class="btn_box">
          <van-button type="primary" block @click="submit(1)">手机号登录</van-button>
        </div>
        <div class="btn_box">
          <van-button type="primary" plain block @click="submit(2)" v-if="!text">商家注册</van-button>
        </div>
      </div>
    </van-action-sheet>
    <!-- 登录弹窗 -->
    <van-dialog
      v-model="mobileLogin"
      :showConfirmButton="false"
      width="80%"
      :closeOnClickOverlay="true" >
      <van-form @submit="onFailed" :show-error="false">
        <div class="title">验证手机号</div>
        <div class="margin" style="border-bottom: 1px solid #eee;">
          <van-field
            v-model="userName"
            placeholder="请输入姓名"
            type="text"
            class="margin_border"
            maxlength="11"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
        </div>
        <div class="margin" style="border-bottom: 1px solid #eee;">
          <van-field
            v-model="mobile"
            placeholder="请输入手机号码"
            type="tel"
            class="margin_border"
            maxlength="11"
            :rules="[{ required: true, message: '手机号格式错误' },{ validator: mobileDialog, message: '手机号格式错误' }]"
          />
        </div>
        <div class="code margin">
          <div style="border-bottom: 1px solid #eee;">
            <van-field
              v-model="code"
              placeholder="请输入验证码"
              class="margin_border"
              maxlength="6"
              :rules="[{ required: true, message: '验证码不能为空' }]"
            />
          </div>
          <div class="bule" :class="tiems? 'hui' : ''" @click="getCode">{{mobileCode}}</div>
        </div>
        <div class="btn_box">
          <van-button type="primary" block native-type="submit">登录<span v-if="text">/注册</span></van-button>
        </div>
        <div class="bottom_text" v-if="text">若手机号未注册，系统会自动帮你注册</div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet } from "vant";
import { sendMsg , signUpOrLogIn , businessUpOrLogIn } from "@/api/login";
Vue.use(ActionSheet);
export default {
  name: "app",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true, // 控制视图是否显示的变量
      show: false, // 登录提示
      mobileLogin: false, // 登录弹窗
      mobileCode: "获取验证码",
      timeId: null,
      tiems: false,
      onSale: false,
      merchant: false,
      text: false,
      code: "",
      mobile: "",
      userName: "",
    };
  },
  created() {
    // this.configWx()
  },
  methods: {
    configWx(){
      // const APPID = 'wx4744f4ba8d477d86';
      // const MCHID = '1375298702';
      // const KEY = 'a8GPtczRuH0m8Ntk11zMWQJNuZIPYOsg';
      // const APPSECRET = '0743d00b723576aeb083fe9296785a88';

      wx.config({
        debug: true, // true:调试时候弹窗
        appId: 'wx4744f4ba8d477d86', // 微信appid
        timestamp: '1375298702', // 时间戳
        nonceStr: 'a8GPtczRuH0m8Ntk11zMWQJNuZIPYOsg', // 随机字符串
        signature: '0743d00b723576aeb083fe9296785a88', // 签名
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'onMenuShareTimeline', // 分享到朋友圈接口
          'onMenuShareAppMessage', //  分享到朋友接口
          'onMenuShareQQ', // 分享到QQ接口
          'onMenuShareWeibo', // 分享到微博接口
          'scanQRCode', // 微信扫一扫功能
        ]
      })
        wx.ready(function () {
          console.log('微信sdk配置成功！');
        // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
        // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
        wx.checkJsApi({ // 判断当前客户端版本是否支持指定JS接口
          jsApiList: [
            'scanQRCode'
          ],
          success: function (res) { // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.scanQRCode === true) {
              wx.scanQRCode({ // 微信扫一扫接口
                desc: 'scanQRCode desc',
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                  const getCode = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              }
            })
          } else {
            alert('抱歉，当前客户端版本不支持扫一扫')
            }
          },
          fail: function (res) { // 检测getNetworkType该功能失败时处理
            alert('fail' + res)
          }
        })
      })

      /* 处理失败验证 */
      wx.error(function (res) {
      // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
        alert('配置验证失败: ' + res.errMsg)
        console.log('微信sdk配置失败！');
      })
    },
    reload() {
      //  let url = window.location.href.split('#')[0]
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
    submit(index) {
      if (index === 0) {
      } else if (index === 1) {
        this.mobileLogin = true;
      }
    },
    login(num){
      this.show = true
      if(num === 0){
        // 这是优惠卷的弹出登录，若取消登录应回到首页
        this.onSale = true
        this.text = true
      }else if(num === 1){
        // 这是商家的弹出登录
        this.merchant = true
        this.text = false
      }
    },
    // 取消登录
    closeLogin(){
      if(this.onSale){
        // 优惠卷的弹出登录
        this.$router.push({name: 'index'})
        this.onSale = false
      }
      if(this.merchant){
        // 商家的弹出登录
        
      }
    },
    onFailed(errorInfo) {
      if(this.onSale){
          signUpOrLogIn({
            phone: this.mobile,
            code: this.code,
            name: this.userName
          }).then(res=>{
            this.onSale = false
            if(res.data.code == 200){
              var obj = res.data.data
              var obj = JSON.stringify(obj)
              localStorage.setItem('user',obj)
              this.$toast.success('登录成功！')
              this.mobileLogin = false
              this.show = false
            }else{
              this.$toast(res.data.msg)
            }
          })
      }else{
        businessUpOrLogIn({
            phone: this.mobile,
            code: this.code,
            name: this.userName
          }).then(res=>{
            this.merchant = false
            if(res.data.code == 200){
              var obj = res.data.data
              var obj = JSON.stringify(obj)
              localStorage.setItem('userMerchant',obj)
              this.$toast.success('登录成功！')
              this.mobileLogin = false
              this.show = false
            }else{
              this.$toast(res.data.msg)
            }
          })
      }
    },
    mobileDialog() {
      var re = /^1\d{10}$/;
      let str = this.mobile;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    async getCode() {
      if (this.tiems) {
        return false;
      }
      if (this.mobileDialog()) {
        var res = await sendMsg({
          phone: this.mobile //手机号
        });
        if (res.data.code == 400) {
          this.$toast(res.data.msg);
        } else if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          var num = 60;
          var timeId = this.timeId;
          timeId = setInterval(() => {
            if (num === 0) {
              this.mobileCode = "获取验证码";
              clearInterval(timeId);
              this.tiems = false;
            } else {
              this.mobileCode = "请等待" + num--;
              this.tiems = true;
            }
          }, 1000);
        }
      } else {
        this.$toast('手机号格式错误')
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-button--primary{
  border: 3px solid #07c160;
}
/deep/.van-field--error /deep/.van-field__control {
  color: #323233;
}
.bottom_text {
  text-align: center;
  color: #ccc;
  font-size: 19px;
  padding-bottom: 30px;
}
.title {
  text-align: center;
  font-size: 31px;
  font-weight: bold;
  padding: 25px 0;
}
.van-action-sheet__content {
  // height: 200px;
}
.van-action-sheet__cancel {
  font-size: 30px;
  height: 90px;
  line-height: 80px;
  color: #000;
}
.btn_box {
  padding: 10px 50px 10px;
  .van-button--block {
    height: 80px;
    border-radius: 50px;
    .van-button__text {
      font-size: 32px;
      letter-spacing: 5px;
    }
  }
}
.van-dialog {
  padding: 0 30px;
}
.margin {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 0 50px;
  &.code {
    padding: 0;
  }
  .margin_border {
    border-radius: 0.3rem;
  }
}
.code {
  width: 100%;
  display: flex;
  .margin_border {
    padding-left: 60px;
  }
  .border_ad {
    border-radius: 0.1rem;
  }
  .code_input {
    padding-right: 0.3rem;
  }
  .bule {
    width: 40%;
    height: 60px;
    background: #08a0ff;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 60px;
    &.hui {
      background: #999999;
    }
  }
}
</style>
