<template>
  <div>
    <van-tabbar v-model="active" active-color="#000" inactive-color="#969696">
      <van-tabbar-item replace to="/index">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" style="width:27px;heigth:27px" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search">我的</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/station">站点</van-tabbar-item>
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
    
  },
  mounted(){
    //   console.log(this.active);
    //   this.active2 = this.active
  },
  data() {
    return {
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
        // inactive: require('../') "https://img.yzcdn.cn/vant/user-inactive.png"
      },
    };
  },
  methods: {
    onChange(index) {
      if (index === 2) {
        //   this.active = this.active
        // this.$router.push({name:'station'})
      }
    }
  }
};
</script>

<style>
</style>