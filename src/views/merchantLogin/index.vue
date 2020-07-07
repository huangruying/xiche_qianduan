<template>
  <div class="merchantLogin">
    <div class="cell_box">
        <div @click="routerGo"><van-icon name="arrow-left" /></div>
        <span>商家注册</span>
        <div></div>
    </div>
    <div class="input_box">
      <van-form @submit="onSubmit" :show-error="false" label-width="150px">
        <div class="title">基本信息</div>
        <van-field
          required
          v-model="dotName"
          name="dotName"
          label="网点名称"
          placeholder="请输入网点名称"
          :rules="[{ required: true, message: '请输入网点名称!' }]"
        />
        <van-field
          required
          v-model="dotAbbreviation"
          name="dotAbbreviation"
          label="网点简称"
          placeholder="请输入网点简称"
          :rules="[{ required: true, message: '请输入网点简称!' }]"
        />
        <van-field name="carwashId" label="网点类型：" required :rules="[{ validator: asyncValidator , message: '请选择网点类型!' }]">
            <template #input>
                <van-dropdown-menu class="item">
                    <van-dropdown-item v-model="carwashId" :options="carwashList"/>
                </van-dropdown-menu>
            </template>
        </van-field>
        <van-field name="mechanismId" label="所属机构：" required :rules="[{ validator: asyncValidator , message: '请选择所属机构!' }]">
            <template #input>
                <van-dropdown-menu class="item">
                    <van-dropdown-item v-model="mechanismId" :options="mechanismList"/>
                </van-dropdown-menu>
            </template>
        </van-field>
        <van-field
          required
          v-model="shopowner"
          name="shopowner"
          label="经理/店长姓名"
          placeholder="请输入经理/店长姓名"
          :rules="[{ required: true, message: '请输入经理/店长姓名!' }]"
        />
        <van-field
          required
          v-model="storePhone"
          name="storePhone"
          label="经理/店长手机号码"
          placeholder="请输入经理/店长手机号码"
          :rules="[{ required: true, message: '请输入经理/店长手机号码!' },{ validator: phone , message: '手机号格式不正确!' }]"
        />
        <!-- <van-field
          required
          v-model="charge"
          name="charge"
          label="负责人"
          placeholder="请输入负责人姓名"
          :rules="[{ required: true, message: '请输入负责人姓名!' }]"
        />
        <van-field
          required
          v-model="chargePhone"
          name="chargePhone"
          label="负责人手机号"
          placeholder="请输入负责人手机号码"
          :rules="[{ required: true, message: '请输入负责人手机号码!' }]"
        /> -->
        <van-field
          required
          v-model="recommender"
          name="recommender"
          label="网点推荐人"
          placeholder="请输入网点推荐人"
          :rules="[{ required: true, message: '请输入网点推荐人!' }]"
        />
        <van-field
          required
          v-model="dotAddress"
          name="dotAddress"
          label="网点地址"
          placeholder="请输入网点地址"
          :rules="[{ required: true, message: '请输入网点地址!' }]"
        />
        <van-field
          required
          v-model="address"
          name="address"
          label="详细地址"
          placeholder="请输入详细地址"
          :rules="[{ required: true, message: '请输入详细地址!' }]"
        />
        <van-field
          required
          readonly
          clickable
          name="area"
          :value="value"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
          :rules="[{ required: true, message: '请选择省市区!' }]"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirmArea"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          required
          readonly
          clickable
          name="contractTime"
          :value="contractTime"
          label="合同到期时间"
          placeholder="点击选择日期"
          @click="showTime = true"
          :rules="[{ required: true, message: '请选择合同到期时间!' }]"
        />
        <van-popup v-model="showTime" position="bottom">
            <van-datetime-picker
              v-model="contractTime2"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
               @confirm="formatter2"
               @cancel="showTime = false"
            />
        </van-popup>
        <van-field
          required
          readonly
          clickable
          name="businessHours1"
          :value="businessHours1"
          label="开始营业时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择开始营业时间!' }]"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            type="time"
            @confirm="onConfirmHours"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          required
          readonly
          clickable
          name="businessHours2"
          :value="businessHours2"
          label="结束营业时间"
          placeholder="点击选择时间"
          @click="showPicker2 = true"
          :rules="[{ required: true, message: '请选择结束营业时间!' }]"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-datetime-picker
            type="time"
            @confirm="onConfirmHours2"
            @cancel="showPicker2 = false"
          />
        </van-popup>
        <van-field
          @click="dialogAmp"
          required
          readonly 
          v-model="lnglat"
          name="lnglat"
          label="经度/纬度"
          placeholder="点击选择经纬度"
          :rules="[{ required: true, message: '请选择经纬度!' }]"
        />
        <van-field
          v-model="mobile"
          name="mobile"
          label="客服电话"
          placeholder="请输入客服电话"
        />
        <van-field
          v-model="rescueCall"
          name="rescueCall"
          label="救援电话"
          placeholder="请输入救援电话号码"
        />
        <div class="title">银行账户信息</div>
        <van-field
          required
          name="accountName"
          v-model="accountName"
          label="户名"
          placeholder="请输入户名"
          :rules="[{ required: true, message: '请输入户名!' }]"
        />
        <van-field
          required
          name="account"
          v-model="account"
          label="账户"
          placeholder="请输入账户"
          :rules="[{ required: true, message: '请输入账户!' }]"
        />
        <van-field
          required
          name="openingBank"
          v-model="openingBank"
          label="开户行"
          placeholder="请输入开户行"
          :rules="[{ required: true, message: '请输入开户行!' }]"
        />

        <div class="title">网点照片及营业执照</div>
        <div class="uploader">
            <van-uploader v-model="fileList1" multiple :max-count="4" preview-size="60" :after-read="afterRead1" @delete="deletefile1">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传店面形象照片</span>
                </div>
            </van-uploader>
        </div>
        <div class="uploader">
            <van-uploader v-model="fileList2" multiple :max-count="1" preview-size="60" :after-read="afterRead2" @delete="deletefile2">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传接待室照片</span>
                </div>
            </van-uploader>
        </div>
        <div class="uploader">
            <van-uploader v-model="fileList3" multiple :max-count="1" preview-size="60" :after-read="afterRead3" @delete="deletefile3">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传其他荣誉照片</span>
                </div>
            </van-uploader>
        </div>
        <div class="uploader">
            <van-uploader v-model="fileList4" multiple :max-count="1" preview-size="60" :after-read="afterRead4" @delete="deletefile4">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传施工车间照片</span>
                </div>
            </van-uploader>
        </div>
        <div class="uploader">
            <van-uploader v-model="fileList5" multiple :max-count="1" preview-size="60" :after-read="afterRead5" @delete="deletefile5">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传交通许可证</span>
                </div>
            </van-uploader>
        </div>
        <div class="uploader">
            <van-uploader v-model="fileList6" multiple :max-count="1" preview-size="60" :after-read="afterRead6" @delete="deletefile6">
                <div class="uploadder_box">
                    <img src="@/assets/上传照片@2x.png" alt="">
                    <span>上传工商营业照片</span>
                </div>
            </van-uploader>
        </div>

        <div style="margin: 16px;">
          <van-button
            round
            block
            :loading="loading"
            type="info"
            native-type="submit"
            size="large"
            loading-text="注册中..."
            color="#3f3f3f"
          >注册</van-button>
        </div>
      </van-form>
    </div>

    <!-- 改新页面获取位置 -->
    <!-- <van-dialog v-model="showDialog" title="点击选取位置" width="300px" show-cancel-button>
      <div class="ditu">
        <div id="container"></div> 
      </div>
    </van-dialog> -->

  </div>
