<template>
  <div class="merchantIndex">
      <div class="slideshow">
          <img src="@/assets/merchantIndex/lunbo.png" alt="">
      </div>
      <div class="tabs clearfix">
          <div class="box" @click="tabsIndex(0)">
              <img src="@/assets/merchantIndex/icon-1@2x.png" alt="">
              <span>养车资讯</span>
          </div>
          <div class="box" @click="tabsIndex(1)">
              <img src="@/assets/merchantIndex/icon-2@2x.png" alt="">
              <span>联系我们</span>
          </div>
          <div class="box" @click="tabsIndex(2)">
              <img src="@/assets/merchantIndex/icon-3@2x.png" alt="">
              <span>机油检查</span>
          </div>
      </div>
      <div class="shan_hu">
          <div class="title_box_box">
              <div class="title">服务商中心</div>
              <van-button type="default">退出</van-button>
          </div>
          <div class="content_tabs clearfix">
              <div class="box border">
                <img src="@/assets/merchantIndex/grzh-icon@2x.png" alt="">
                <span>个人账户</span>
              </div>
              <div class="box border">
                <img src="@/assets/merchantIndex/ddgl-icon@2x.png" alt="">
                <span>订单管理</span>
              </div>
              <div class="box">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>人保核销</span>
              </div>
              <div class="box border">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>国寿核销</span>
              </div>
              <div class="box border">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>商务核销</span>
              </div>
              <div class="box">
                <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                <span>平台核销</span>
              </div>
          </div>
      </div>
      <span class="ccc">版权所有</span>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        tabsIndex(index){
            if(index === 0){
                this.$router.push({name: 'information'})
            }else if(index === 1){
                this.$router.push({ name: 'relation' })
            }else if(index === 2){
                this.$router.push({ name: 'oil' })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.shan_hu{
    background: #fff;
    .content_tabs{
        width: 100%;
         display: flex;
         flex-wrap : wrap;
        .box{
            margin: 12px 0;
            display: flex;        
            // float: left;
            flex-direction: column;
            align-items: center;
            padding: 33px 0;
            width: 33.3%;
            &.border{
                border-right: 1px solid #efefef;
            }
            >img{
                width: 87px;
                height: 87px;
            }
            >span{
                font-size:24px;
                color: #000;
                display: block;
                margin-top: 13px;
            }
        }
    }
    .title_box_box{
        display: flex;
        padding: 5px 0;
        justify-content: space-between;
        align-items: center;
        .title{
            height: 40px;
            line-height: 40px;
            padding-left: 22px;
            border-left: 10px solid #2F7FFA;
        }
        /deep/.van-button--normal{
            margin-right: 10px;
            padding: 8px 30px;
            height: 60px;
            border-radius: 10px;
            .van-button__text{
                font-size:24px;
            }
       }
    }
}
.tabs{
    background: #fff;
    height: 195px;
    margin-top: 30px;
    margin-bottom: 30px;
    .box{
        float: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 33px 0;
        width: 25%;
        >img{
            width: 87px;
            height: 87px;
        }
        >span{
            font-size:24px;
            color: #000;
            display: block;
            margin-top: 13px;
        }
    }
}
.slideshow{
    width: 100%;
    height: 364px;
}
.merchantIndex{
    background: #F7F7F7;
    height: 100vh;
}
</style>