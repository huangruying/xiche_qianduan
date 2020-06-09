<template>
  <div class="relation">
      <div class="cell_box">
        <div @click="routerGo"><van-icon name="arrow-left" /></div>
        <span>联系我们</span>
        <div></div>
      </div>
      <div class="phone">
          <div>我的养车客服电话</div>
          <div>客服座机： <span @click="phone('13823149585')">13823149585</span></div>
      </div>
      <van-button type="default" plain block @click="routerGo" color="#3f3f3f">返回</van-button>
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
    padding-left: 15px;
    margin-top: 15px;
    >div{
        font-size: 16px;
        line-height: 30px;
        font-weight: bold;
        display: flex;
        align-items: center;
        >span{
            color: #079fd5;
            font-size: 17.5px;
            &:active{
                color: #00ff00;
            }
        }
    }
}
/deep/.van-button--block{
    width: 80%;
    height: 40px;
    color: #079fd5;
    font-size: 18px;
    margin: 40px auto;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 4px;
    line-height: 38px;
}
</style>