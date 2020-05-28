<template>
  <div class="yuyueMyBuy">
    <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>购买记录</span>
          <div></div>
    </div>
    <div class="nodata" v-if="nodata">没有更多数据~</div>
    <div class="my_buy">
        <div class="buy" v-for="(value,index) in dataList" :key="index">
            <div>
                <div>{{value.name}}</div>
                <span>价格：{{value.price}}元</span>
                <!-- <span>购买时长：12年</span> -->
                <span v-if="value.coupon">优惠券抵消金额：{{value.coupon}}元</span>
                <span>购买时间：{{value.purchaseTime}}</span>
                <span>实际支付金额：{{value.payAmount}}</span>
            </div>
            <span :class="value.status == 1?'':'color'">{{value.status == 1? "支付成功" : "支付失败"}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/yuyueMyBuy"
export default {
    data(){
        return{
            openId: "",
            nodata: false,
            dataList: []
        }
    },
    mounted(){
        this.openId = localStorage.getItem("wxUserId")
        this.apiFindProductOrderInfos()
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        apiFindProductOrderInfos(){
            api.findProductOrderInfos({openId: this.openId}).then(res=>{
                if(res.data && res.data.code == 200){
                    if(res.data.data.length > 0){
                        this.dataList = res.data.data
                        this.nodata = false
                    }else{
                        this.dataList = []
                        this.nodata = true
                    }
                }else{
                    this.dataList = []
                    this.$toast(res.data.msg)
                    this.nodata = true
                }
            })
        }
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