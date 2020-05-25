<template>
  <div class="yuyueMyBuy">
    <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>购买记录</span>
          <div></div>
    </div>
    <div class="nodata" v-if="false">没有更多数据~</div>
    <div class="my_buy">
        <div class="buy">
            <div>
                <div>悦途高铁礼券</div>
                <span>支付金额：75元</span>
                <span>购买时长：12年</span>
                <span>购买时间：2020-01-20</span>
            </div>
            <span>支付完成</span>
        </div>
        <div class="buy">
            <div>
                <div>悦途高铁礼券</div>
                <span>支付金额：75元</span>
                <span>购买时长：12年</span>
                <span>购买时间：2020-01-20</span>
            </div>
            <span class="color">支付失败</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="less" scoped>
.yuyueMyBuy{
    background: #f0f0f0;
    height: 100vh;
    .nodata{
        text-align: center;
        margin: 10px;
        color: #777;
    }
    .my_buy{
        overflow-y: scroll;
        background: #f0f0f0;
        padding: 10px 13px;
        .buy{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(to right, #c2a66a, #e0c68c);
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 8px;
            >div{
                // color: #666;
                // color: #fff;
                color: #f4efd1;
                >div{
                    color: #000;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                >span{
                    display: block;
                    font-size: 13px;
                }
            }
            >span{
                // color: rgb(210, 174, 109);
                // color: #fff;
                color: #2de8bd;
                &.color{
                    color: #f00;
                }
            }
        }
    }
}
</style>