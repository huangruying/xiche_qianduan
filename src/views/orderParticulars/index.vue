<template>
  <div class="orderParticulars">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span @click="routerIndex(1)">订单管理</span>
          <van-icon name="arrow" />
          <span>订单详情</span>
      </div>
      <ul>
          <li>
              <span>支付订单号：</span>
              <em>{{listData.orderCode}}</em>
          </li>
          <li>
              <span>服务内容：</span>
              <em>{{listData.projectName}}</em>
          </li>
          <li>
              <span>车牌号：</span>
              <em>{{listData.licensePlate}}</em>
          </li>
          <li>
              <span>下单时间：</span>
              <em>{{listData.placeTime}}</em>
          </li>
          <li>
              <span>完成时间：</span>
              <em>{{listData.completionTime}}</em>
          </li>
          <li>
              <span>服务状态：</span>
              <em>{{listData.orderStatus === 1 ? '已支付' : '未支付' }}</em>
          </li>
          <li>
              <span>品牌车系：</span>
              <em>{{listData.brandCar}}</em>
          </li>
          <li>
              <span>车主姓名：</span>
              <em>{{listData.vehicleName}}</em>
          </li>
          <li>
              <span>车主手机号：</span>
              <em>{{listData.vehiclePhone}}</em>
          </li>
          <li>
              <span>服务商家地址：</span>
              <em>{{listData.garageAddress}}</em>
          </li>
          <li>
              <span>总金额：</span>
              <em class="col">{{listData.money}}</em>
          </li>
      </ul>
      <van-button type="default" block @click="routerGo">返回</van-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            listData: {}
        }
    },
    mounted(){
        this.listData = this.$store.getters.listData
        console.log(this.$store.getters.listData)
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }else if(index === 1){
                this.$router.push( { name: 'orderManagement' } )
            }
        },
        routerGo(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>
ul{
    li{
        display: flex;
        align-items: center;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
        >span,>em{
           display: block;
           font-family:PingFang SC;
        }
        >span{
            width: 30%;
            color: #20a6fb;
            font-weight: bold;
            border-right: 1px solid #eee;
            padding-left: 10px;
        }
        >em{
            width: 70%;
            height: auto;
            padding-left: 10px;
            overflow: hidden;//溢出隐藏
            text-overflow: ellipsis;//显示省略符号来代表被修剪的文本。
            white-space: nowrap;//文字不换
             -webkit-line-clamp:2;
            &.col{
                color: red;
            }
        }
    }
}
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
</style>