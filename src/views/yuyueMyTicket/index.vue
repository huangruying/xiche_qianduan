<template>
  <div class="yuyueMyTicket">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>我的卡包</span>
          <div></div>
      </div>
      <van-tabs @click="onClick" v-model="active" color="#e6bb57">
        <van-tab title="全部"></van-tab>
        <van-tab title="待使用"></van-tab>
        <van-tab title="已使用"></van-tab>
      </van-tabs>
      <div class="card_box">
        <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
        <div class="nodata" v-if="dataList.length === 0 && !loading">
          <img src="@/assets/yuyueIcon/custom-empty-image.png" alt="">
        </div>
        <div class="card" v-for="( value , index ) in dataList" :key="index" @click="cardStatus(value)">
          <img :src="value.picfilepath" alt="">
          <div class="text_box">
            <div>{{ value.name }}</div>
            <span>获取时间：{{ value.serviceCard[0].cardEffTime }}</span>
            <!-- <em><em>类 型</em>：年卡</em> -->
            <i><i>有 效 期</i>：{{ value.serviceCard[0].cardEffTime }}</i>
          </div>
          <img src="@/assets/cardVolume/已使用.png" alt class="cardimg" v-if="value.totalStatus == 0" />
        </div>
      </div>

       <!-- 弹窗,原本的单卡对应单个二维码 -->
      <!-- <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
            <div class="dialog">
                <div class="dialog_text">{{card.card}}</div>
                <div class="dialog_ying">{{card.name}}</div>
                <div class="dialog_qr"><div id="qrcode" class="qrcode" ref="ref_qr"></div></div>
                <div class="dialog_txt">请扫描二维码</div>
                <div class="dialog_img">
                    
                </div>
            </div>
        </div>
      </van-overlay> -->
      <transition name="van-fade">
            <div v-if="show" @click="show = false">
                <div class="dialog-cover">
                    <div @click.stop class="click_stop">
                        <van-swipe @change="onChange2" :loop="true" indicator-color="#d4b06f">
                            <van-swipe-item v-for="(item,index) in arrCard" :key="index">
                                <div class="dialog">
                                    <div class="dialog_text">{{item.card}}</div>
                                    <div class="dialog_ying">{{item.name}}</div>
                                    <div class="dialog_textName">{{item.iname}}</div>
                                    <div class="dialog_qr"><div :id="'qrcode' + index" class="qrcode" ref="ref_qr"></div></div>
                                    <div class="dialog_txt">请扫描二维码</div>
                                    <div class="dialog_img">
                                        <span v-if="blCard"><van-icon name="arrow-left" /><span>左右滑动切换会员卡</span> <van-icon name="arrow" /></span>
                                    </div>
                                </div>
                            </van-swipe-item>
                        </van-swipe>
                        <div class="indicator_current2">
                          {{ current2 + 1 }} / {{ arrCard.length }}
                        </div>
                    </div>
                </div>
            </div>
      </transition>
  </div>
</template>

