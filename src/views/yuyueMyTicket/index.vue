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
            <span>获取时间：{{ value.getTime }}</span>
            <!-- <em><em>类 型</em>：年卡</em> -->
            <i><i>有 效 期</i>：{{ value.cardEffTime }}</i>
          </div>
          <img src="@/assets/cardVolume/已使用.png" alt class="cardimg" v-if="value.status == 2" />
        </div>
      </div>

       <!-- 弹窗 -->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
            <div class="dialog">
                <div class="dialog_text">{{card.card}}</div>
                <div class="dialog_ying">{{card.name}}</div>
                <div class="dialog_qr"><div id="qrcode" class="qrcode" ref="ref_qr"></div></div>
                <div class="dialog_txt">请扫描二维码</div>
                <div class="dialog_img">
                    <!-- <img src="@/assets/yuyueIcon/weix@2x.png" alt/>
                    <img src="@/assets/yuyueIcon/PYQ@2x.png" alt/> -->
                </div>
            </div>
        </div>
      </van-overlay>
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
      dataList: [],
      card: {},
      loading: false
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
    onClick(name, title){
      this.MyTicket(this.uid)
    },
    cardStatus(value){
      if(value.status == 1){
        this.cardQR(value)
      }
    },
    cardQR(card){
        this.show = true
        this.card = card
        // 调用二维码 注意： 在需要调用的地方  这样必须这样调用  否则会出现  appendChild  null  就是id为qrcode的dom获取不到 返回结果为null
        this.$nextTick (function () {
          this.qrcode(card.card);
        })
        this.$refs.ref_qr.innerHTML = ""
        // console.log(card);
    },
    //  生成二维码
    qrcode (cardNumber) {
        let that = this;
        let qrcode = new QRCode('qrcode', {
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
            this.dataList = res.data.data
            this.dataList.map(v=>{
              v.getTime = v.getTime.trim().split(/\s+/)[0]
              v.cardEffTime = v.cardEffTime.trim().split(/\s+/)[0]
            })
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
.dialog {
  background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  width: 75%;
  margin: 2.67rem auto;
  border-radius: 0.3rem;
  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #000;
    position: absolute;
    top: 4rem;
    right: -0.5rem;
    opacity: 0;
  }
  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #000;
    position: absolute;
    top: 4rem;
    left: -0.5rem;
    opacity: 0;
  }
  .dialog_img {
    display: flex;
    justify-content: center;
    height: 1.4rem;
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
  .dialog_text {
    font-size: 0.36rem;
    text-align: center;
    margin: 0.1rem 0;
    color: #000;
  }
  .dialog_ying {
    font-size: 0.6rem;
    color: #e7394e;
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
    /deep/.qrcode{
        width: 100% !important;
        height: 100% !important;
    }

    /*生成的二维码里面的img标签宽高自适应*/
    /deep/.qrcode img{
        width: 100% !important;
        height: 100% !important;
    }
    /*一开始生成的canvas也要进行宽高自适应*/
    /deep/.qrcode canvas{
        width: 100% !important;
        height: 100% !important;
    }
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
      }
      >span,em{
        display: block;
        font-size: 13px;
        display: flex;
        align-items: center;
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