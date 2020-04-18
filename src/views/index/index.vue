<template>
  <div class="index">
    <div class="img_box" :style="{backgroundImage:`url(${indexSrc}) `}">
      <div class="search_box">
        <div class="address">
          <img src="@/assets/index/address-icon@2x.png" alt="">
          <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option1" />
          </van-dropdown-menu> -->
          <div class="tou_bu">
            <span>天河区</span>
            <img src="@/assets/index/多边形 1@2x.png" alt="">
          </div>
        </div>
        <div class="search_input">
          <van-search v-model="search" placeholder="请输入搜索关键词" />
        </div>
        <!-- <div class="search">
            <span>搜索</span>           
            <img src="@/assets/index/搜索@2x.png" alt="">
        </div> -->
        <div class="text">地图</div>
      </div>
    </div>
    <div class="tabs clearFix">
      <div class="grid">
        <img src="@/assets/index/洗车icon@2x.png" alt="" class="imgtab"/>
        <span>洗车</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/美容icon@2x.png" alt="" class="imgtab"/>
        <span>美容</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/保养icon@2x.png" alt="" class="imgtab"/>
        <span>保养</span>
      </div>
      <div class="grid">
        <img src="@/assets/index/维修@2x.png" alt="" class="imgtab"/>
        <span>维修</span>
      </div>
    </div>
    <van-tabs @click="onClick" v-model="activeName" :swipeable="true" style="margin-bottom: 10px;">
      <van-tab :title="tab.title" :name="tab.name" v-for="tab in vanTab" :key="tab.name"></van-tab>
    </van-tabs>
    <div class="commodity_box">
      <div class="commodity" @click="particulars">
        <img src="@/assets/index/2@2x.png" alt="">
        <div class="text_box">
          <div class="title">
            <span>广州市锦辉汽车维修服务342222222.</span>
            <em>1 公里</em>
          </div>
          <div class="rate">
            <van-rate v-model="rate" allow-half readonly size="16px" color="#ffaf00"/>
            <span>4.5 分</span>
          </div>
          <div class="bottom_address">
            <div class="left">
              <img src="@/assets/index/定位@2x.png" alt="">
              <span>广州/天河区</span>
            </div>
            <div class="right">
              <img src="@/assets/index/时间@2x.png" alt="" class="img">
              <span>8:30-17:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      rate: 4.5,
      value: 0,
      search: "",
      indexSrc: require('@/assets/index/index_img.png'),
      vanTab:[
        {
          title: "全部",
          name: 0
        },
        {
          title: "普通洗车",
          name: 1
        },
        {
          title: "全套精洗",
          name: 2
        }
      ],
      option1: [
        { text: '天河区', value: 0 },
        { text: '白云区', value: 1 },
        { text: '番禺区', value: 2 },
      ],
      activeName: 0
    }
  },
  methods: {
    onClick(name, title) {
      
    },
    particulars(){
      this.$router.push({name:"particulars"})
    }
  }
}
</script>

<style lang="less" scoped>
.search_input{
  flex: 1;
  display: flex;
  align-items: center;
  /deep/.van-search {
    width: 100%;
    margin: 20px;
    border-radius: 30px;
    .van-field__left-icon .van-icon{
      margin: 5px 0 0 3px;
      font-size: 32px;
      color: #999;
    }
    .van-cell{
      padding: 0;
    }
  }
  // >img{
  //       width: 26px;
  //       height: 26px;
  //       margin-right: 19px;
  // }
}
.tou_bu{
  flex: 1;
  color: #fff;
  display: flex;
  align-items: center;
  margin-left: 12px;
  >img{
    width: 23px;
    height: 16px;
    margin-left: 6px;
  }
}
/deep/.van-cell{
  // background: #07abae;
  color: #fff;
}
/deep/.van-hairline--top-bottom::after{
  border: none;
}
/deep/.van-tabs--line .van-tabs__wrap {
  // background: #F8F8F8;
  height: 72px;
  /deep/.van-tab__text{
    color: #666666;
    font-size:25px;
  }
  /deep/.van-tab--active{
    >span{
      color: #ee0a24;
    }
  }
  /deep/.van-tabs__nav{
     background: #F8F8F8;
  }
  /deep/.van-tab{
    line-height: 72px;
  }
}
.commodity_box{
  padding: 0px 20px;
  .commodity{
    padding: 16px 0;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    .text_box{
      padding-top: 30px;
      flex: 1;
      .bottom_address{
        margin-top: 18px;
        display: flex;
        justify-content: space-between;
        >div{
          display: flex;
          align-items: center;
          >span{
            color: #666666;
          }
          >img{
            width: 15px;
            height: 20px;
            margin-right: 10px;
            &.img{
              width: 20px;
            }
          }
        }
      }
      .rate{
        margin-top: 14px;
        >span{
          margin-left: 9px;
          color: #F62A2A;
        }
      }
      .title{
        display: flex;
        >span{
          display: block;
          height: 26px;
          line-height:30px;
          font-size:26px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        >em{
          display: block;
          text-align: right;
          margin-top: 10px;
          width: 100px;
          font-size:18px;
          font-family:Microsoft YaHei;
          color:rgba(51,51,51,1);
        }
      }
    }
    >img{
      width: 200px;
      height: 165px;
      border-radius: 4px;
      margin-right: 19px;
    }
  }
}
.tabs{
  margin: -30px 25px 0;
  background: #fff;
  border-radius: 15px;
  .grid{
    float: left;
    width: 25%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    >span{
      font-size: 24px;
    }
  }
  .imgtab{
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  }
}
.img_box{
  height: 320px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .search_box{
    // opacity:  0.5;
    background-color: rgba(0, 0, 0, 0.3);
    height: 70px;
    display: flex;
    justify-content: space-between;
    .text{
      color: #fff;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 13px;
      margin-left: 10px;
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