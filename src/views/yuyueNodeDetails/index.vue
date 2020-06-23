<template>
  <div class="yuyueNodeDetails">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>网点详情</span>
          <div></div>
      </div>
      <div class="content" style="overflow-y: scroll;">
          <img :src="dataList.hallPic" alt="">
          <div class="title">{{dataList.hallName}}</div>
          <p>{{dataList.hallLocation}}</p>
          <div class="phone_box">
              <span>电话：{{dataList.servicePhone}}</span>
              <van-icon name="phone" color="#4ad617" size="25" @click="phone(dataList.servicePhone)"/>
          </div>
          <div class="time_box">营业时间：{{dataList.businessHours}}</div>
          <div class="fuwu" v-if="dataList.services && dataList.services.length > 0">服务项</div>
          <div class="fuwu_text" v-if="dataList.services && dataList.services.length > 0">尊敬的贵宾您好，我们可以为您提供{{dataList.services.length}}项尊享服务</div>
          <div class="icon_box" v-if="dataList.services && dataList.services.length > 0">
              <van-grid :border="false" :column-num="4">
                <van-grid-item v-for="(value,index) in dataList.services" :key="index">
                   <div class="icon_img">
                       <img :src="value.serviceIcon" alt="">
                       <span>{{value.serviceName}}</span>
                   </div>
                </van-grid-item>
              </van-grid>
          </div>
      </div>
      <div class="nodeBtn">
          <van-button block round color="linear-gradient(to right, #4ad617, #ade083)" @click="employ">立即使用</van-button>
      </div>

     <!-- 使用弹窗 -->
        <transition name="van-fade">
            <div class="dialog" v-if="overlayShow" @click="overlayShow = false">
                <div class="dialog-cover">
                    <div @click.stop class="click_stop">
                        <van-swipe autoplay="900000" ref="swipe" @change="onChange" :loop="true">
                                <van-swipe-item v-for="(item,index) in arrCard" :key="index">
                                    <div class="dialog">
                                        <div class="dialog_text">{{item.card}}</div>
                                        <div class="dialog_ying">{{item.name}}</div>
                                        <div class="dialog_qr"><div :id="'qrcode' + index" class="qrcode" ref="ref_qr"></div></div>
                                        <div class="dialog_txt">请扫描二维码</div>
                                        <div class="dialog_img">
                                            <span v-if="blCard"><van-icon name="arrow-left" /><span>左右滑动切换卡包</span> <van-icon name="arrow" /></span>
                                        </div>
                                    </div>
                                </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import api from "@/api/yuyueUser"
