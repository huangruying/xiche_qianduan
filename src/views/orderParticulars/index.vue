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
              <span>订单号</span>
              <em>{{listData.orderNo}}</em>
          </li>
          <li>
              <span>卷码号</span>
              <em>{{listData.couponCode}}</em>
          </li>
          <li>
              <span>车牌号：</span>
              <em>{{listData.licensePlate}}</em>
          </li>
          <li>
              <span>是否对账</span>
              <em>{{listData.reconciliation == 1? "已对账" : "未对账"}}</em>
          </li>
          <li>
              <span>省</span>
              <em>{{listData.province}}</em>
          </li>
          <li>
              <span>市</span>
              <em>{{listData.city }}</em>
          </li>
          <li>
              <span>区</span>
              <em>{{listData.region}}</em>
          </li>
          <li>
              <span>核销时间</span>
              <em>{{listData.destructionTime}}</em>
          </li>
          <li>
              <span>所属服务商</span>
              <em>{{listData.companyName}}</em>
          </li>
          <li>
              <span>车牌号</span>
              <em>{{listData.licensePlate}}</em>
          </li>
          <li>
              <span>网点名称</span>
              <em>{{listData.dotName}}</em>
          </li>
          <li>
              <span>手机号</span>
              <em>{{listData.phone}}</em>
          </li>
          <li>
              <span>总金额：</span>
              <em class="col">{{listData.couponMoney}}</em>
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
        // console.log(this.$store.getters.listData)
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