<script>
import api from "@/api/yuyueMyTicket"
import QRCode  from "qrcodejs2"
export default {
  components: {
    QRCode 
  },
  data(){
    return{
      show: false,
      uid: "",
      active: 0,
      current2: 0,
      dataList: [],
      card: {},
      arrCard: [],
      loading: false,
      blCard: false
    }
  },
  mounted(){ 
    var { uid } = this.$route.query
    this.uid = uid
    this.MyTicket(uid)
  },
  methods: {
    routerGo(){
      this.$router.go(-1)
    },
    onChange2(index) {
      this.current2 = index;
    },
    onClick(name, title){
      this.MyTicket(this.uid)
    },
    cardStatus(value){
      if(value.totalStatus == 1){
        this.cardQR(value.serviceCard)
      }
    },
    cardQR(card){
        this.show = true
        this.arrCard = card
        if (card.length > 1) {
          this.blCard = true;
        }
        this.arrCard.forEach((v, i) => {
          if(v.status == 1){
            this.applyCode(v, i);
          }
        });
        // 原本的单卡对应单个二维码逻辑
        // this.show = true
        // this.card = card
        // // 调用二维码 注意： 在需要调用的地方  这样必须这样调用  否则会出现  appendChild  null  就是id为qrcode的dom获取不到 返回结果为null
        // this.$nextTick (function () {
        //   this.qrcode(card.card);
        // })
        // this.$refs.ref_qr.innerHTML = ""
    },
    applyCode(item, idCode) {
      var idIndex = "qrcode" + idCode;
      this.$nextTick(function() {
        this.qrcode(item.card, idIndex); // 二维码内容及id
      });
      // this.$refs.ref_qr.innerHTML = ""
    },
    //  生成二维码
    qrcode (cardNumber,idCode) {
        let that = this;
        let qrcode = new QRCode(idCode, {
            width: 124,
            height: 124,        // 高度
            text: cardNumber,   // 二维码内容
            // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            // background: '#f0f',   // 背景色
            // foreground: '#ff0'    // 前景色
        })
    },
    MyTicket(uid){
      this.loading = true
      this.dataList = []
      api.finYyProductCardByUid({uid,status: this.active}).then(res=>{
        this.loading = false
        if(res.data.code == 200){
          if(res.data.data){
            res.data.data.map(v=>{
              v.serviceCard.forEach(i=>{
                 i.cardEffTime = i.cardEffTime.trim().split(/\s+/)[0]
                 i.cardInvTime = i.cardInvTime.trim().split(/\s+/)[0]
              })
            })
            this.dataList = res.data.data
          }
        }else{
          this.$toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__line {
  z-index: auto;
}
/deep/.van-swipe__indicators {
  bottom: 1px;
}
// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
.dialog-cover {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /deep/.van-swipe {
    width: 276px !important;
    height: 330px !important;
  }
}
//   内容，记得定宽高阻止事件冒泡
.click_stop {
  width: 276px !important;
  height: 330px !important;
  margin: 2.67rem auto;
}
.indicator_current2 {
  position: absolute;
  right: 5px;
  top: 420px;
  font-size: 14px;
  border-radius: 5px;
  color: #fff;
}
.dialog {
  background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  text-align: center;
  border-radius: 0.3rem;
  color: #2e2c2d;
  font-size: 16px;
  .dialog_img {
    display: flex;
    justify-content: center;
    height: 1.2rem;
    > span {
      display: flex;
      align-items: center;
      color: #777777;
    }
    > img {
      width: 1rem;
      height: 1rem;
      margin: 0.2rem 0.28rem;
    }
  }
  .dialog_txt {
    text-align: center;
    font-size: 0.3rem;
    font-family: PingFang SC;
    color: #333;
    margin: 0.3rem 0;
  }
  .dialog_textName {
    text-align: center;
    color: #000;
  }
  .dialog_text {
    font-size: 0.36rem;
    text-align: center;
    margin: 0.1rem 0;
    color: #000;
  }
  .dialog_ying {
    font-size: 0.5rem;
    color: #d4b06f;
    text-align: center;
    margin: 0.2rem 0;
  }
  /*固定宽高*/
  .dialog_qr {
    height: 3.6rem;
    width: 3.6rem;
    background: #08a0ff;
    margin: 0 auto;

    /*内容自适应*/
    /deep/.qrcode {
      width: 100% !important;
      height: 100% !important;
    }

    /*生成的二维码里面的img标签宽高自适应*/
    /deep/.qrcode img {
      width: 100% !important;
      height: 100% !important;
    }
    /*一开始生成的canvas也要进行宽高自适应*/
    /deep/.qrcode canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
// .dialog {
//   background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
//   background-repeat: no-repeat;
//   background-size: cover;
//   position: relative;
//   padding-bottom: 0.2rem;
//   padding-top: 0.2rem;
//   width: 75%;
//   margin: 2.67rem auto;
//   border-radius: 0.3rem;
//   &::before {
//     content: "";
//     width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background: #000;
//     position: absolute;
//     top: 4rem;
//     right: -0.5rem;
//     opacity: 0;
//   }
//   &::after {
//     content: "";
//     width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background: #000;
//     position: absolute;
//     top: 4rem;
//     left: -0.5rem;
//     opacity: 0;
//   }
//   .dialog_img {
//     display: flex;
//     justify-content: center;
//     height: 1.4rem;
//     > img {
//       width: 1rem;
//       height: 1rem;
//       margin: 0.2rem 0.28rem;
//     }
//   }
//   .dialog_txt {
//     text-align: center;
//     font-size: 0.3rem;
//     font-family: PingFang SC;
//     color: #333;
//     margin: 0.3rem 0;
//   }
//   .dialog_text {
//     font-size: 0.36rem;
//     text-align: center;
//     margin: 0.1rem 0;
//     color: #000;
//   }
//   .dialog_ying {
//     font-size: 0.6rem;
//     color: #e7394e;
//     text-align: center;
//     margin: 0.2rem 0;
//   }
//    /*固定宽高*/
//   .dialog_qr {
//     height: 3.6rem;
//     width: 3.6rem;
//     background: #08a0ff;
//     margin: 0 auto;

//     /*内容自适应*/
//     /deep/.qrcode{
//         width: 100% !important;
//         height: 100% !important;
//     }

//     /*生成的二维码里面的img标签宽高自适应*/
//     /deep/.qrcode img{
//         width: 100% !important;
//         height: 100% !important;
//     }
//     /*一开始生成的canvas也要进行宽高自适应*/
//     /deep/.qrcode canvas{
//         width: 100% !important;
//         height: 100% !important;
//     }
//   }
// }
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
.card_box{
  padding: 10px;
  .card{
    display: flex;
    align-items: center;
    border-radius: 7px;
    padding: 10px 14px;
    margin: 3px 0 10px;
    position: relative;
    .cardimg{
      width: 45px;
      height: 45px;
      position: absolute;
      top: 18px;
      right: 14px;
    }
    .text_box{
      flex: 1;
      color: #f4efd1;
      >i{
        display: block;
        font-size: 12px;
        >i{
          font-family:PingFang SC;
          font-style: normal;
        }
        font-family:PingFang SC;
        font-style: normal;
      }
      >span,em{
        display: block;
        font-size: 12px;
        display: flex;
        align-items: center;
        font-family:PingFang SC;
        >em{
          letter-spacing: 7px;
        }
      }
      >div{
        font-size: 15px;
        padding-bottom: 5px;
        font-size: 600;
      }
    }
    >img{
      width: 30%;
      height: 63px;
      border-radius: 7px;
      margin-right: 9px;
    }
    background: linear-gradient(to right, #c2a66a , #e0c68c)
  }
}
</style>