import QRCode  from "qrcodejs2"
export default {
    components: {
        QRCode 
    },
    data(){
        return{
            dataList: {},
            overlayShow: false,
            blCard: false,
            selectShow: false,
            current: 0,
            codeItem: {},
            arrCard: []
        }
    },
    mounted(){
        this.dataList = this.$store.getters.yuyueSite
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        phone(phoneNumber){
            window.location.href = 'tel://' + phoneNumber
        },
         //  生成二维码
        qrcode (cardNumber,idCode) {
            let that = this;
            let qrcode = new QRCode( idCode , {
                width: 124,
                height: 124,        // 高度
                text: cardNumber,   // 二维码内容
                // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f',   // 背景色
                // foreground: '#ff0'    // 前景色
            })
        },
        employ(){
            var openId = localStorage.getItem("wxUserId") // 上线之后打开 
            if(openId){
                this.apiGetWeiXinByOpenId(openId)
            }else{
                this.$parent.phoneDialog()
            }
        },
        apiGetWeiXinByOpenId(openid){
            api.getWeiXinByOpenId({openid}).then(res=>{
                if(res.data && res.data.code == 200){
                    this.$store.dispatch("alterId", res.data.data.id)
                    if(!(res.data.data.phone) || res.data.data.phone == null){ // 还没有绑定手机号
                        this.$toast("请先绑定手机号！")
                        this.$parent.phoneDialog()
                        return
                    }
                    if(res.data.data.yuyueProducts.length <= 0){ // 没有权益
                        this.$dialog.confirm({
                        //    title: '',
                           message: '你还未购买权益哦！是否去购买？',
                        })
                        .then(() => {
                            this.$router.push({name: "yuyueIndex"})
                        })
                        .catch(() => {
                            // on cancel
                        }); 
                    }else{ // 有权益，买了卡，打开弹窗
                        var arr = res.data.data.yuyueProducts
                        if(arr.length > 1){
                            this.blCard = true
                        }
                        this.arrCard = arr
                        this.overlayShow = true
                        arr.forEach((v,i)=>{
                            this.applyCode(v,i)
                        })
                       // this.applyCode(arr[0]) // 多张卡默认拿第一张做展示二维码
                    }
                }else{
                    this.loginUser()
                }
            })
        },
        applyCode(item,idCode){
            this.codeItem = item
            var idIndex = 'qrcode' + idCode
            this.$nextTick (function () {
                this.qrcode(item.card, idIndex);  // 二维码内容及id
            })
            // this.$refs.ref_qr.innerHTML = ""
        },
        cardBag(){
            this.selectShow = true
        },
        onChange(index) {
          this.current = index
        },
    }
}
</script>

<style lang="less" scoped>
// 最外层 设置position定位 
  .dialog {
    // position: relative;
    color: #2e2c2d;
    font-size: 16px;
  }
  // 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
  .dialog-cover {
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
//   内容，记得定宽高阻止事件冒泡
  .click_stop{
    width: 276px !important;
    height: 308px !important;
    margin: 2.67rem auto;
  }
// /deep/.van-swipe{
//     width: 276px !important;
//     height: 308px !important;
// }
//  /deep/.van-swipe-item{
//     width: 276px !important;
// }
// /deep/.van-swipe__track{
//     width: 276px !important;
// }
.dialog {
  background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  text-align: center;
  border-radius: 0.3rem;
  .dialog_img {
    display: flex;
    justify-content: center;
    height: 1.4rem;
    >span{
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
  .dialog_text {
    font-size: 0.36rem;
    text-align: center;
    margin: 0.1rem 0;
    color: #000;
  }
  .dialog_ying {
    font-size: 0.47rem;
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
.icon_box{
   .icon_img{
       display: flex;
       flex-direction: column;
       align-items: center;
       >span{
           color: #777;
           display: block;
           margin-top: 5px;
           font-size: 12.5px;overflow: hidden;
           text-overflow: ellipsis;
           display: -webkit-box;
           -webkit-line-clamp: 1;
           -webkit-box-orient: vertical;
       }
       >img{
           width: 38PX;
           height: 38PX;
       }
   } 
}
.nodeBtn{
    width: 50%;
    position: fixed;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
}
.yuyueNodeDetails{
    // height: 100vh;
    padding-bottom: 43px;
    position: relative;
    .content{
        padding: 12px 20px;
        .fuwu_text{
            color: #666;
            font-size: 13px;
        }
        .fuwu{
            font-size: 16px;
            font-weight: 600;
            padding: 12px 0;
        }
        .time_box{
            margin-top: 15px;
            padding-bottom: 10px;
            color: #666;
            border-bottom: 1px solid #999;
        }
        .phone_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #999;
            >span{
                color: #666;
            }
            >i{
                background: #e8f4e8;
                border-radius: 50%;
                padding: 5px;
                display: block;
                &:active{
                    background: #ccc;
                }
            }
        }
        >p{
            color: #666;
            margin-top: 15px;
        }
        .title{
            font-size: 17px;
            font-weight: 600;
            padding: 15px 0;
            border-bottom: 1px solid #999;
        }
        >img{
            border-radius: 7px;
            height: 150px;
        }
    }
}
</style>