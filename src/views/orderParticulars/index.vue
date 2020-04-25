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
              <span>服务订单号：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>支付订单号：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>服务内容：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>车牌号：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>下单时间：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>完成时间：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>服务状态：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>支付状态：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>服务商家：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>服务商家地址：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>总金额：</span>
              <em>121133213213245</em>
          </li>
          <li>
              <span>参与优惠：</span>
              <em>9999</em>
          </li>
          <li>
              <span>应/实付金额：</span>
              <em class="col">￥121133213213245</em>
          </li>
          <li>
              <span>结算金额：</span>
              <em class="col">￥121133213213245</em>
          </li>
      </ul>
      <van-button type="default" block @click="routerGo">返回</van-button>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
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
        height: 60px;
        line-height: 60px;
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
            padding-left: 20px;
        }
        >em{
            width: 70%;
            height: auto;
            padding-left: 20px;
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
    height: 80px;
    color: #079fd5;
    font-size: 32px;
    margin: 80px auto;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 8px;
}
</style>