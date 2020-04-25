<template>
  <div class="redeemCode">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>兑换码核销</span>
      </div>
      <van-cell-group>
         <van-field label="兑换码" type="number" v-model="redeemCode" placeholder="请输入兑换码" />
         <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="" class="img">
     </van-cell-group>
     <van-cell-group>
        <van-field
            v-model="licensePlate"
            label="车牌号"
            placeholder="请输入车牌号"
            class="input"
        />
        <div class="cardTitle" @click="show = true">
            <span>{{plate}}</span>
            <i class="iconfont icon-xiala"></i>
        </div>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="default" block @click="routerGo" style="margin-right:30px;">返回</van-button>
      <van-button type="info" block>
        <span style="color:#fff;" @click="useGeneralCoupon">立即核销</span>
      </van-button>
    </div>
    <div class="explain_box">
        <div class="title">使用规则：</div>
        <p class="one">1.车主可在有效期内持兑换码到指定商家消费；</p>
        <p>2.商家可输入有效兑换码创建订单，并在订单管理查看信息；</p>
        <p>3.车主凭兑换码成功创建订单后无需再向商家支付额外费用，小鱼养车与商家自行结算；</p>
      </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="车牌选择" :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<script>
import { cardTitle , letter } from '@/utils/plateNumber'
export default {
    data (){
        return{
            redeemCode: "",
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
        onCancel(){
           this.show = false
        },
        onConfirm(value, index){
           this.show = false
           this.plate = value[0] + value[1]
        },
        useGeneralCoupon(){
          
        }
    }
}
</script>

<style lang="less" scoped>
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
.btn_box {
  display: flex;
  padding: 60px 30px;
  /deep/.van-button--block {
    height: 70px;
    color: #079fd5;
    font-size: 32px;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 8px;
  }
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