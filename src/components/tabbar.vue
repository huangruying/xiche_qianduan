<template>
  <div>
    <van-tabbar v-model="ifactive" active-color="#000" inactive-color="#969696" @change="onChange">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
      <van-tabbar-item icon="flag-o">站点</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: {
    active: {
        type: Number,
        default: 0
    },
  },
  computed: {
      ifactive:{
          get(){
            return this.active
          },
          set(val){
             this.$emit('update:active', val)
          }
      }
  },
  watch:{
    // active(newV,oldV){
    //   // this.$emit('update:active', newV)
    //   // return newV
    // }
 },
  mounted(){
  },
  data() {
    return {
      // active: 0
    };
  },
  methods: {
    onChange(index) {
      if(index == 0){
        this.$router.push({name: "yuyueIndex"})
      }else if(index == 1){
        this.$router.push({name: "yuyueUser"})
      }else if(index == 2){
        this.$router.push({name: "yuyueSite"})
      }
    },
  }
};
</script>

<style lang="less" scoped>
/deep/.van-tabbar-item__icon{
  font-size: 23px;
}
/deep/.van-tabbar-item__text{
  font-size: 13px;
}
</style>