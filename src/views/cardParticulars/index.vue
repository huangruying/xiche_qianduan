<template>
  <div class="cardParticulars">
      <div class="content">
          <div class="top">
              <div class="title">{{dataList.alias}}</div>
              <div class="date">有效截止日期：{{dataList.failureTime}}</div>
              <div class="barCode">
                  <div class="bar">
                      <barcode :value="use" v-if="use" :options="barCode_options" style="width:100%;">
                        你的手机条不支持条形码，请扫描以下二维码
                      </barcode>
                  </div>
              </div>
              <div class="qrcode">
                  <div class="qr" id="qrcode" ref="ref_qr"></div>
              </div>
              <span class="conversion tag-read" @click="copy" :data-clipboard-text="use">兑换码：{{use}}</span>
              <span>请出示以上券码给网点工作人员</span>
          </div>
          <div class="look_box">
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
                    }, 3000)
                }else if(res.data.status == 'SUCCESS'){
                    // 已核销
                    this.$router.push({name: 'evaluate',query:{
                        use: this.use
                    }})
                }else if(res.data.status == 'OVERDUE'){
                    // 已过期
                    this.$toast('该卷已过期！')
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
/* 消息提示 */
// .van-toast{
// //  width: 200px;
//  min-height: 90px !important;
//  max-width: 80% !important;
//  border-radius: 10px !important;
// }
// .van-toast__text{
//   line-height: 20px !important;
// }
.cardParticulars{
    width: 100%;
    background: #F2F1F6;
    height: 100vh;
    padding: 30px;
    .explain_box {
       background: #F2F1F6;
       padding: 24px 36px 0px;
        .title {
            color: #111111;
            font-size: 34px;
            font-weight: bold;
        }
        > p {
            color: #5e5e5e;
            line-height: 40px;
            // margin-top: 23px;
            &.one {
            margin-top: 10px;
            }
        }
    }
    .content{
        background: #fff;
        border-radius: 30px;
        margin-bottom: 15px;
        .look_box{
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #F2F1F6;
            align-items: center;
            height: 100px;
            >span{
                display: flex;
                align-items: center;
                color: #999999;
                padding-right: 40px;
            }
            .look{
                color: #0F8FFF;
                padding-left: 40px;
                font-weight: bold;
            }
        }
        .top{
            padding: 60px 40px 50px;
            >span{
                display: block;
                margin: 22px 0 0px;
                text-align: center;
                font-size:24px;
                color:rgba(153,153,153,1);
            }
            .conversion{
                text-align: center;
                font-size:34px;
                font-weight:bold;
                color: #000;
            }
            .barCode{
                // background: #000;
                .bar{
                    width: 340px;
                    height: 92px;
                    margin: 40px auto 0;
                }
                
            }
            .qrcode{
                // background: #000;
                width: 210px;
                height: 202px;
                margin: 28px auto;
            }
            .title{
                font-size: 46px;
                font-weight:bold;
                margin-bottom: 23px;
            }
            .date{
                color: #333333;
                font-size: 30px;
                padding-bottom: 70px;
                border-bottom: 1px dotted #333333;
                position: relative;
                &::after{
                    content: "";
                    width: 33px;
                    height: 33px;
                    border-radius: 50%;
                    background: #F2F1F6;
                    position: absolute;
                    left: -55px;
                    bottom: -15px;
                }
                &::before{
                    content: "";
                    width: 33px;
                    height: 33px;
                    border-radius: 50%;
                    background: #F2F1F6;
                    position: absolute;
                    right: -55px;
                    bottom: -15px;
                }
            }
        }
    }
}
</style>