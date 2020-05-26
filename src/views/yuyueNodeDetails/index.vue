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
          <van-button block round color="linear-gradient(to right, #4ad617, #ade083)">立即使用</van-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dataList: {}
        }
    },
    mounted(){
        this.dataList = this.$store.getters.yuyueSite
        console.log(this.dataList);
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        phone(phoneNumber){
            window.location.href = 'tel://' + phoneNumber
        }
    }
}
</script>

<style lang="less" scoped>
.icon_box{
   .icon_img{
       display: flex;
       flex-direction: column;
       align-items: center;
       >span{
           color: #777;
           display: block;
           margin-top: 5px;
       }
       >img{
           width: 45PX;
           height: 45PX;
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
    // position: relative;
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