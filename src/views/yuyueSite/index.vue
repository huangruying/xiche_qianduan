<template>
  <div class="yuyueSite">
      <div class="cell_boxs" @click="showPopup = true">
          <span>选择城市</span>
          <div>
              <div>{{text}}</div>
              <van-icon name="arrow" />
          </div>
      </div>
      <div style="overflow-y: scroll;background: #f0f0f0;">
          <div class="guest" @click="guestIndex(value)" v-for="(value,index) in dataList" :key="index">
              <b>{{value.hallName}}</b>
              <p>{{value.hallLocation}}</p>
              <div class="phone">
                  <span>营业时间: {{value.businessHours}}</span>
                  <van-icon name="phone" color="#4ad617" size="25" @click.stop @click="servicePhone(value.servicePhone)"/>
              </div>
          </div>
      </div>
      <van-empty description="对不起，暂无数据" style="overflow-y: scroll;" v-if="noData"/>
      <tabbar :active.sync="active"></tabbar>
      <van-popup v-model="showPopup" position="bottom" :style="{ height: '40%' }">
          <van-picker
            title="选择城市"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
            :default-index="defaultIndex"
            />
      </van-popup>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar"
import province from "@/utils/area"
import api from "@/api/yuyueSite"
export default {
    components: {
        tabbar
    },
    data(){
        return{
            noData: false,
            active: 2,
            columns: [],
            showPopup: false,
            text: "",
            defaultIndex: "",
            dataList: []
        }
    },
    mounted(){
        this.remouldData()
    },
    methods: {
        servicePhone(phoneNumber){
            window.location.href = 'tel://' + phoneNumber
        },
        guestIndex(value){
            this.$store.dispatch('alterSite',value)
            this.$router.push({name: "yuyueNodeDetails"})
        },
        getLngLatLocation() {
            var cat = this
            AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch()
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                   // 查询成功，result即为当前所在城市信息
                   cat.text = result.province
                   var adcode = result.adcode.slice(0,2)
                   var adcodes = adcode + "0000" // 去除精准度
                   cat.apiGetList(adcodes)
                   cat.columns.forEach((v,index)=>{
                       if(v.id == adcodes){
                          cat.defaultIndex = index
                       }
                   })
                  // 440000
                  // console.log('通过ip获取当前城市：',result)
                }
              })
            })
        },
        remouldData(){
            var arr = []
            for(let key  in province.province_list){
                var obj = {
                    id: key,
                    text: province.province_list[key]
                }
                arr.push(obj)
            }
            this.columns = arr
            this.getLngLatLocation()
        },
        apiGetList(provinceId){
            api.findOfficialYyStations({provinceId}).then(res=>{
                if(!(res.data.data)){
                    this.noData = true
                    this.dataList = []
                }else{
                    this.dataList = res.data.data
                    this.noData = false
                }
            })
        },
        onConfirm(value, index) {
            this.text = value.text
            this.showPopup = false
            this.apiGetList(value.id)
        },
        onChange(picker, value, index) {
          
        },
        onCancel() {
            this.showPopup = false
        },
    }
}
</script>

<style lang="less" scoped>
.guest{
    padding: 15px 12px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-bottom: 1.5px solid #f3f3f3;
    // &:active{
    //     background: #ccc;
    // }
    >b{
        font-size: 15px;
        font-weight: 600;
        display: block;
        margin-bottom: 7px;
    }
    >p{
        color: #888;
    }
    .phone{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 18px;
        >i{
            background: #e8f4e8;
            border-radius: 50%;
            padding: 5px;
            display: block;
            &:active{
                background: #ccc;
            }
        }
        >span{
            color: #888;
        }
    }
}
.yuyueSite{
     background: #f0f0f0;
     height: 100vh;
    .cell_boxs{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 15px;
        background: #fff;
        margin-bottom: 8px;
        &:active{
            background: #f7f7f7;
        }
        >span{
            font-weight: bold;
            font-size: 13.5px;
        }
        >div{
            display: flex;
            align-items: center;
            >div{
                padding-right: 6px;
            }
        }
    }
}
</style>