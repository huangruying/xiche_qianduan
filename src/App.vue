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
    // 微信授权
    this.wxSQ()
  },
  methods: {
     // 登录授权
    wxSQ(){
      var wxUserData = localStorage.getItem('wxUserData')
      if(!wxUserData){
        const code = this.getUrlParam("code");
        if(code){
          // this.code = code
        }else{
          this.authorization()
        }
      }
    },
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
    // 登录授权
    apiCode(code) {
      if (code) {
        api
          .wxUserInfo({
            code: code
          })
          .then(res => {
            var data = JSON.stringify(res)
            localStorage.setItem("wxUserData", data)
          })
      }
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
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
      }else if(index === 2){
        this.$router.push({name: 'merchantLogin'})
        this.show = false
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
            // console.log(res);
            this.onSale = false
            if(res.data.code == 200){
              var obj = res.data.data
              var obj = JSON.stringify(obj)
              localStorage.setItem('user',obj)
              this.$toast.success('登录成功！')
              this.mobileLogin = false
              this.show = false
              this.$router.push({name: 'cardVolume',query: {login: 1}})
              // this.$router.replace('/cardVolume')
              // this.$forceUpdate()
            }else{
              this.$toast(res.data.msg)
              this.$router.push({name: 'user'})
              this.mobileLogin = false
              this.show = false
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
              this.$toast.success('登录成功!')
              this.mobileLogin = false
              this.show = false
              this.$forceUpdate()
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
  border: 1.5px solid #07c160;
}
/deep/.van-field--error /deep/.van-field__control {
  color: #323233;
}
.bottom_text {
  text-align: center;
  color: #ccc;
  font-size: 9px;
  padding-bottom: 15px;
}
.title {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding: 12.5px 0;
}
.van-action-sheet__content {
  // height: 200px;
}
.van-action-sheet__cancel {
  font-size: 15px;
  height: 45px;
  line-height: 40px;
  color: #000;
}
.btn_box {
  padding: 5px 25px 5px;
  margin-bottom: 7.5px;
  .van-button--block {
    height: 40px;
    border-radius: 25px;
    .van-button__text {
      font-size: 16px;
      letter-spacing: 2.5px;
    }
  }
}
.van-dialog {
  padding: 0 15px;
}
.margin {
  margin-bottom: 10px;
  border-radius: 2.5px;
  padding: 0 25px;
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
    padding-left: 40px;
  }
  .border_ad {
    border-radius: 0.1rem;
  }
  .code_input {
    padding-right: 0.3rem;
  }
  .bule {
    width: 40%;
    height: 30px;
    background: #08a0ff;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 30px;
    &.hui {
      background: #999999;
    }
  }
}
</style>
