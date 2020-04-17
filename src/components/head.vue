<template>
  <div class="head">
    <div class="tilerRouteBox">
      <van-icon name="arrow-left" class="icon" @click="routerGo" />
      <div class="text">{{name}}</div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    routerGo() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.tilerRouteBox {
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  padding: 10px;
  // font-weight: bold;
  background: #3f3f3f;
  color: #fff;
  .text{
      font-size: 16px;
  }
  .icon {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>