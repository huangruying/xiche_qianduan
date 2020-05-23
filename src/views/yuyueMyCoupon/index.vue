<template>
  <div class="yuyueMyCoupon">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>我的优惠券</span>
          <div></div>
      </div>
      <van-tabs @click="onClick" color="#e6bb57">
        <van-tab title="全部"></van-tab>
        <van-tab title="待使用"></van-tab>
        <van-tab title="已使用"></van-tab>
        <van-tab title="已过期"></van-tab>
      </van-tabs>
      <div style="overflow-y: scroll;">
          <div style="padding: 16px 20px;">
            <van-cell-group>
                <van-field
                    v-model="couponCode"
                    center
                    clearable
                    placeholder="输入券码领取优惠券"
                    >
                    <template #button>
                        <van-button size="normal" color="#d2ad76">领 取</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            
            <div class="card_box">
              <div class="volume">
                    <div class="img">
                        <img src="@/assets/yuyueIcon/icon_1.png" alt v-if="cardIndex === 0 || cardIndex === 1"/>
                        <img src="@/assets/yuyueIcon/icon2.png" alt v-if="cardIndex === 2 || cardIndex === 3"/>
                        <div><i>￥</i> 50</div>
                    </div>
                    <div class="box">
                        <div class="top">
                            <div class="left_text">
                                <div :class="cardIndex === 2 || cardIndex === 3 ?'guo_qi': ''">立减5元</div>
                            </div>
                            <div class="right_img" v-if="cardIndex === 3">
                                <img src="@/assets/cardVolume/已过期@2x.png" alt class="img"/>
                            </div>
                            <div class="right_img" v-if="cardIndex === 2">
                                <img src="@/assets/cardVolume/已使用.png" alt class="img"/>
                            </div>
                        </div>
                        <div class="bottom">2020-3-29前有效</div>
                    </div>
              </div>
            </div>
          </div>
          
          <div class="nodata" v-if="false">
              <div>你还没有相关的优惠券</div>
              <span>优惠券可享受折扣</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            couponCode: "",
            cardIndex: 0
        }
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        onClick(name, title){
          this.cardIndex = name
        }
    }
}
</script>

<style lang="less" scoped>
.card_box {
    margin-top: 10px;
  .volume {
    background: #fff;
    height: 95px;
    border-radius: 5px;
    display: flex;
    margin-bottom: 10px;
    .box {
      flex: 1;
      padding: 10px 10px 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bottom {
        padding: 7px 0 7px;
        color: #999999;
        border-top: 1px solid #e4e4e4;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        .left_text {
          > div {
            font-size: 15px;
            color: #111111;
            font-weight: 500;
            &.guo_qi{
                color: #999999;
            }
          }
          > span {
            color: #999999;
            display: block;
            margin-top: 8px;
          }
        }
        .right_img {
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 53px;
            height: 15px;
          }
          .img{
              width: 37px;
              height: 37px;
          }
          /deep/.van-button--small{
              font-size: 13px;
            }
          .btn {
            border-radius: 5px;
            margin-top: 5px;
          }
        }
      }
    }
    .img {
      height: 100%;
      width: 105px;
      color: #fff;
      position: relative;
      >img{
        height: 100%;
      }
      > div {
        font-size: 30px;
        position: absolute;
        top: 25%;
        left: 40%;
        transform: translateX(-50%);
        >i{
            font-size: 13px;
        }
      }
      > span {
        font-size: 14px;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
.yuyueMyCoupon{
     background: #f0f0f0;
     height: 100vh;
     /deep/.van-cell{
            background: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 0px 0px 0px 10px;
            /deep/.van-field__label{
                color: #333;
            }
        }
     .nodata{
         text-align: center;
         color: #999;
         font-size: 10.5px;
         margin-top: 100px;
         >span{
            display: block;
         }
         >div{
             margin-bottom: 9px;
         }
     }
}
</style>