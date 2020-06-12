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
        <div class="card" v-for="( value , index ) in dataList" :key="index">
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
  </div>
</template>

<script>
import api from "@/api/yuyueMyTicket"
export default {
  data(){
    return{
      uid: "",
      active: 0,
      dataList: [],
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