<template>
  <div class="login">
    <headGo :name="'绑定手机'"></headGo>
    <img src alt class="user_img" />
    <div class="input_box">
      <van-field v-model="phone" label="手机号码" @blur="checkPhone" placeholder="请输入手机号码" :error-message="err" class="input"/>
      <van-field v-model="name" label="真实姓名" placeholder="请输入正式姓名" class="input"/>
    </div>
    <div class="btn_box">
      <van-button type="primary" block class="btn" color="#3f3f3f" @click="login">绑定</van-button>
    </div>
  </div>
</template>

<script>
import headGo from "@/components/head";
import { userLogin } from "@/api/login"
export default {
  components: {
    headGo
  },
  data () {
      return {
          phone: "",
          name: "",
          err: ""
      }
  },
  methods: {
    checkPhone(){ 
      var phone = this.phone
      if(!(/^1[3456789]\d{9}$/.test(phone))){ 
         this.err = "手机号格式错误"
          return false; 
      }else{
        this.err = ""
        return true;
      }
    },
   async login(){
      if(this.checkPhone()){
        var res = await userLogin({
          username:this.name,
          password:this.phone
        })
        console.log(res);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn_box{
  margin: 8px auto;
  .btn{
    margin: 10px auto;
    // height: 36px;
    // line-height: 36px;
    border-radius: 6px;
    width: 80%;
  }
}
.input_box{
    .input{
        width: 80%;
        border: 1px solid #cccccc;
        margin: 0 auto;
        margin-top: 8px;
        background: #f8f8f8;
    }
}
.user_img {
  margin: 10px auto;
  width: 60px;
  height: 60px;
  background: #000;
  border-radius: 50%;
}
</style>