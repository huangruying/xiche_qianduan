<template>
  <div class="cardParticulars">
      <div class="content">
          <div class="top">
              <div class="title">免费精致洗车</div>
              <div class="date">有效截止日期：2020.05.29</div>
              <div class="barCode">
                  <img class="bar" src="http://192.168.0.161:8184/yuyuetrip/wash/createBarCode" alt="">
                  <!-- <div class="bar"></div> -->
              </div>
              <div class="qrcode">
                  <div class="qr"></div>
              </div>
              <div class="conversion">兑换码：132328560493</div>
              <span>请出示以上券码给网点工作人员</span>
          </div>
          <div class="look_box">
              <div class="look">查看适用网点</div>
              <span>使用前请确认网点信息 <van-icon name="arrow" /> </span>
          </div>
      </div>
      <div class="text-box">
          <div class="explain_box">
            <div class="title">使用说明：</div>
            <p class="one">1.您可以在礼包列表的网点使用该服务券；</p>
            <p> 2.使用服务前请提前与网点预约时间；养车频道服务网点咨诉电话0755-23400556；</p>
            <p>3. 该项服务权益仅可在合作供应商网点兑换上述同种服务并需真实使用。</p>
         </div>
         <div class="explain_box">
            <div class="title">内容介绍：</div>
            <p class="one">服务内容：针对7座及7座以下客车（深层氧化物无法去除）</p>
            <p>1. 发动机除尘上光；2. 脚垫深层清洁；3. 蜡水清洁车身；4. 轮胎及轮椅清洁、轮胎护理；5. 车身边缘清洁；6. 车身沥青部分</p>
         </div>
      </div>
  </div>
</template>

<script>
import api from '@/api/cardParticulars'
export default {
    data(){
        return{

        }
    },
    mounted(){
        // api.createBarCode().then(res=>{
        //     console.log(res);
        // })
    }
}
</script>

<style lang="less" scoped>
.cardParticulars{
    width: 100%;
    background: #F2F1F6;
    // height: 100vh;
    padding: 30px;
    .explain_box {
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
            }
            .barCode{
                // background: #000;
                >img{
                    width: 340px;
                    height: 92px;
                    margin: 50px auto 0;
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