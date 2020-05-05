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
    height: 40px;
    color: #079fd5;
    font-size: 16px;
    margin: 40px auto;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 4px;
}
.explain_box {
  padding: 12px 18px;
  .title {
    color: #111111;
    font-size: 17px;
    font-weight: bold;
  }
  > p {
    color: #5e5e5e;
    line-height: 25px;
    // margin-top: 23px;
    &.one {
      margin-top: 5px;
    }
  }
}
/deep/.van-field__label{
    width: 65px;
    font-size: 12.5px;
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
.cardTitle{
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background:rgba(243,243,243,1);
    border-radius: 5px;
    position: absolute;
    top: 6px;
    left: 70px;
  }
.van-field{
    display: flex;
    align-items: center;
    padding: 10px 12.5px;
}
/deep/.van-cell__value{
    padding-left: 10px;
}
.input /deep/.van-cell__value{
    padding-left: 70px;
}
.img{
    width: 27.5px;
    height: 27.5px;
    position: absolute;
    right: 14px;
    top: 7px;
}
</style>