<template>
  <div class="orderManagement">
      <div class="title_box" style="margin-bottom: 2px;">
          <span @click="routerIndex(0)">首页</span>
          <van-icon name="arrow" />
          <span>订单管理</span>
      </div>
      <div style="overflow-y: scroll;background: #fff;">
        <div class="order_box" @click="orderParticulars(value)" v-for="(value,index) in dataList" :key="index">
            <div class="index">{{ index + 1 }}.</div>
            <div class="order">
                    <div class="order_title">{{value.projectName}}</div>  
                    <span>服务商家： {{value.garageName}}</span>
                    <span>下单时间： {{value.placeTime}} </span>
                    <span>车牌号码： {{value.licensePlate}}</span>
            </div>
            <div class="state">已结算</div>
        </div>
      </div>
      <div v-if="nodata" class="nodata">暂无数据~</div>
      <van-button type="default" block @click="routerGo">返回</van-button>
  </div>
</template>

<script>
import api from '@/api/merchantIndex'
export default {
    data (){
        return{
            dataList: [],
            nodata: false
        }
    },
    mounted(){
        var obj = localStorage.getItem("userMerchant");
        var obj = JSON.parse(obj);
        if(obj === null){
            this.$toast('请先登录！')
            this.$router.push({name: 'merchantIndex'})
        }else{
            this.apiGetList(obj)
        }
    },
    methods: {
        apiGetList(obj){
            api.findServiceOrderById({id:obj}).then(res=>{
                if(res.data.data && res.data.data.length > 0){
                    this.dataList = res.data.data
                }else{
                    this.nodata = true
                }
            })
        },
        routerIndex(index){
            if(index === 0){
                this.$router.push( { name: 'merchantIndex' } )
            }
        },
        routerGo(){
            this.$router.go(-1)
        },
        orderParticulars(value){
            this.$store.dispatch('alterList',value)
            this.$router.push({name: 'orderParticulars'})
        }
    }
}
</script>

<style lang="less" scoped>
.nodata{
    text-align: center;
    margin: 35px 0 15px;
}
.orderManagement{
    height: 100vh;
    background: #f8f8f8;
    .order_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin: 9px 7px 0 6px;
        .order{
            flex: 1;
            .order_title{
                font-size: 17px;
                font-weight: 600;
                margin-bottom: 5px;
                color: #333;
            }
            >span{
                display: block;
                color: #333;
                line-height: 20px;
            }
        }
        .state{
            font-weight: bold;
            text-align: right;
            width: 100px;
            color: '#333';
        }
        .index{
            font-weight: bold;
            width: 27.5px;
        }
    }
}
/deep/.van-button--block{
    width: 80%;
    height: 40px;
    color: #079fd5;
    font-size: 16px;
    margin: 40px auto;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 4px;
}
</style>