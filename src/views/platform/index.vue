<template>
  <div class="platform">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>平台核销</span>
      </div>
      <van-cell-group>
         <van-field label="核销订单" type="number" v-model="indent" placeholder="请输入订单号" />
         <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="" class="img">
     </van-cell-group>
     <van-cell-group>
         <van-field label="核销结果" type="text" v-model="indent" placeholder="请输入核销结果" />
     </van-cell-group>
     <van-button type="default" block @click="routerGo">返回</van-button>
    <div class="explain_box">
        <div class="title">平台核销说明：</div>
        <p class="one">1.商家通过扫描客户订单详情的二维码来完成订单；</p>
        <p>2.二维码扫描成功后，界面显示订单号及核销结果；</p>
        <p>3.每个订单核销二维码只能核销一次；</p>
      </div>
  </div>
</template>

<script>
export default {
    data (){
        return{
            indent: "",
            licensePlate: "",
        }
    },
    mounted(){
      
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }
        },
        routerGo(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>
/deep/.van-button--block{
    width: 80%;
    height: 80px;
    color: #079fd5;
    font-size: 32px;
    margin: 80px auto;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 8px;
}
.explain_box {
  padding: 24px 36px;
  .title {
    color: #111111;
    font-size: 34px;
    font-weight: bold;
  }
  > p {
    color: #5e5e5e;
    line-height: 50px;
    // margin-top: 23px;
    &.one {
      margin-top: 10px;
    }
  }
}
/deep/.van-field__label{
    width: 130px;
    font-size: 25px;
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
.van-field{
    display: flex;
    align-items: center;
    padding: 20px 25px;
}
/deep/.van-cell__value{
    padding-left: 20px;
}
.input /deep/.van-cell__value{
    padding-left: 140px;
}
.img{
    width: 55px;
    height: 55px;
    position: absolute;
    right: 28px;
    top: 13px;
}
</style>