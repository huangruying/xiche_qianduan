<template>
  <div class="orderManagement">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>订单管理</span>
      </div>
      <div style="overflow-y: scroll;background: #fff;">
        <div class="order_box" @click="orderParticulars">
            <div class="index">1.</div>
            <div class="order">
                    <div class="order_title">商户合作普洗</div>  
                    <span>服务商家： 千寻汽车服务有限公司</span>
                    <span>下单时间： 2020-09-03 18：10：19 </span>
                    <span>车牌号码： qwwee</span>
            </div>
            <div class="state">已结算</div>
        </div>
      </div>
      <van-button type="default" block @click="routerGo">返回</van-button>
  </div>
</template>

<script>
export default {
    data (){
        return{

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
        orderParticulars(){
            this.$router.push({name: 'orderParticulars'})
        }
    }
}
</script>

<style lang="less" scoped>
.orderManagement{
    height: 100vh;
    background: #f8f8f8;
    .order_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin: 18px 14px 0 12px;
        .order{
            flex: 1;
            .order_title{
                font-size: 34px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            >span{
                display: block;
                color: #a4a4a4;
                line-height: 40px;
            }
        }
        .state{
            font-weight: bold;
            text-align: right;
            width: 200px;
        }
        .index{
            font-weight: bold;
            width: 55px;
        }
    }
}
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
</style>