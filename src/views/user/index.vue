<template>
  <div class="user">
    <div class="title">绑定后享受车住服务</div>
    <div class="title_details">支持小/大型汽车、新能源车、教练车、港澳入境车</div>
    <div class="input_box">
      <van-form @submit="onSubmit" :show-error="false" label-width="100px">
        <van-field
          v-model="name"
          name= "name"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          required
          v-model="phone"
          name= "phone"
          label="手机号码"
          placeholder="请输入手机号码"
         :rules="[{ required: true, message: '请输入手机号码！' },{validator:mobile , message: '手机号码不合法！' }]"
        />
        <van-field
          v-model="engine"
          name= "engine"
          label="发动机号"
          placeholder="请输入发动机号"
        />
        <van-field
          v-model="frame"
          name= "frame"
          label="车架号"
          placeholder="请输入车架号"
        />
        <div class="che_pai">
          <van-field
            required
            v-model="licensePlate"
            name= "licensePlate"
            label="车牌号码"
            placeholder="请输入车牌号码"
            :rules="[{ required: true, message: '请输入车牌号码' }]"
          />
          <div class="cardTitle" @click="show = true">
               <span>{{plate}}</span>
               <i class="iconfont icon-xiala"></i>
          </div>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" size="large" style="height:40px; line-height: 40px;">
            绑定
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="xinche">新车无正式车牌></div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="车牌选择" :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<script>
import { cardTitle , letter } from '@/utils/plateNumber'
import api from '@/api/user'
export default {
  data (){
    return {
      name: "",
      phone: "",
      engine: "",
      frame: "",
      licensePlate: "",
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
  created(){
    // var obj = localStorage.getItem('user')
    // var obj = JSON.parse(obj)
    // console.log(obj);
    // if(obj === null){
    //     // this.$router.push({name: 'index'})
    //     // this.$parent.login(0)
    // }else{
    //   this.$router.push({name: 'cardVolume'})
    // }
  },
  methods: {
     onSubmit(values) {
       values.licensePlate = this.plate + values.licensePlate
       api.saveVehicleUserId(values).then(res=>{
         console.log(res);
         if(res.data.code == 200){
            this.$toast.success("绑定成功！")
            var obj = res.data.data
            var obj = JSON.stringify(obj)
            localStorage.setItem('user',obj)
            this.$router.push({name: 'cardVolume'})
         }else{
           this.$toast(res.data.msg)
         }
       })
    },
    mobile(val) {
      return  /^1[0-9]{10}$/.test(val);
    },
    onCancel(){
      this.show = false
    },
    onConfirm(value, index){
      this.show = false
      this.plate = value[0] + value[1]
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell:not(:last-child)::after{
    border-bottom: none;
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
.che_pai{
  position: relative;
  /deep/.van-field__control {
    padding-left: 30px;
  }
  /deep/.van-field__error-message{
    padding-left: 30px;
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
}
/deep/.van-cell--required::before {
  left: 0;
}
/deep/.van-cell{
  padding: 10px;
}
.input_box{
  padding-top: 10px;
}
.xinche{
  color: #0F8FFF;
  font-size: 14px;
  margin: 20px auto 0;
  text-align: center;
}
.user{
  height: 100vh;
  background: #f7f7f7;
  padding: 12.5px;
  .title_details{
    color: #808080;
    margin: 10.5px 0;
    font-size: 13px;
  }
  .title{
    font-weight: 600;
    font-size: 20px;
    color: #010101;
    margin-top: 25px;
  }
}
</style> 
