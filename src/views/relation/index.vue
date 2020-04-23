<template>
  <div class="relation">
      <div class="title_box">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>联系我们</span>
      </div>
      <div class="phone">
          <div>我的养车客服电话</div>
          <div>客服座机： <span @click="phone('13729014409')">13729014409</span></div>
      </div>
      <van-button type="default" block @click="routerGo">返回</van-button>
      <span class="ccc">版权所有</span>
  </div>
</template>

<script>
export default {
    data () {
        return{
        }
    },
    mounted(){
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }
        },
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
.relation{
    background: #F7F7F7;
    height: 100vh;
}
.phone{
    padding-left: 30px;
    margin-top: 30px;
    >div{
        font-size: 32px;
        line-height: 60px;
        font-weight: bold;
        display: flex;
        align-items: center;
        >span{
            color: #079fd5;
            font-size: 35px;
            &:active{
                color: #00ff00;
            }
        }
    }
}
/deep/.van-button--block{
    width: 80%;
    height: 80px;
    color: #079fd5;
    font-size: 32px;
    margin: 80px auto;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 8px;
}
</style>