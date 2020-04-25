<template>
  <div class="userAccount">
      <img src="@/assets/merchantIndex/title.png" alt="" class="img_title">
      <div class="title_box">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>个人账户</span>
      </div>
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
    }
}
</script>

<style>
.img_title{
    width: 100%;
    height: 200px;
}
</style>