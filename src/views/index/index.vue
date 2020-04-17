<template>
  <div class="index">
    <div class="img_box" :style="{backgroundImage:`url(${indexSrc}) `}">
      <div class="search_box">
        <div class="address">
          <img src="@/assets/index/定位@2x.png" alt="">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option1" />
          </van-dropdown-menu>
        </div>
        <div class="search">
            <span>搜索</span>、
            <img src="@/assets/index/搜索@2x.png" alt="">
        </div>
        <div class="text">地图</div>
      </div>
    </div>
    <div class="tabs">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <img src="@/assets/index/洗车icon@2x.png" alt="" class="imgtab"/>
          <span>洗车</span>
        </van-grid-item>
        <van-grid-item>
          <img src="@/assets/index/美容icon@2x.png" alt="" class="imgtab"/>
          <span>美容</span>
        </van-grid-item>
        <van-grid-item>
          <img src="@/assets/index/保养icon@2x.png" alt="" class="imgtab"/>
          <span>保养</span>
        </van-grid-item>
        <van-grid-item>
          <img src="@/assets/index/维修@2x.png" alt="" class="imgtab"/>
          <span>维修</span>
        </van-grid-item>
      </van-grid>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      value: 0,
      indexSrc: require('@/assets/index/index_img.png'),
       option1: [
        { text: '天河区', value: 0 },
        { text: '白云区', value: 1 },
        { text: '番禺区', value: 2 },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-popup {
  // width: 28%;
}
/deep/.van-cell{
  // color: #fff;
  background: #07abae;
  color: #fff;
}
/deep/.van-hairline--top-bottom::after{
  border: none;
}
.tabs{
  margin: -25px 25px 0;
  border-radius: 15px;
  .imgtab{
    width: 84px;
    height: 84px;
    margin-bottom: 10px;
  }
}
.img_box{
  height: 320px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .search_box{
    // opacity:  0.5;
    background-color: rgba(0, 0, 0, 0.3);
    height: 64px;
    display: flex;
    justify-content: space-between;
    .text{
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .search{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border-radius: 20px; 
      color: #808080;
      margin: 12px;
      >span{
        display: block;
        margin-left: 18px;
        font-size: 20px;
      }
      >img{
        width: 26px;
        height: 26px;
        margin-right: 19px;
      }
    }
    .address{
      display: flex;
      align-items: center;
      /deep/.van-dropdown-menu {
        background: transparent;
        color: #fff;
        border: none;
        /deep/.van-ellipsis{
          padding-right: 7px;
        }
        /deep/.van-dropdown-menu__title::after{
          color: #fff;
          border: 6px solid;
          border-color: transparent transparent currentColor currentColor;
          top: 23%;
        }
        /deep/.van-ellipsis{
          color: #fff;
        }
      }
      >img{
        width: 23px;
        height: 37px;
        margin-left: 24px;
      }
    }
  }
}
</style>