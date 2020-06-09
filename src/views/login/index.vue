<template>
  <div class="login">
    <div class="cell_box">
        <div @click="routerGo"><van-icon name="arrow-left" /></div>
        <span>商家登录</span>
        <div></div>
    </div>
    <van-form :show-error="false" @submit="submit">
      <div class="input_box">
        <van-cell-group class="input_cell">
          <van-field
            v-model="userPhone"
            label="手机号码"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '手机号码不能为空' },{ validator: mobileDialog, message: '手机号格式错误' }]"
          />
        </van-cell-group>
        <van-cell-group class="input_cell">
          <van-field
            v-model="phoneCode"
            placeholder="请输入验证码"
            label="验证码"
            maxlength="6"
            class="code"
            :rules="[{ required: true, message: '验证码不能为空' }]"
          />
          <div class="bule" :class="tiems? 'hui' : ''" @click="getPhoneCode">{{phoneCodeText}}</div>
        </van-cell-group>
        <div class="account_number">
          <div></div>
          <div class="register" @click="merchantLogin">没有账号？去注册 <van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="btn_box">
        <van-button round color="#3f3f3f" native-type="submit" block>登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendMsg , updateWeixinUserByPhone , businessUpOrLogIn } from "@/api/login";
export default {
  data() {
    return {
      tiems: false,
      timeId: null,
      userPhone: "",
      phoneCode: "",
      userRawPhone: "",
      phoneCodeText: "获取验证码"
    };
  },
  mounted() {
    
  },
  created() {
    var loginState = this.loginMerchant()
    if(loginState){
      this.$router.push({ name: "merchantIndex" })
    }
  },
  methods: {
    routerGo() {
      this.$router.go(-1);
    },
    merchantLogin(){
      this.$router.push({name: "merchantLogin"})
    },
    mobileDialog() {
      var re = /^1\d{10}$/;
      let str = this.userPhone;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    async getPhoneCode() {
      if (this.tiems) {
        return false;
      }
      if (this.mobileDialog()) {
        var res = await sendMsg({
          phone: this.userPhone //手机号
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
              this.tiems = false;
            } else {
              this.phoneCodeText = "请等待" + num--;
              this.tiems = true;
            }
          }, 1000);
        }
      } else {
        this.$toast("手机号格式错误");
      }
    },
    loginMerchant(){
      // 商家登录
      var obj = localStorage.getItem("userMerchant");
      if (obj == null || obj == undefined) {
        return false
      }else{
        return true
      }
    },
    submit() {
      businessUpOrLogIn({
       phone: this.userPhone,
       code: this.phoneCode
     }).then(res=>{
       if(res.data.code == 200){
         var obj = res.data.data
         var obj = JSON.stringify(obj)
         localStorage.setItem('userMerchant',obj)
         this.$toast.success('登录成功!')
         this.$router.push({name: "merchantIndex"})
       }else{
         this.$toast(res.data.msg)
       }
     })
    }
  }
};
</script>

<style lang="less" scoped>
.account_number{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  .register{
    display: flex;
    align-items: center;
    color: #777;
  }
}
.btn_box {
  padding: 0 20px;
  margin-top: 50px;
}
.input_box {
  padding: 0 20px;
  margin-top: 20px;
  .input_cell {
    margin-bottom: 12px;
    position: relative;
    .bule {
      position: absolute;
      top: 0;
      right: 0;
      width: 90px;
      height: 45px;
      background: #dec389;
      border-radius: 0.1rem;
      color: #fff;
      text-align: center;
      line-height: 45px;
      &.hui {
        background: #999999;
      }
    }
    .nickName {
      /deep/.van-field__label {
        letter-spacing: 24px;
      }
    }
    .code {
      /deep/.van-field__label {
        letter-spacing: 6.5px;
      }
    }
    /deep/.van-cell {
      background: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 2px;
      /deep/.van-field__label {
        color: #333;
      }
    }
  }
}
.user_img_name {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  > span {
    color: #6699cc;
  }
  /deep/.van-uploader__preview-image {
    width: 90px !important;
    height: 90px !important;
    border-radius: 50%;
  }
}
.uploadder_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: 20px auto;
  > img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
}
</style>