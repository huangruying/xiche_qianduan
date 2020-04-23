<template>
  <div class="information">
      <div class="title_box">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>养车资讯</span>
      </div>
      <div class="knowledge">
          <div class="know" @click="upkeep">
                <div class="box">
                    <img src="@/assets/merchantIndex/rbhx-icon@2x.png" alt="">
                    <div class="k_text">
                        <span>夏季保养</span>
                        <em>夏季保养知识</em>
                    </div>
                </div>
              <van-icon name="arrow" size="20" color="#ccc" />
          </div>
      </div>
      <span class="ccc">版权所有</span>
  </div>
</template>

<script>
export default {
    data (){
        return{

        }
    },
    methods: {
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }
        },
        upkeep(){
            this.$router.push( { name: 'upkeep',query: { name: '夏季保养' } } )
        }
    }
}
</script>

<style lang="less" scoped>
.knowledge{   
    .know{
        background: #fff;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        .k_text{
            >span{
                display: block;
                font-size: 32px;
                font-family:Microsoft YaHei;
                font-weight: 400;
            }
            >em{
                display: block;
                font-family:Microsoft YaHei; 
                margin-top: 10px;
                color: #868686;
            }
        }
        .box{
            display: flex;
            align-items: center;
            >img{
                width: 80px;
                height: 80px;
                margin-right: 14px;
            }
        }
    }
}
.information{
    background: #F7F7F7;
    height: 100vh;
}
</style>