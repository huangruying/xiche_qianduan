<template>
  <div class="yuyueMyTicket">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>我的券包</span>
          <div></div>
      </div>
      <van-tabs @click="onClick" color="#e6bb57">
        <van-tab title="全部"></van-tab>
        <van-tab title="待使用"></van-tab>
        <van-tab title="已使用"></van-tab>
      </van-tabs>
      <!-- <div class="ticket_box">
        <div class="ticket_list">
          <div class="price">￥<span>50</span></div>
          <div class="left_box">
            <div class="title">立减5元</div>
            <div class="content">仅老衲可用</div>
            <span>有效期：2020-1-30</span>
          </div>
        </div>
      </div> -->
      <div class="card_box">
        <div class="card">
          <img src="@/assets/yuyueIndex/yuyue.png" alt="">
          <div class="text_box">
            <div>贵宾卡</div>
            <span>获取时间：2020-28-23</span>
            <em><em>类 型</em>：年卡</em>
            <i><i>有 效 期</i>：2929-12-20</i>
          </div>
        </div>
        <div class="card">
          <img src="@/assets/yuyueIndex/yuyue.png" alt="">
          <div class="text_box">
            <div>贵宾卡</div>
            <span>获取时间：2020-28-23</span>
            <em><em>类 型</em>：年卡</em>
            <i><i>有 效 期</i>：2929-12-20</i>
          </div>
        </div>
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
    },
    onClick(name, title){
      // console.log(name,title);
    }
  }
}
</script>

<style lang="less" scoped>
.card_box{
  padding: 10px;
  .card{
    display: flex;
    align-items: center;
    border-radius: 7px;
    padding: 10px 14px;
    margin: 3px 0 10px;
    .text_box{
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