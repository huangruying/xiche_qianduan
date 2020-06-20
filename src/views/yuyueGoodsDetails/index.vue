<template>
  <div class="yuyueGoodsDetails">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>{{dataList.name}}</span>
          <div></div>
      </div>
      <div class="content"><img :src="dataList.picfilepath" alt=""></div>
      <div class="cell_price">
          <span><i>￥</i>{{dataList.price}}</span>
          <van-button round type="info" color="#de9c4a" size="mini" @click="purchase(dataList)">立即购买</van-button>
      </div>
      <div class="serve_box">
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>{{dataList.name}}</span>
          </div>
          <div class="text" v-html="dataList.equityBrief">
              <p>{{dataList.equityBrief}}</p>
          </div>
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>服务内容</span>
          </div>
          <div class="text" v-html="dataList.desc">
              <p>{{dataList.desc}}</p>
          </div>
          <div class="serve_title">
              <img src="@/assets/yuyueIcon/card_tab_01.png" alt="">
              <span>使用说明</span>
          </div>
      </div>
      <div class="richText" v-html="dataList.content">
           {{dataList.content}}
      </div>
      <div class="nodeBtn">
          <van-button block round color="linear-gradient(to right, #d2ae6d, #f3dea8)" @click="purchase(dataList)">立即购买</van-button>
      </div>
  </div>
</template>

<script>
import api from "@/api/yuyueGoodsDetails"
export default {
    data(){
        return{
            dataList: {}
        }
    },
    mounted(){
        var { id } = this.$route.query
        this.apiGetList(id)
    },
    methods: {
        apiGetList(id){
            api.getYyProductByEquity({id}).then(res=>{
                if(res.data.code == 200){
                    this.dataList = res.data.data
                    console.log(this.dataList);
                }
            })
        },
        routerGo(){
            this.$router.go(-1)
        },
        purchase(value){
            this.$store.dispatch("dispatchValue", value)
            this.$router.push({name: "yuyuePurchase"})
        }
    }
}
</script>

<style lang="less" scoped>
.nodeBtn{
    width: 50%;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
}
.richText{
    padding: 0 20px;
    background: #fff;
    margin-top: 13px;
    padding-bottom: 43px;
}
.serve_box{
    background: #fff;
    padding: 1px 13px 4px;
    .serve_title{
        display: flex;
        align-items: center;
        color: #fff;
        background-image: linear-gradient(to right , #222223, #656465);
        padding: 5px 5px;
        border-radius: 1px;
        margin: 10px 0 5px;
        >img{
            width: 18px;
            height: 18px;
            margin-right: 4px;
        }
    }
    .text{
        padding: 0 15px;
        >p{
            color: #888;
            line-height: 20px;
        }
    }
}
 .cell_price{
     background: #fff;
     padding: 14px 20px;
     margin: 6px 0;
     display: flex;
     justify-content: space-between;
     align-items: center;
     /deep/.van-button__text{
        display: block;
        font-size: 12px;
        padding: 0 6px;
     }
     >span{
         color: red;
         font-weight: bold;
         font-size: 18px;
         >i{
            padding-right: 4px;
            font-weight: 500;
         }
     }
 }
.yuyueGoodsDetails{
   background: #f0f0f0;
}
.content{
    padding: 13px;
    background: #fff;
    >img{
       height: 170px;
       border-radius: 8px;
    }
}
</style>