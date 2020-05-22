<template>
  <div class="yuyueNodeDetails">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>网点详情</span>
          <div></div>
      </div>
      <div class="content">
          <img src="@/assets/yuyueIndex/yuyueIndex.png" alt="">
          <div class="title">老衲的超级贵宾厅</div>
          <p>中国大山里拉沙漠哈利啦</p>
          <div class="phone_box">
              <span>电话：38348548548548</span>
              <van-icon name="phone" color="#4ad617" size="25"/>
          </div>
          <div class="time_box">营业时间：周一至周日，09：30-13：30</div>
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
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.yuyueNodeDetails{
    height: 100vh;
    position: relative;
    .content{
        padding: 12px 20px;
        .time_box{
            margin-top: 15px;
            color: #666;
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