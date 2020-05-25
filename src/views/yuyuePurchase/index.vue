<template>
  <div class="yuyuePurchase">
    <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>购买</span>
          <div></div>
    </div>
    <div class="card_box">
        <div class="icon_card">
            <i class="iconfont icon-fuwu"></i>
            <span>愉悦卡</span>
        </div>
        <div class="describe">
            <img src="@/assets/yuyueIndex/yuyueIndex.png" alt="">
            <div class="describe_text">
                <div class="top">愉悦高铁贵宾卡</div>
                <span>￥99</span>
                <div class="text">
                    <img src="@/assets/yuyueIndex/ico.png" alt="">
                    <span>仅老衲尊享</span>
                </div>
            </div>
        </div>
    </div>
    <div class="coupon_box" v-if="false">
        <i class="iconfont icon-wodeyouhuijuan"></i>
        <span>你还没有任何优惠券</span>
    </div>
    <van-radio-group v-model="radio">
        <div class="coupon_box">
            <i class="iconfont icon-wodeyouhuijuan"></i>
            <span class="lijian">有可用优惠券</span>
        </div>
        <div class="radio_box">
            <van-radio name="1" checked-color="#de9c4a">立减100券</van-radio>
            <van-radio name="2" checked-color="#de9c4a">满99减80券</van-radio>
        </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
    data(){
        return{
            radio: ""
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
.radio_box{
    background: #fff;
    padding-left: 11px;
    >div{
        padding-bottom: 8px;
    }
}
.coupon_box{
    margin-top: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 11px 10px;
    color: #777;
    >i{
        font-size: 17px;
    }
    >span{
        margin-left: 5px;
        font-size: 13px;
        &.lijian{
            color: #333;
        }
    }
}
.describe{
    padding: 10px;
    display: flex;
    .describe_text{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >span{
            color: #f00;
            font-weight: 600;
            font-size: 15px;
        }
        .top{
            font-size: 14.5px;
            color: #000;
            font-weight: 600;
        }
        .text{
            display: flex;
            align-items: center;
            >span{
                font-size: 12px;
                color: #777;
            }
            >img{
                width: 15px;
                height: 15px;
                margin-right: 6px;
            }
        }
    }
    >img{
        width: 45%;
        height: 90px;
        border-radius: 5px;
        margin-right: 10px;
    }
}
.card_box{
    padding: 10px;
    background: #fff;
}
.icon_card{
    display: flex;
    align-items: center;
    color: #777;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
    >span{
        margin-left: 5px;
    }
}
.yuyuePurchase{
    background: #f0f0f0;
    height: 100vh;
}
</style>