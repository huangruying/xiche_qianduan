<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive">
          <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>

    <!-- 绑定手机号 -->
    <van-action-sheet v-model="showPhone" title="绑定手机号" @close="close">
      <van-form :show-error="false" @submit="submitPhone" >
        <div class="margin" style="border-bottom: 1px solid #eee;">
          <van-field
            v-model="userNamePhone"
            placeholder="请输入真实姓名(绑定后不可更改)"
            type="text"
            class="margin_border"
            maxlength="8"
            :rules="[{ required: true, message: '姓名不能为空' }]"
          />
        </div>
        <div class="margin" style="border-bottom: 1px solid #eee;">
          <van-field
            v-model="phone"
            placeholder="请输入手机号码"
            type="number"
            class="margin_border"
            maxlength="11"
            :rules="[{ required: true, message: '手机号格式错误' },{ validator: mobileDialog, message: '手机号格式错误' }]"
          />
        </div>
        <div class="code margin">
          <div style="border-bottom: 1px solid #eee;">
            <van-field
              v-model="phoneCode"
              placeholder="请输入验证码"
              class="margin_border"
              maxlength="6"
              :rules="[{ required: true, message: '验证码不能为空' }]"
            />
          </div>
          <div class="bule" :class="tiems? 'hui' : ''" @click="getPhoneCode">{{phoneCodeText}}</div>
        </div>
        <div class="btn_box">
          <van-button type="primary" native-type="submit" block>确定</van-button>
        </div>
      </van-form>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet } from "vant";
import { sendMsg , signUpOrLogIn , businessUpOrLogIn , updateWeixinUserByOpenId } from "@/api/login";
import api from '@/api/merchantIndex'
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
      phoneCodeText: "获取验证码",
      timeId: null,
      tiems: false,
      tiems2: false,
      onSale: false,
      merchant: false,
      showPhone: false, // 绑定手机号弹窗
      phone: "",
      phoneCode: "",
      userNamePhone: ""
    };
  },
  created() {
    // 微信授权
    // this.wxSQ()
  },
  methods: {
    // 绑定手机号
    phoneDialog(){
      var openId = localStorage.getItem("wxUserId")  // 上线打开这个
      // var openId = 'o2mJowp-PE2-xcdFlbu6-DDHA8tY'
      if(!openId){
        this.wxSQ()
       }else{
         this.showPhone = true
       }
    },
    // 确定绑定手机号
    submitPhone(){
      // var openId = this.$store.getters.openId  
      var openId = localStorage.getItem("wxUserId")  // 上线打开这个
      // var openId = 'o2mJowp-PE2-xcdFlbu6-DDHA8tY'
      if(!openId){
        this.wxSQ()
       }else{
         updateWeixinUserByOpenId({
           openid: openId,
           phone: this.phone,  
           code: this.phoneCode,
           username: this.userNamePhone 
         }).then(res=>{
           if(res.data.code == 200){
            //  console.log(res);
             if(this.onSale){ 
              // 优惠券绑定手机号，回到优惠券
              this.onSale = false
              this.$router.push({name: 'cardVolume',query: {login: 1}})
             }else{
               // 贵宾厅个人中心绑定手机号
                localStorage.setItem("phone",res.data.phone)
                this.$router.push({name: "yuyueUser" , query: {
                  phone: 1
                }})
             }
             this.$toast.success('绑定成功!')
             localStorage.setItem("wxUserId", res.data.data.openid)
             this.showPhone = false
           }else{
             this.$toast(res.data.msg)
           }
         })
       }
    },
     // 登录授权
    wxSQ(){
        const code = this.getUrlParam("code");
        if(code){
          // 登录授权
          this.apiCode(code)
        }else{
          this.authorization()
        }
    },
    // 登录授权
    authorization() {
        const url = encodeURIComponent(location.href) // 获取#之前的当前路径
        window.location.href =
          "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1008eb4c001227c4&redirect_uri=" +
          url + 
          "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
    },
    // 登录授权
    apiCode(code) {
      if (code) {
        api
          .wxUserInfo({
            code: code
          })
          .then(res => {
            this.$store.dispatch('alterOpenId',res.data.openid)
            // var data = JSON.stringify(res.data)
            localStorage.setItem("wxUserId", res.data.openid)
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
    // 洗车优惠卷的弹出登录
    login(){
      var openId = localStorage.getItem("wxUserId")  // 上线打开这个
      // var openId = 'o2mJowp-PE2-xcdFlbu6-DDHA8tY'
       if(!openId){
        this.wxSQ()
       }else{
          this.showPhone = true
          this.onSale = true  // 这是优惠卷的弹出登录绑定手机号，若取消登录应回到洗车首页
       }
    },
    // 取消绑定手机号
    close(){
      if(this.onSale){
        // 优惠卷的弹出登录
        this.onSale = false
        this.$router.push({name: 'index'})
      }
    },
    mobileDialog() {
      var re = /^1\d{10}$/;
      let str = this.phone;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    async getPhoneCode(){
      if (this.tiems2) {
        return false;
      }
      if (this.mobileDialog()) {
        var res = await sendMsg({
          phone: this.phone //手机号
        });
        if (res.data.code == 400) {
          this.$toast(res.data.msg);
        } else if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          var num = 60;
          var timeId = this.timeId;
          timeId = setInterval(() => {
            if (num === 0) {
              this.phoneCodeText = "获取验证码";
              clearInterval(timeId);
              this.tiems2 = false;
            } else {
              this.phoneCodeText = "请等待" + num--;
              this.tiems2 = true;
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
    line-height: 38px;
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
    height: 45px;
    background: #08a0ff;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 45px;
    &.hui {
      background: #999999;
    }
  }
}
</style>
