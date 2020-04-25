<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 登录提示 -->
    <van-action-sheet v-model="show" title cancel-text="取消">
      <div class="title">为了你的账号安全，请绑定手机号</div>
      <div class="content">
        <div class="btn_box">
          <van-button type="primary" block @click="submit(0)">微授权信登录</van-button>
        </div>
        <div class="btn_box">
          <van-button type="primary" plain block @click="submit(1)">其他手机号登录</van-button>
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
          <van-button type="primary" block native-type="submit">登录/注册</van-button>
        </div>
        <div class="bottom_text">若手机号未注册，系统会自动帮你注册</div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet } from "vant";
import { sendMsg , signUpOrLogIn } from "@/api/login";
Vue.use(ActionSheet);
import wx from 'weixin-js-sdk'
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
      isRouterAlive: true, //控制视图是否显示的变量
      show: false, // 登录提示
      mobileLogin: false, // 登录弹窗
      mobileCode: "获取验证码",
      timeId: null,
      tiems: false,
      code: "",
      mobile: "",
      userName: ""
    };
  },
  created() {
    this.configWx()
  },
  methods: {
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
    login(){
      this.show = true
    },
    configWx(){
      // const APPID = 'wx4744f4ba8d477d86';
      // const MCHID = '1375298702';
      // const KEY = 'a8GPtczRuH0m8Ntk11zMWQJNuZIPYOsg';
      // const APPSECRET = '0743d00b723576aeb083fe9296785a88';

      wx.config({
        debug: false, // true:调试时候弹窗
        appId: 'wx4744f4ba8d477d86', // 微信appid
        timestamp: '1375298702', // 时间戳
        nonceStr: 'a8GPtczRuH0m8Ntk11zMWQJNuZIPYOsg', // 随机字符串
        signature: '0743d00b723576aeb083fe9296785a88', // 签名
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'onMenuShareTimeline', // 分享到朋友圈接口
          'onMenuShareAppMessage', //  分享到朋友接口
          'onMenuShareQQ', // 分享到QQ接口
          'onMenuShareWeibo' // 分享到微博接口
        ]
      })
    },
    onFailed(errorInfo) {
      signUpOrLogIn({
        phone: this.mobile,
        code: this.code,
        name: this.userName
      }).then(res=>{
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
        console.log(res);
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
  height: 300px;
}
.van-action-sheet__cancel {
  font-size: 30px;
  height: 70px;
  line-height: 60px;
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
