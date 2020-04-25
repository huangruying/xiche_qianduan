<template>
  <div class="login">
    <!-- <div class="login_head">
      <img src="../assets/index/jiantou@2x (2).png" alt @click="router_go" />
      <div class="zhuce">注册</div>
      <div class="div"></div>
    </div>
    <div class="text">欢迎注册成为代理</div>
    <div class="input">
      <van-cell-group class="margin">
        <van-field
          v-model="mobile"
          placeholder="请输入手机号码"
          type="tel"
          class="margin_border"
          maxlength="11"
          @blur="mobile_11"
        />
      </van-cell-group>
      <div class="code margin">
        <van-cell-group class="code_input border_ad">
          <van-field
            v-model="code"
            placeholder="请输入验证码"
            class="margin_border"
            maxlength="6"
          />
        </van-cell-group>
        <div class="bule" :class="tiems? 'hui' : ''" @click="get_code">{{yanz_zhen_ma}}</div>
      </div>
      <van-cell-group class="margin">
        <van-field
          v-model="password"
          :type="password_text"
          placeholder="请输入密码"
          class="margin_border"
        />
        <img src="@/assets/yincang@2x.png" alt @click="visible" v-if="image" />
        <img src="@/assets/xianshi@2x.png" alt @click="visible" v-if="images" />
      </van-cell-group>
    </div>
    <div class="displ">
      <van-checkbox class="rigth" v-model="checked" icon-size=".2rem" shape="square">
        <span class="colo">阅读并同意</span>
        <a href="javascript:;">《用户协议》</a>
        <span class="colo">和</span>
        <a href="javascript:;">《隐私政策》</a>
      </van-checkbox>
      <span class="colo_zuo" @click="push_login">已有账号？去登录</span>
    </div>
    <div class="zhu_ce" :class="checked==false? 'zhu_ce_hui': '' " @click="zhu_ce">注册</div> -->
  </div>
</template>

<script>
// import { Dialog } from "vant";
// import { getCode, checkCode, register_index } from "@/apis/index";
export default {
  // components: {
  //   [Dialog.Component.name]: Dialog.Component
  // },
  // data() {
  //   return {
  //     image: true,
  //     images: false,
  //     mobile: "",
  //     code: "",
  //     password: "",
  //     checked: false,
  //     code_yao: "",
  //     password_text: "password",
  //     yanz_zhen_ma: "获取验证码",
  //     timeId: null,
  //     tiems: false
  //   };
  // },
  // mounted() {
  //   var code = this.$route.params.code;
  //    if(code == undefined){
  //     this.$router.push({name:'Invitation'})
  //   }
  //   var data_list = this.$route.params.data_list;
  //    this.code_yao = code.code;
  // },
  // methods: {
  //   visible() {
  //     if (this.password_text == "password") {
  //       this.password_text = "text";
  //     } else {
  //       this.password_text = "password";
  //     }
  //     this.image = !this.image;
  //     this.images = !this.images;
  //   },
  //   push_login() {
  //     this.$router.push({ name: "log_in" });
  //   },
  //   async get_code() {
  //     if (this.tiems) {
  //       return false;
  //     }
  //     var res = await getCode({
  //       mobile: this.mobile, //手机号
  //       type: 101 //类型(101注册；102登录；103找回密码)
  //     });
  //     if (res.data.code == 400) {
  //       this.$toast(res.data.msg);
  //     } else if (res.data.code == 200) {
  //       this.$toast.success(res.data.msg);
  //       var num = 60;
  //       var timeId = this.timeId;
  //       timeId = setInterval(() => {
  //         if (num === 0) {
  //           this.yanz_zhen_ma = "获取验证码";
  //           clearInterval(timeId);
  //           this.tiems = false;
  //         } else {
  //           this.yanz_zhen_ma = "请等待" + num--;
  //           this.tiems = true;
  //         }
  //       }, 1000);
  //     }
  //   },
  //   mobile_11() {
  //     var re = /^1\d{10}$/;
  //     let str = this.mobile;
  //     if (re.test(str)) {
  //     } else {
  //       this.$toast("手机号码不合法");
  //     }
  //   },
  //   async zhu_ce() {
  //     if (this.checked == true) {
  //       var res = await register_index({
  //         mobile: this.mobile, //手机号
  //         type: 101, //类型，此值固定
  //         code: this.code, //手机短信验证码；注，获取短信验证码就查看 agent/sms/getCode
  //         password: this.password, //设置密码
  //         invitationCode: this.code_yao //邀请码
  //       });
  //       if (res.data.code == 200) {
  //         this.$toast({
  //           message: "注册成功！",
  //           icon: "like-o"
  //         });
  //         this.$router.push({ name: "log_in" });
  //       } else {
  //         this.$toast(res.data.msg);
  //       }
  //     } else {
  //       this.$toast("请认证阅读并同意勾选用户协议和隐私政策");
  //     }
  //   },
  //   router_go() {
  //     this.$router.go(-1);
  //   }
  // }
};
</script>

<style lang="less" scoped>
.zhu_ce {
  background: #08a0ff;
  height: 0.9rem;
  width: 80%;
  margin: 0.3rem auto;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.36rem;
  color: #fff;
  &.zhu_ce_hui {
    background: #999;
  }
}
.displ {
  display: flex;
  justify-content: space-between;
  font-size: 0.2rem;
  margin-right: 0.3rem;
  color: #666;
  align-content: center;
}
.rigth {
  font-size: 0.2rem;
  margin-left: 0.3rem;
  position: relative;
  top: -0.1rem;
  .colo {
    color: #666;
  }
  a {
    color: #08a0ff;
  }
}
.text {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.code {
  width: 100;
  display: flex;
  .border_ad {
    border-radius: 0.1rem;
  }
  .code_input {
    margin-right: 0.3rem;
  }
  .bule {
    width: 40%;
    height: 0.9rem;
    background: #08a0ff;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 0.9rem;
    &.hui {
      background: #999999;
    }
  }
}
.input {
  padding: 0 0.2rem;
}
.margin {
  margin-bottom: 0.3rem;
  border-radius: 0.1rem;
  > img {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0.25rem;
    right: 0.3rem;
  }
  .margin_border {
    border-radius: 0.3rem;
  }
}
.code .code_input {
  width: 60%;
}
.login_head {
  background: #fff;
  height: 0.88rem;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.1rem;
  font-size: 0.36rem;
  color: #333;
  > img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
.login {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #eeeeee;
}
</style>