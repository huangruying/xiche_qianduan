<template>
  <div class="yuyueGoodsDetails">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>愉悦机场贵宾卡</span>
          <div></div>
      </div>
      <div class="content"><img src="@/assets/yuyueIndex/yuyueIndex.png" alt=""></div>
      <div class="cell_price">
          <span><i>￥</i>90000</span>
          <van-button round type="info" color="#de9c4a" size="mini" >立即购买</van-button>
      </div>
      <div class="serve_box">
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>愉悦机场贵宾卡</span>
          </div>
          <div class="text">
              <p>寺大家发士大夫建瓯市都放假的书法家打发时间佛i圣诞节佛山的积分多少佛的时间佛但是的时间佛山地方就是都i发九分电视剧佛i技术的佛山的肌肤佛挡杀佛i圣诞节佛山地方v今山东覅绝对是佛i将发生就受到佛教是东方时代就发到手机电视机构绝对是送到附近发生的鞠躬三鞠躬建瓯凡事都i官方警方师德师风建设都i发就山东i金佛山地方就告诉对方jog就是东非国家色附件是东方建瓯房价多少发票发生的到附近的破聚集到福建山东颇丰的数据库公婆</p>
          </div>
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>服务内容</span>
          </div>
          <div class="text">
              <p>会给认识的人韩国覅低功耗的fig好东颇丰的数据库公婆</p>
          </div>
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>使用说明</span>
          </div>
      </div>
      <div class="richText">
           html
      </div>
      <div class="nodeBtn">
          <van-button block round color="linear-gradient(to right, #d2ae6d, #f3dea8)">立即购买</van-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.nodeBtn{
    width: 50%;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}
.richText{
    padding: 0 20px;
    background: #fff;
    margin-top: 13px;
    padding-bottom: 43px;
}
.serve_box{
    background: #fff;
    padding: 1px 13px 4px;
    .serve_title{
        display: flex;
        align-items: center;
        color: #fff;
        background-image: linear-gradient(to right , #222223, #656465);
        padding: 5px 5px;
        border-radius: 1px;
        margin: 10px 0 5px;
        >img{
            width: 18px;
            height: 18px;
            margin-right: 4px;
        }
    }
    .text{
        padding: 0 15px;
        >p{
            color: #888;
            line-height: 20px;
        }
    }
}
 .cell_price{
     background: #fff;
     padding: 14px 20px;
     margin: 6px 0;
     display: flex;
     justify-content: space-between;
     align-items: center;
     /deep/.van-button__text{
        display: block;
        font-size: 12px;
        padding: 0 6px;
     }
     >span{
         color: red;
         font-weight: bold;
         font-size: 18px;
         >i{
            padding-right: 4px;
            font-weight: 500;
         }
     }
 }
.yuyueGoodsDetails{
   background: #f0f0f0;
}
.content{
    padding: 13px;
    background: #fff;
    >img{
       height: 170px;
       border-radius: 8px;
    }
}
</style>