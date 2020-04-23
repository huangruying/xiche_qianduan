<template>
  <div class="upkeep">
      <div class="title_box">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span @click="routerIndex(1)">养车资讯</span>
          <van-icon name="arrow" />
          <span>{{name}}</span>
      </div>
      <div class="box_box">
          <div class="title">夏季保养</div>
          <div class="right">车辆养护资讯</div>
          <div class="text_box">
              <span>2020-08-12</span>
              <em>斯柯达-明锐</em>
          </div>
          <span>夏季保养知识</span>
      </div>
    <span class="ccc">版权所有</span>
  </div>
</template>

<script>
export default {
    data () {
        return{
            name: ""
        }
    },
    mounted(){
        var { name } = this.$route.query
        this.name = name
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }else if(index === 1){
                this.$router.push( { name: 'information' } )
            }
           
        },
    }
}
</script>

<style lang="less" scoped>
.box_box{
    padding: 15px;
    >span{
        display: block;
        margin-top: 10px;
    }
    .text_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        >span{
            color: #ccc;
        }
        >em{
            color: #21a7fc;
            font-family:Microsoft YaHei;
            font-weight: bold;
            font-size: 26px;
        }
    }
    .title{
        font-weight: bold;
        font-size: 30px;
        margin-top: 10px;
    }
    .right{
        font-weight: bold;
        text-align: right;
        margin-top: 10px;
    }
}
.upkeep{
    background: #F7F7F7;
    height: 100vh;
}
</style>