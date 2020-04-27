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
          label="车驾号"
          placeholder="请输入车驾号"
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
          <van-button round block type="info" native-type="submit" size="large" style="height:40px;">
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
import {} from '@/api/user'
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
  methods: {
     onSubmit(values) {
       values.licensePlate = this.plate + values.licensePlate
       api.saveVehicleUserId(values).then(res=>{
         if(res.data.code == 200){
            this.$toast.success("绑定成功！")
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
  font-size: 34px;
}
/deep/.van-picker__toolbar{
    height: 80px;
    line-height: 80px;
    .van-picker__cancel,.van-picker__title,.van-picker__confirm{
      font-size: 28px;
    }
  }
.che_pai{
  position: relative;
  /deep/.van-field__control {
    padding-left: 60px;
  }
  /deep/.van-field__error-message{
    padding-left: 60px;
  }
  .cardTitle{
    width:100px;
    height:48px;
    line-height: 48px;
    text-align: center;
    background:rgba(243,243,243,1);
    border-radius:10px;
    position: absolute;
    top: 12px;
    left: 140px;
  }
}
/deep/.van-cell{
  padding: 20px;
}
.input_box{
  padding-top: 20px;
}
.xinche{
  color: #0F8FFF;
  font-size: 28px;
  margin: 40px auto 0;
  text-align: center;
}
.user{
  height: 100vh;
  background: #f7f7f7;
  padding: 25px;
  .title_details{
    color: #808080;
    margin: 21px 0;
    font-size:26px;
  }
  .title{
    font-weight: 600;
    font-size: 40px;
    color: #010101;
    margin-top: 50px;
  }
}
</style> 
