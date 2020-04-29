<template>
  <div class="merchantLogin">
    <div class="input_box">
      <van-form @submit="onSubmit" :show-error="false" label-width="150px">
        <div class="title">基本信息</div>
        <van-field
          required
          v-model="dotAbbreviation"
          name="dotAbbreviation"
          label="网点简称"
          placeholder="请输入网点简称"
          :rules="[{ required: true, message: '请输入网点简称!' }]"
        />
        <van-field
          required
          v-model="dotName"
          name="dotName"
          label="网点名称"
          placeholder="请输入网点名称"
          :rules="[{ required: true, message: '请输入网点名称!' }]"
        />
        <van-field name="carwashId" label="网点类型：" required :rules="[{ validator: asyncValidator , message: '请选择网点类型!' }]">
            <template #input>
                <van-dropdown-menu class="item">
                    <van-dropdown-item v-model="carwashId" :options="carwashList"/>
                </van-dropdown-menu>
            </template>
        </van-field>
        <!-- <van-field name="mechanismId" label="所属机构：" required :rules="[{ validator: asyncValidator , message: '请选择所属机构!' }]">
            <template #input>
                <van-dropdown-menu class="item">
                    <van-dropdown-item v-model="mechanismId" :options="mechanismList"/>
                </van-dropdown-menu>
            </template>
        </van-field> -->
        <van-field
          required
          v-model="mobile"
          name="mobile"
          label="客服电话"
          placeholder="请输入客服电话"
          :rules="[{ required: true, message: '请输入客服电话!' }]"
        />
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
              type="year-month"
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
          readonly 
          v-model="longitude"
          name="longitude"
          label="经度"
          placeholder="请输入经度"
        />
        <van-field
          @click="dialogAmp"
          readonly 
          v-model="latitude"
          name="latitude"
          label="纬度"
          placeholder="请输入纬度"
        />
        <van-field
          v-model="rescueCall"
          name="rescueCall"
          label="救援电话"
          placeholder="请输入救援电话号码"
        />
        <!-- <div class="title">银行账户信息</div>
        <van-field
          name="accountName"
          :value="accountName"
          label="户名"
          placeholder="请输入户名"
        />
        <van-field
          name="account"
          :value="account"
          label="账户"
          placeholder="请输入账户"
        />
        <van-field
          name="openingBank"
          :value="openingBank"
          label="开户行"
          placeholder="请输入开户行"
        /> -->

        <div class="title">网点照片及营业执照</div>
        <div class="uploader">
            <van-uploader v-model="fileList1" multiple :max-count="3" preview-size="60" :after-read="afterRead1" @delete="deletefile1">
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
            style="height:40px;"
            loading-text="注册中..."
          >注册</van-button>
        </div>
      </van-form>
    </div>

    <van-dialog v-model="showDialog" title="点击选取位置" width="300px" show-cancel-button>
      <div class="ditu">

      </div>
    </van-dialog>

  </div>
</template>

<script>
import { cardTitle, letter } from "@/utils/plateNumber";
import { findMechanismName , saveDot } from '@/api/login'
import areaList from '@/utils/area'
import { officialOssUpload } from '@/api/evaluate'
export default {
  data() {
    return {
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
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
        // { text: '代办机构', value: 1 },
      ],
      mechanismList: [],
      storeImage: [],
      receptionImage: [],
      honorImage: [],
      constructionImage: [],
      trafficImage: [],
      businessImage: []
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    dialogAmp(){
      this.showDialog = true
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
      }
      return val
    },
    formatter2(date){
      var year = date.getFullYear();       //年
      this.contractTime = `${year}-${date.getMonth() + 1}`;
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
      var data =  JSON.stringify(values)
      saveDot(data).then(res => {
        if (res.data.code == 200) {
          console.log(res);
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
.ditu{
  padding: 50px 30px;
}
.uploader{
    background: #fff;
    padding: 10px 30px 40px;
    .uploadder_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 15px 20px;
        width: 250px;
        border: 1px solid #808080;
        border-radius: 10px;
        >img{
            width: 39px;
            height: 32px;
        }
        >span{
            display: block;
            margin-top: 10px;
            font-size:24px;
            color: #666;
        }
    }
}
.title{
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
  color: #1989fa;
  font-weight: bold;
}
/deep/.van-picker__toolbar{
  height: 80px;
  >button{
    font-size: 30px;
  }
}
/deep/.van-calendar__confirm {
  height: 80px;
}
.item{
  // /deep/.van-cell__title, /deep/.van-cell__value{
  //   // padding-left: 100px;
  // }
}
/deep/.van-hairline--top-bottom::after{
    border: none;
}
/deep/.van-cell {
  padding: 20px;
  display: flex;
  align-items: center;
}
/deep/.van-dropdown-menu__title::after{
    margin-top: -5px;
    right: -20px;
    border: 5px solid;
    border-color: transparent transparent currentColor currentColor;
}
/deep/.van-dropdown-menu__title {
    line-height: 55px;
}
.input_box {
  padding-top: 20px;
}
.user {
  height: 100vh;
  background: #f7f7f7;
  padding: 25px;
  .title_details {
    color: #808080;
    margin: 21px 0;
    font-size: 26px;
  }
  .title {
    font-weight: 600;
    font-size: 40px;
    color: #010101;
    margin-top: 50px;
  }
}
.van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>