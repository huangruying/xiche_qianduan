<template>
  <div class="oil">
    <div class="title_box">
      <span @click="routerIndex(0)">首页</span>
      <van-icon name="arrow" />
      <span>机油匹配查询</span>
    </div>
    <van-cell-group>
      <van-field v-model="number" label="车架号" placeholder="请输入车架号" />
    </van-cell-group>
    <div class="btn_box">
      <van-button type="default" block @click="routerGo" style="margin-right:30px;">返回</van-button>
      <van-button type="info" block>
        <span style="color:#fff;">查询</span>
      </van-button>
    </div>
    <div class="bgdf">
      <div class="text_box">
        <div class="text">
          <span>门店营业时间：</span>
          <em>12:00-12-00</em>
        </div>
        <div class="text">
          <span>服务商家：</span>
          <em>我家</em>
        </div>
      </div>
      <div class="text_box" style="border-top: 1px solid #ccc; flex-grow: 1;overflow-y: auto;">
        <div class="text">
          <span>车辆品牌：</span>
          <em></em>
        </div>
        <div class="text">
          <span>车辆型号：</span>
          <em></em>
        </div>
        <div class="text">
          <span>推荐机油：</span>
          <em></em>
        </div>
        <div class="text">
          <span>机油用量：</span>
          <em></em>
        </div>
      </div>
    </div>
    <span class="ccc">版权所有</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: ""
    };
  },
  methods: {
    routerIndex(index) {
      if (index === 0) {
        this.$router.push({ name: "merchantIndex" });
      }
    },
    routerGo() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.btn_box {
  display: flex;
  padding: 30px;
  background: #f7f7f7;
  /deep/.van-button--block {
    height: 70px;
    color: #079fd5;
    font-size: 32px;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 8px;
  }
}
.oil{
  width: 100%;
  height: 100%;
}
.van-cell {
  display: flex;
  align-items: center;
  padding: 20px 20px;
  /deep/.van-field__body {
    padding-left: 50px;
  }
}
.bgdf {
  // background: #333333;
  // height:100vh;
  display: flex;
  flex-direction: column;
  .text_box {
    padding-top: 10px;
    padding-bottom: 10px;
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 30px;
      > span {
        color: #858585;
        display: block;
        width: 40%;
      }
      > em {
        font-family: Microsoft YaHei;
        font-weight: bold;
        display: block;
        width: 60%;
        text-align: right;
        color: #333333;
      }
    }
  }
}
</style>