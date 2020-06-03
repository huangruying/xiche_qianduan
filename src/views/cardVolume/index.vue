<template>
  <div class="cardVolume">
    <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
      <van-tab :title="tab.title" :name="tab.name" v-for="tab in vanTab" :key="tab.name"></van-tab>
    </van-tabs>
    <div style="overflow-y: scroll; background: #f5f5f9;">
      <div class="card_box">
        <div class="volume" v-for="(value,index) in dataList" :key="index" @click="order(value.couponCode)">
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
                <img src="@/assets/cardVolume/即将过期@2x.png" alt v-if="value.bol"/>
                <van-button type="info" class="btn" @click="useVolume(value.couponCode,value.licensePlate)" size="small">立即使用</van-button>
              </div>
              <div class="right_img" v-if="pastDue2">
                <img src="@/assets/cardVolume/已过期@2x.png" alt class="img"/>
              </div>
              <div class="right_img" v-if="pastDue">
                <img src="@/assets/cardVolume/已使用.png" alt class="img"/>
              </div>
            </div>
            <div class="bottom">优惠券码：<em class="xian" v-if="value.licensePlate">（限{{value.licensePlate}}使用）</em><span style="color: #999999;">{{value.couponCode}}</span></div>
          </div>
        </div>
      </div>
      <div class="explain_box" v-if="!nodata">
        <div class="title">使用规则：</div>
        <p class="one">1.点击右侧立即使用按钮选择可使用商家；</p>
        <p>2.商家详情界面选择服务项目右侧支付按钮，平台自动计算应付支付费用；</p>
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
      name: 1,
      id: null
    };
  },
  created(){
    var obj = localStorage.getItem('user')
    var obj = JSON.parse(obj)
    // console.log(obj);
    if(obj === null){
        // this.$router.push({name: 'index'})
        this.$parent.login(0)
    }else{
      this.id = obj.id
      this.apiList(obj.id)
    }
  },
  watch: {
    $route: {
          handler() {
              var login = this.$route.query.login;
              if(login){
                  var obj = localStorage.getItem('user')
                  var obj = JSON.parse(obj)
                  this.id = obj.id
                  this.apiList(obj.id)
              }
              // 深度监听，同时也可监听到param参数变化
        },
        deep: true,
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
        this.apiList(this.id)
    },
    timeAgo(timeA, timeB) {
        var stamp = new Date(timeA).getTime() - new Date(timeB).getTime();
        var time = Math.floor((stamp / 1000) / 24 / 60 / 60);
        return time
    },
    order(couponCode){
      if(this.pastDue){
        this.$router.push({name: 'orderDetails',query:{
          couponCode
        }})
      }
    },
    // 获取数据
    apiList(id){
      var data
      if(this.activeName === 0){
        data = 1
      }else if(this.activeName  === 1){
        data = 2
      }else{
        data = 0
      }
      api.findGeneralCouponByUserId({
        userId: id,  // 1  测试数据
        status: data
      }).then(res=>{
        // console.log(res);
        if(res.data.data && res.data.data.length > 0){
          this.dataList = res.data.data
          var date = new Date()
          var dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
          var str = dateStr.split("-")
          this.dataList.map(v=>{
            var strs = v.failureTime.split("-")
            var aa = this.timeAgo(v.failureTime,dateStr)
            if(aa < 15){
              v.bol = true
            }else{
              v.bol = false
            }
          })
          this.nodata = false
        }else{
          this.dataList = []
          this.nodata = true
        }
      })
    },
    // 使用优惠卷
    useVolume(use,licensePlate){
      if(licensePlate == undefined){
        this.$router.push({name: 'cardParticulars',query: {use}})
      }else{
        var obj = localStorage.getItem('user')
        var obj = JSON.parse(obj)
        if(obj === null){
          this.$dialog.confirm({
            title: '',
            message: '该券码需指定' + licensePlate + '使用！',
          })
          .then(() => {
            this.$router.push({name: 'user'})
          })
          .catch(() => {
          })
        }else{
          var noPlate = obj.licensePlates.indexOf(licensePlate)
          if(noPlate == -1){
            this.$dialog.confirm({
              title: '',
              message: '该券码需指定' + licensePlate + '使用！',
            })
            .then(() => {
              this.$router.push({name: 'user'})
            })
            .catch(() => {
            })
          }else{
            this.$router.push({name: 'cardParticulars',query: {use}})
          }
        }
      }
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
    // height: 100vh;
    background: #F5F5F9;
    // height:  ~"calc(100vh - (45px))";
    padding-top: 25px;
    display: flex;
    justify-content: center;
    >span{
        display: block;
        margin-top: 6.5px;
    }
    // align-items: center;
    >img{
        width: 25px;
        height: 25px;
        margin-right: 6px;
    }
}
.explain_box {
  // background: #fff;
  overflow-y: scroll;
  padding: 12px 18px;
  .title {
    color: #111111;
    font-size: 17px;
    font-weight: bold;
  }
  > p {
    color: #5e5e5e;
    line-height: 25px;
    // margin-top: 23px;
    &.one {
      margin-top: 5px;
    }
  }
}
.card_box {
  background: #f5f5f9;
  padding: 18px 15px 1px;
  .volume {
    background: #fff;
    height: 120px;
    border-radius: 5px;
    display: flex;
    margin-bottom: 10px;
    .box {
      flex: 1;
      padding: 10px 10px 0 10px;
      .bottom {
        padding: 7px 0 7px;
        .xian{
          color: #f86363;
          font-size: 10px;
        }
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #e4e4e4;
        .left_text {
          > div {
            font-size: 15px;
            color: #111111;
            font-weight: 500;
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
        font-size: 23px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
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
/deep/.van-tabs--line .van-tabs__wrap {
  height: 36px;
  /deep/.van-tab__text {
    color: #666666;
    font-size: 15px;
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
    line-height: 36px;
  }
}
</style>