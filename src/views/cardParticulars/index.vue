<template>
  <div class="cardParticulars">
      <div class="content">
          <div class="top">
              <div class="title">{{dataList.alias}}</div>
              <div class="date">有效截止日期：{{dataList.failureTime}}</div>
              <!-- <div class="barCode">
                  <div class="bar">
                      <barcode :value="use" v-if="use" :options="barCode_options" style="width:100%;">
                        你的手机条不支持条形码，请扫描以下二维码
                      </barcode>
                  </div>
              </div> -->
              <div class="qrcode dialog_qr">
                  <div class="qr" id="qrcode" ref="ref_qr"></div>
              </div>
              <span class="conversion tag-read" @click="copy" :data-clipboard-text="use">兑换码：{{use}}</span>
              <span>请出示以上券码给网点工作人员</span>
          </div>
          <div class="look_box" @click="indexGo">
              <div class="look">查看适用网点</div>
              <span>使用前请确认网点信息 <van-icon name="arrow" /> </span>
          </div>
      </div>
      <div class="text-box" style="overflow-y: scroll;background: #F2F1F6;">
          <div class="explain_box">
            <div class="title">使用说明：</div>
            <p class="one">1.您可以在礼包列表的网点使用该服务券；</p>
            <p> 2.使用服务前请提前与网点预约时间；养车频道服务网点咨诉电话0755-23400556；</p>
            <p>3. 该项服务权益仅可在合作供应商网点兑换上述同种服务并需真实使用。</p>
         </div>
         <div class="explain_box">
            <div class="title">内容介绍：</div>
            <p v-html="dataList.content">{{dataList.content}}</p>
            <!-- <p class="one">服务内容：针对7座及7座以下客车（深层氧化物无法去除）</p>
            <p>1. 发动机除尘上光；2. 脚垫深层清洁；3. 蜡水清洁车身；4. 轮胎及轮椅清洁、轮胎护理；5. 车身边缘清洁；6. 车身沥青部分</p> -->
         </div>
      </div>
  </div>
</template>

<script>
import api from '@/api/cardParticulars'
import QRCode  from "qrcodejs2"
import Clipboard from 'clipboard';
import Vue from 'vue'
import VueBarcode from '@xkeshi/vue-barcode';
Vue.component('barcode', VueBarcode);
export default {
    components: { QRCode },
    data(){
        return{
            use: null,
            timer: null,
            dataList: {},
            barCode_options:{
                width: '1px',
                height: '50px',
                fontSize: '18px',
                displayValue: false
            }
        }
    },
    mounted(){
        var { use } = this.$route.query
        this.use = use
        this.apiCardParticulars(use)
    },
    // 这里是组件被销毁的声明周期钩子函数
    destroyed () {
        // 清理定时器
        clearTimeout(this.timer)
    },
    methods: {
        indexGo(){
            this.$router.push({name: 'index'})
        },
        apiCardParticulars(use){
            api.getGeneralCouponByCode({couponCode: use}).then(res=>{
                this.dataList = res.data.data
                // console.log(res);
                if(res.data.status == 'NOT_USED'){  // 未使用
                    //  注意： 在需要调用的地方  这样必须这样调用  否则会出现  appendChild  null  就是id为qrcode的dom获取不到 返回结果为null
                    this.$refs.ref_qr.innerHTML = ''
                    this.$nextTick (function () {
                        this.qrcode(res.data.data.couponCode);
                    })
                    this.timer = setTimeout(() => {
                        this.apiCardParticulars(this.use)
                    }, 5000)
                }else if(res.data.status == 'SUCCESS'){
                    // 已核销
                    this.$router.push({name: 'evaluate',query:{
                        use: this.use
                    }})
                    this.$toast('核销成功！')
                }else if(res.data.status == 'OVERDUE'){
                    // 已过期
                    this.$toast('该券已过期！')
                    this.$router.push({name: 'cardVolume'})
                }   
            })
        },
        copy() {
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
            this.$toast('复制成功')
            // 释放内存
            clipboard.destroy()
            })
            clipboard.on('error', e => {
            // 不支持复制
            // this.$toast('复制成功')
            console.log('该浏览器不支持自动复制')
            // 释放内存
            clipboard.destroy()
            })
        },
         // 生成二维码
        qrcode (couponCode) {
            let that = this;
            let qrcode = new QRCode('qrcode', {
                width: 110,
                height: 110,        // 高度
                text: couponCode,   // 二维码内容
                // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f',   // 背景色
                // foreground: '#ff0'    // 前景色
            })
        }
    }
}
</script>

<style lang="less" scoped>
 /*固定宽高*/
  .dialog_qr {
    height: 3.6rem;
    width: 3.6rem;
    background: #08a0ff;
    margin: 0 auto;

    /*内容自适应*/
    /deep/.qr{
        width: 100% !important;
        height: 100% !important;
    }

    /*生成的二维码里面的img标签宽高自适应*/
    /deep/.qr img{
        width: 100% !important;
        height: 100% !important;
    }
    /*一开始生成的canvas也要进行宽高自适应*/
    /deep/.qr canvas{
        width: 100% !important;
        height: 100% !important;
    }
  }
.cardParticulars{
    width: 100%;
    background: #F2F1F6;
    height: 100vh;
    padding: 15px;
    .explain_box {
       background: #F2F1F6;
       padding: 12px 18px 0px;
        .title {
            color: #111111;
            font-size: 17px;
            font-weight: bold;
        }
        > p {
            color: #5e5e5e;
            line-height: 20px;
            // margin-top: 23px;
            &.one {
            margin-top: 5px;
            }
        }
    }
    .content{
        background: #fff;
        border-radius: 15px;
        margin-bottom: 7.5px;
        .look_box{
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #F2F1F6;
            align-items: center;
            height: 50px;
            >span{
                display: flex;
                align-items: center;
                color: #999999;
                padding-right: 20px;
            }
            .look{
                color: #0F8FFF;
                padding-left: 20px;
                font-weight: bold;
            }
        }
        .top{
            padding: 30px 20px 25px;
            >span{
                display: block;
                margin: 11px 0 0px;
                text-align: center;
                font-size: 12px;
                color:rgba(153,153,153,1);
            }
            .conversion{
                text-align: center;
                font-size: 17px;
                font-weight:bold;
                color: #000;
            }
            .barCode{
                // background: #000;
                .bar{
                    width: 170px;
                    height: 46px;
                    margin: 20px auto 0;
                }
                
            }
            .qrcode{
                // background: #000;
                width: 105px;
                height: 101px;
                margin: 14px auto;
            }
            .title{
                font-size: 23px;
                font-weight:bold;
                margin-bottom: 11.5px;
            }
            .date{
                color: #333333;
                font-size: 15px;
                padding-bottom: 35px;
                border-bottom: 1px dotted #333333;
                position: relative;
                &::after{
                    content: "";
                    width: 17px;
                    height: 17px;
                    border-radius: 50%;
                    background: #F2F1F6;
                    position: absolute;
                    left: -27.5px;
                    bottom: -7.5px;
                }
                &::before{
                    content: "";
                    width: 16.5px;
                    height: 16.5px;
                    border-radius: 50%;
                    background: #F2F1F6;
                    position: absolute;
                    right: -27.5px;
                    bottom: -7.5px;
                }
            }
        }
    }
}
</style>