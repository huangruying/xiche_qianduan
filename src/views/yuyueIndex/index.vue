<template>
  <div class="yuyueIndex">
      <van-swipe :autoplay="2000" height="200">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
       </van-swipe>
       <van-grid :border="false" :column-num="4">
        <van-grid-item @click="gridItem(0)">
            <div class="tabText">
               <img src="@/assets/yuyueIndex/高铁.png" alt="">
               <span>高铁休息厅</span>
            </div>
        </van-grid-item>
        <van-grid-item @click="gridItem(1)">
            <div class="tabText">
              <img src="@/assets/yuyueIndex/机场.png" alt="">
              <span>机场休息厅</span>
            </div>
        </van-grid-item>
        <van-grid-item @click="gridItem(2)">
            <div class="tabText">
              <img src="@/assets/yuyueIndex/火车.png" alt="">
              <span>12306订餐</span>
            </div>
        </van-grid-item>
        <van-grid-item @click="gridItem(3)">
            <div class="tabText">
              <img src="@/assets/yuyueIndex/酒店.png" alt="">
              <span>酒店</span>
            </div>
        </van-grid-item>
       </van-grid>
       <div class="title">礼享特惠权益</div>
       <div class="img_box">
           <div class="goods_box" @click="goodsNode">
               <div class="top">
                   <img src="@/assets/yuyueIndex/yuyueIndex.png" alt="">
                   <div class="info_text">
                       <span>悦途高铁蟹棒礼券</span>
                       <div class="price">
                            <span>￥75/人</span>
                            <van-button round type="info" color="#de9c4a" size="mini" >立即购买</van-button>
                       </div>
                       <div class="text">
                            <img src="@/assets/yuyueIndex/ico.png" alt="">
                            <span>仅老衲尊享</span>
                        </div>
                   </div>
               </div>
           </div>
           <div class="goods_box">
               <div class="top">
                   <img src="@/assets/yuyueIndex/yuyueIndex.png" alt="">
                   <div class="info_text">
                       <span>悦途高铁蟹棒礼券</span>
                       <div class="price">
                            <span>￥75/人</span>
                            <van-button round type="info" color="#de9c4a" size="mini" >立即购买</van-button>
                       </div>
                       <div class="text">
                            <img src="@/assets/yuyueIndex/ico.png" alt="">
                            <span>仅老衲尊享</span>
                        </div>
                   </div>
               </div>
           </div>
           <div class="goods_box">
               <div class="top">
                   <img src="@/assets/yuyueIndex/yuyueIndex.png" alt="">
                   <div class="info_text">
                       <span>悦途高铁蟹棒礼券</span>
                       <div class="price">
                            <span>￥75/人</span>
                            <van-button round type="info" color="#de9c4a" size="mini" >立即购买</van-button>
                       </div>
                       <div class="text">
                            <img src="@/assets/yuyueIndex/ico.png" alt="">
                            <span>仅老衲尊享</span>
                        </div>
                   </div>
               </div>
           </div>
           <div class="bottom_img">
                <img src="@/assets/yuyueIndex/yuyue.png" alt="">
                <img src="@/assets/yuyueIndex/zixun.png" alt="">
            </div>
            <div class="bottom_record">
                备案号：<span>粤ICP备19091691号</span>
            </div>
       </div>
       <tabbar :active.sync="active"></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar"
export default {
    components:{
        tabbar
    },
    data(){
        return{
            active: 0,
            images: [
                require('@/assets/yuyueIndex/yuyueIndex.png')
            ],
        }
    },
    methods: {
        goodsNode(){
            this.$router.push({name: "yuyueGoodsDetails"})
        },
        gridItem(index){
            if(index === 0){
                this.$router.push({name: "yuyueSite"})
            }else if(index === 1){
                this.$router.push({name: "yuyueSite"})
            }else if(index === 2){
                window.location.href = "https://wx.17u.cn/michelin/?code=021kt0Hr0S3Pch1FrRHr0lZ6Hr0kt0Hf&state=7%40%E6%9C%AA%E7%9F%A5%40%40ts%7C#/cross/index"
                // this.$router.push({name: ""})
            }else if(index === 3){
                window.location.href = "https://mebcenter.bestwehotel.com/v/H5UnitaryAccredit/index.html#/?version=JJ%3FlogOrRegTicket%3D0a6d9ba7-f4ad-44da-a12f-7c606a91a24c"
                // this.$router.push({name: ""})
            }
        }
    }
}
</script>

<style lang="less" scoped>
.yuyueIndex{
    padding-bottom: 50px;
}
.bottom_record{
    text-align: center;
    color: #999;
    font-size: 12px;
    padding: 4px 0;
    >span{
        font-size: 12px;
        color: #6899ce;
    }
}
.bottom_img{
    padding: 10px;
    display: flex;
    margin-top: 10px;
    background: #fff;
    >img{
        width: 50%;
        height: 80px;
    }
}
.img_box{
    background: #f3f1f2;
    .goods_box{
        background: #fff;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding: 10px 10px 3px;
        .text{
            display: flex;
            align-items: center;
            // margin-left: 45%;
            // margin-top: 3px;
            >span{
                font-size: 12px;
                font-weight: 600;
            }
            >img{
                width: 15px;
                height: 15px;
                margin-right: 6px;
            }
        }
        .top{
            display: flex;
            justify-content: space-between;
            .info_text{
                flex: 1;
                margin-left: 3%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                // border-bottom: 1px solid #ccc;
                .bottom{
                    background: #fcf3e1;
                    color: #999;
                    font-size: 13px;
                    border-radius: 3px;
                    display: inline-block;
                    margin-bottom: 3px;
                }
                .price{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    /deep/.van-button__text{
                        display: block;
                        font-size: 12px;
                        padding: 0 5px;
                    }
                    >span{
                        color: red;
                        font-weight: bold;
                    }
                }
                >span{
                    font-weight: bold;
                    display: block;
                    margin-top: 3px;
                }
            }
            >img{
                width: 42%;
                height: 100px;
                border-radius: 5px;
            }
        }
    }
}
.title{
    font-weight: 550;
    margin-left: 10px;
    font-size: 14px;
    padding-bottom: 5px;
}
.tabText{
    display: flex;
    align-items: center;
    flex-direction: column;
    >img{
        width: 55px;
        height: 55px;
    }
    >span{
        font-size: 13px;
        font-weight: 550;
        display: block;
        margin-top: 5px;
    }
}
/deep/.van-swipe__track{
    height: 0px;
}
/deep/.van-swipe-item{
    img{
        height: 200px;
    }
}
</style>