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
      <div style="overflow-y: scroll;background: #f0f0f0;">
          <div style="padding: 16px 20px;">
            <van-cell-group>
                <van-field
                    v-model="couponCode"
                    center
                    clearable
                    placeholder="输入券码领取优惠券"
                    >
                    <template #button>
                        <van-button size="normal" color="#d2ad76" @click="codeReceive(couponCode)">领 取</van-button>
                    </template>
                </van-field>
            </van-cell-group>
            
            <div class="card_box">
              <div class="volume" v-for="(value , index) in codeList" :key="index" @click="routerGoIndex(value.status)">
                    <div class="img">
                        <img src="@/assets/yuyueIcon/icon_1.png" alt v-if="value.status == 0 || value.status == 1"/>
                        <img src="@/assets/yuyueIcon/icon2.png" alt v-if="value.status == 2 || value.status == 3"/>
                        <div><i>￥</i>{{value.price}}</div>
                    </div>
                    <div class="box">
                        <div class="top">
                            <div class="left_text">
                                <div :class="value.status == 2 || value.status == 3 ?'guo_qi': ''">{{value.title}}</div>
                            </div>
                            <div class="right_img" v-if="value.status == 3">
                                <img src="@/assets/cardVolume/已过期@2x.png" alt class="img"/>
                            </div>
                            <div class="right_img" v-if="value.status == 2">
                                <img src="@/assets/cardVolume/已使用.png" alt class="img"/>
                            </div>
                        </div>
                        <div class="bottom">{{value.enddate}}前有效</div>
                    </div>
              </div>
              <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
            </div>
          </div>
          
          <div class="nodata" v-if="false">
              <div>你还没有相关的优惠券</div>
              <span>优惠券可享受折扣</span>
          </div>
          <div class="nodata" v-if="codeList.length === 0">
            <img src="@/assets/yuyueIcon/custom-empty-image.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import api from "@/api/yuyueMyCoupon"
export default {
    data(){
        return{
            couponCode: "",
            cardIndex: 0,
            codeList: [],
            id: "",
            loading: false
        }
    },
    mounted(){
      //  var id = this.$store.getters.userID
      // localStorage.setItem("wxUserId", 'o2mJowp-PE2-xcdFlbu6-DDHA8tY')
       var id = localStorage.getItem("wxUserId")  // 上线打开
       this.id = id
       this.apiCoupon(id)
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        routerGoIndex(status){
          if(status == 3 || status == 2){

          }else{
            this.$router.push({name: "yuyueIndex"})
          }
        },
        apiCoupon(id){
          this.codeList = []
          this.loading = true
          api.findYyCouponscodeInfos({
            openid: id,
            status: this.cardIndex
          }).then(res=>{
            this.loading = false
            if( res.data.code == 200 && res.data.data){
              this.codeList = res.data.data
            }else{
              // this.$toast(res.data.msg)
            }
          })
        },
        onClick(name, title){
          this.cardIndex = name
          this.apiCoupon(this.id)
        },
        codeReceive(codeReceive){
          if(codeReceive.trim() == ""){
            this.$toast("请输入券码!")
            return
          }
          api.receiveYyCouponscodeByBarcode({
              openid: this.id,   
              barcode: codeReceive
          }).then(res=>{
            if(res.data && res.data.code == 200){
              this.$toast.success("领取成功！")
              this.apiCoupon(this.id)
              this.couponCode = ""
            }else{
              this.$toast(res.data.msg)
            }
          })
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
        font-size: 24px;
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
         >img{
           width: 100px;
           height: 100px;
           margin: auto;
         }
         >span{
            display: block;
         }
         >div{
             margin-bottom: 9px;
         }
     }
}
</style>