</template>

<script>
import { cardTitle, letter } from "@/utils/plateNumber";
import { findMechanismName , saveDot , findCarwashTypesInfos } from '@/api/login'
import api from '@/api/index'
import areaList from '@/utils/area'
import { officialOssUpload } from '@/api/evaluate'
import wx from "weixin-js-sdk";
// import AMap from "@/utils/AMap"
export default {
  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      center: [116.42792, 39.902896], //经度+纬度
      lnglat: "",
      account: "",
      openingBank: "",
      accountName: "",
      value: '',
      address: "",
      areaList: areaList, 
      businessHours2: "",
      businessHours1: "",
      dotAddress: "",
      recommender: "",
      latitude: "",
      longitude: "",
      chargePhone: "",
      charge: "",
      dotAbbreviation: "",
      dotName: "",
      mobile: "",
      shopowner: "",
      storePhone: "",
      rescueCall: "",
      mechanismId: 0,
      carwashId: 0,
      contractTime: "",
      province: "",
      city: "",
      region: "",
      provinceId: "",
      cityId: "",
      contractTime2: new Date(),
      showTime: false,
      showPicker: false,
      showPicker2: false,
      showArea: false,
      loading: false,
      showDialog: false,
      defaultDate: new Date,
      minDate: new Date(2015, 0, 1),
      maxDate: new Date(2030, 0, 20),
      carwashList: [
        { text: '车行', value: 0 },
        { text: '代办机构', value: 1 },
      ],
      mechanismList: [],
      storeImage: [],
      receptionImage: [],
      honorImage: [],
      constructionImage: [],
      trafficImage: [],
      businessImage: [],
      serviceItemList: []
    };
  },
  mounted() {
    this.getData()
    this.wxLocation()
    // var lnglat = this.$store.getters.lngLat
    // this.lnglat = lnglat[0] + "/" + lnglat[1]
    // console.log(lnglat);
    this.serviceItem() // 服务项数据
  },
  watch: {
    $route: {
          handler() {
              var { lng , lat } = this.$route.query;
              if(lng && lat){
                  this.lnglat = lng + "/" + lat
                  this.latitude = lat
                  this.longitude = lng
              }
              // 深度监听，同时也可监听到param参数变化
        },
        deep: true,
    }
  },
  methods: {
    routerGo() {
      this.$router.go(-1);
    },
    // 服务项数据
    serviceItem(){
      findCarwashTypesInfos().then(res=>{
        console.log(res);
        this.serviceItemList = res.data
        this.serviceItemList.forEach(v=>{
          v.id = v.dtId
          var obj = {
            id: v.dtId
          }
          v.carwashsTypes.forEach(i=>{
            obj.ids = i.id
            i.strObj = JSON.stringify(obj) // 2级id字符串
          })
        })
         console.log(this.serviceItemList);
      })
    },
    dialogAmp(){
      this.$router.push({name: 'location'})
      // this.showDialog = true
    },
    wxLocation(){
        api.getParameter({url: window.location.href}).then(res=>{
            this.wxRegister(res.data.noncestr,res.data.timestamp,res.data.signature)
        })
    },
     // 微信地理位置
    wxRegister(noncestr,timestamp,signature) {
      var this2 = this
        wx.config({
          debug: false, // true:调试时候弹窗
          appId: "wx1008eb4c001227c4", // 微信appid
          timestamp: timestamp, // 时间戳
          nonceStr: noncestr, // 随机字符串
          signature: signature, // 签名
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "scanQRCode", // 微信扫一扫功能
            "openLocation" //微信地理位置
          ]
        });
        wx.ready(res => {
          wx.getLocation({
            success: function(res) {
              var pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              var wxaccuracy = res.accuracy; // 位置精度
              var lnglat = [pointX, pointY];
              this2.$store.dispatch('disCenter',lnglat) // vuex存起来
            },
            cancel: function(res) {
              // this.getLocation()
            }
          });
        });
        /* 处理失败验证 */
        wx.error(function(res) {
          // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
          // alert("微信sdk配置失败！ " + res.errMsg);
        });
    },
    async getData(){
       var res = await findMechanismName()
       this.mechanismList = res.data.data
       await this.mechanismList.map(v=>{
           v.text = v.mechanismName
           v.value = v.id
           delete v.mechanismName
           delete v.id
           delete v.createTime
       })
       this.mechanismId = this.mechanismList[0].value
    },
    async afterRead1(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.storeImage.push(res.data.data)
        }
    },
    deletefile1(file,fileIndex){
      this.storeImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    async afterRead2(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.receptionImage.push(res.data.data)
        }
    },
    deletefile2(file,fileIndex){
      this.receptionImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    async afterRead3(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.honorImage.push(res.data.data)
        }
    },
    deletefile3(file,fileIndex){
      this.honorImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    async afterRead4(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.constructionImage.push(res.data.data)
        }
    },
    deletefile4(file,fileIndex){
      this.constructionImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    async afterRead5(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.trafficImage.push(res.data.data)
        }
    },
    deletefile5(file,fileIndex){
      this.trafficImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    async afterRead6(file) {
        var formData = new FormData()
        formData.append('file', file.file)
        var res = await officialOssUpload(formData)
        if(res.data.code == 200){
            this.$toast('上传成功!')
            this.businessImage.push(res.data.data)
        }
    },
    deletefile6(file,fileIndex){
      this.businessImage.splice(fileIndex.index,1)
      this.$toast('已删除该照片!')
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }else if (type === 'day') {
        return `${val}日`;
      }
      return val
    },
    formatter2(date){
      var year = date.getFullYear();       //年
      this.contractTime = `${year}-${date.getMonth() + 1}-${date.getDate()}`;
      this.showTime = false;
    },
    onConfirmHours(time) {
      this.businessHours1 = time;
      this.showPicker = false;
    },
    onConfirmHours2(time){
      this.businessHours2 = time;
      this.showPicker2 = false;
    },
    onConfirmArea(values) {
      this.value = values.map((item) => item.name).join('/');
      this.province = values[0].name
      this.city = values[1].name
      this.region = values[2].name
      this.regionId = values[2].code
      this.showArea = false
      this.provinceId = values[0].code
      this.cityId = values[1].code
    },
    async onSubmit(values) {
      this.loading = true
      values.businessImage = JSON.stringify(this.businessImage) 
      values.trafficImage = JSON.stringify(this.trafficImage)
      values.constructionImage = JSON.stringify(this.constructionImage)
      values.honorImage = JSON.stringify(this.honorImage)
      values.receptionImage = JSON.stringify(this.receptionImage)
      values.storeImage = JSON.stringify(this.storeImage)
      values.businessHours = this.businessHours1 + '-' + this.businessHours2
      values.province = this.province
      values.city = this.city
      values.region = this.region
      values.regionId = this.regionId
      values.provinceId = this.provinceId
      values.cityId = this.cityId
      values.latitude = this.latitude
      values.longitude = this.longitude
      delete values.area  
      delete values.businessHours1
      delete values.businessHours2
      delete values.lnglat
      var data = values
      // console.log(data);
      saveDot(data).then(res => {
        if (res.data.code == 200) {
          var obj = res.data.data
          var obj = JSON.stringify(obj)
          localStorage.setItem('userMerchant',obj)
          this.$toast.success("注册成功！");
          this.$router.push({name: 'merchantIndex'})
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    phone(val) {
      return /^1[0-9]{10}$/.test(val);
    },
    asyncValidator(){
        return true
        // if(this.carwashId === 0){
        //     return true
        // }else{
        //     return false
        // }
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  width:300px;
  height: 180px; 
}  
.ditu{
  padding: 25px 15px;
}
.uploader{
    background: #fff;
    padding: 5px 15px 20px;
    .uploadder_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 8px 10px;
        width: 125px;
        border: .5px solid #808080;
        border-radius: 5px;
        >img{
            width: 20px;
            height: 16px;
        }
        >span{
            display: block;
            margin-top: 5px;
            font-size: 12px;
            color: #666;
        }
    }
}
.title{
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 5px;
  color: #1989fa;
  font-weight: bold;
}
// /deep/.van-picker__toolbar{
//   height: 80px;
//   >button{
//     font-size: 30px;
//   }
// }
// /deep/.van-calendar__confirm {
//   height: 80px;
// }
.item{
  // /deep/.van-cell__title, /deep/.van-cell__value{
  //   // padding-left: 100px;
  // }
}
/deep/.van-dropdown-menu {
  height: 18px;
}
/deep/.van-hairline--top-bottom::after{
    border: none;
}
/deep/.van-cell {
  // padding: 10px 0;
  display: flex;
  align-items: center;
  // line-height: 0;
}
/deep/.van-dropdown-menu__title::after{
    // margin-top: -2.5px;
    // right: -20px;
    // border: 2.5px solid;
    // border-color: transparent transparent currentColor currentColor;
}
// /deep/.van-dropdown-menu__title {
//     line-height: 25px;
// }
.input_box {
  padding-top: 10px;
}
.user {
  height: 100vh;
  background: #f7f7f7;
  padding: 13px;
  .title_details {
    color: #808080;
    margin: 11px 0;
    font-size: 13px;
  }
  .title {
    font-weight: 600;
    font-size: 20px;
    color: #010101;
    margin-top: 25px;
  }
}
.van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>