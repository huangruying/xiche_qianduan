<template>
  <div class="cardVolume">
    <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
      <van-tab :title="tab.title" :name="tab.name" v-for="tab in vanTab" :key="tab.name"></van-tab>
    </van-tabs>
    <div style="overflow-y: scroll;">
      <div class="card_box">
        <div class="volume" v-for="(value,index) in dataList" :key="index">
          <div class="img">
            <img src="@/assets/cardVolume/bgdjuan2.png" alt v-if="bgdleft"/>
            <img src="@/assets/cardVolume/bgdjuan.png" alt v-if="!bgdleft"/>
            <div>{{value.dotType}}</div>
            <span>{{value.alias}}</span>
          </div>
          <div class="box">
            <div class="top">
              <div class="left_text">
                <div>{{value.couponName}}</div>
                <span>{{value.failureTime}}前有效</span>
              </div>
              <div class="right_img" v-if="bgdleft">
                <img src="@/assets/cardVolume/即将过期@2x.png" alt />
                <van-button type="info" class="btn" @click="useVolume(value.couponCode)">立即使用</van-button>
              </div>
              <div class="right_img" v-if="pastDue">
                <img src="@/assets/cardVolume/已过期@2x.png" alt class="img"/>
              </div>
              <div class="right_img" v-if="pastDue2">
                <img src="@/assets/cardVolume/已使用.png" alt class="img"/>
              </div>
            </div>
            <div class="bottom">优惠券码：{{value.couponCode}}</div>
          </div>
        </div>
      </div>
      <div class="explain_box" v-if="bgdleft">
        <div class="title">使用规则：</div>
        <p class="one">1.点击右侧立即使用按钮选择可使用商家；</p>
        <p>2.商家详情界面选择服务项目右侧支付按钮，平台自动计算 应支付费用；</p>
        <p>3.车主确认应支付费用后进行支付</p>
        <p>4.支付成功后进店服务。</p>
      </div>
      <!-- <div class="explain_box2" v-if="bgdleft">
          
      </div> -->
    </div>
    <!-- 无数据 -->
    <div class="nodata" v-if="nodata">
        <img src="@/assets/cardVolume/提示@2x.png" alt="">
        <span>您还没有任何可使用卡券</span>
    </div>
  </div>
</template>

<script>
import api from '@/api/cardVolume'
export default {
  data() {
    return {
      vanTab: [
        {
          title: "未使用",
          name: 0
        },
        {
          title: "已使用",
          name: 1
        },
        {
          title: "已过期",
          name: 2
        }
      ],
      dataList: [],
      nodata: false,
      activeName: 0,
      bgdleft: true,
      pastDue: false,
      pastDue2: false,
      name: 1
    };
  },
  mounted(){
    var obj = localStorage.getItem('user')
    var obj = JSON.parse(obj)
    if(obj === null){
        this.$router.push({name: 'index'})
        this.$parent.login()
    }else{
      this.apiList()
    }
  },
  methods: {
    // 头部优惠状态
    onClick(name, title) {
        if(name === 0){
            this.bgdleft = true
            this.pastDue = false
            this.pastDue2 = false
        }else if(name === 1){
            this.bgdleft = false
            this.pastDue = true
            this.pastDue2 = false
        }else{
            this.bgdleft = false
            this.pastDue = false
            this.pastDue2 = true
        }
        this.apiList()
    },
    // 获取数据
    apiList(){
      var data
      if(this.activeName === 0){
        data = 1
      }else if(this.activeName  === 1){
        data = 2
      }else{
        data = 0
      }
      api.findGeneralCouponByUserId({
        userId: 1,
        status: data
      }).then(res=>{
        if(res.data.data && res.data.data.length > 0){
          this.dataList = res.data.data
          this.nodata = false
        }else{
          this.dataList = []
          this.nodata = true
        }
      })
    },
    // 使用优惠卷
    useVolume(use){
      this.$router.push({name: 'cardParticulars',query: {use}})
    }
  }
};
</script>

<style lang="less" scoped>
.cardVolume{
  height: 100vh;
  background: #f5f5f9;
}
.explain_box2{
    background: #f5f5f9;
    width: 100%;
    // overflow-y: scroll;
    // height:  ~"calc(100vh - (90px))";
}
.nodata{
    background: #F5F5F9;
    // height:  ~"calc(100vh - (90px))";
    padding-top: 50px;
    display: flex;
    justify-content: center;
    >span{
        display: block;
        margin-top: 13px;
    }
    // align-items: center;
    >img{
        width: 50px;
        height: 50px;
        margin-right: 12px;
    }
}
.explain_box {
  // background: #fff;
  overflow-y: scroll;
  padding: 24px 36px;
  .title {
    color: #111111;
    font-size: 34px;
    font-weight: bold;
  }
  > p {
    color: #5e5e5e;
    line-height: 50px;
    // margin-top: 23px;
    &.one {
      margin-top: 10px;
    }
  }
}
.card_box {
  background: #f5f5f9;
  padding: 36px 30px 1px;
  .volume {
    background: #fff;
    height: 190px;
    border-radius: 10px;
    display: flex;
    margin-bottom: 20px;
    .box {
      flex: 1;
      padding: 29px;
      .bottom {
        margin-top: 15px;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 24px;
        border-bottom: 1px solid #e4e4e4;
        .left_text {
          > div {
            font-size: 30px;
            color: #111111;
            font-weight: 500;
          }
          > span {
            color: #999999;
            display: block;
            margin-top: 16px;
          }
        }
        .right_img {
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 105px;
            height: 30px;
          }
          .img{
              width: 74px;
              height: 74px;
          }
          .btn {
            border-radius: 10px;
            margin-top: 10px;
          }
        }
      }
    }
    .img {
      height: 100%;
      width: 210px;
      color: #fff;
      position: relative;
      > div {
        font-size: 52px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
      }
      > span {
        font-size: 28px;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
/deep/.van-tabs--line .van-tabs__wrap {
  height: 72px;
  /deep/.van-tab__text {
    color: #666666;
    font-size: 30px;
    font-weight: 500;
  }
  /deep/.van-tab--active {
    > span {
      color: #ee0a24;
    }
  }
  /deep/.van-tabs__nav {
    background: #fff;
  }
  /deep/.van-tab {
    line-height: 72px;
  }
}
</style>