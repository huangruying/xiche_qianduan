<template>
  <div class="merchantLogin">
    <div class="input_box">
      <van-form @submit="onSubmit" :show-error="false" label-width="150px">
        <van-field
          required
          v-model="dotAbbreviation"
          name="dotAbbreviation"
          label=" 网点简称"
          placeholder="请输入网点简称"
          :rules="[{ required: true, message: '请输入网点简称!' }]"
        />
        <van-field
          required
          v-model="dotName"
          name="dotName"
          label=" 网点名称"
          placeholder="请输入网点名称"
          :rules="[{ required: true, message: '请输入网点名称!' }]"
        />
        <van-field name="carwashId" label="网点类型：" required :rules="[{ validator: asyncValidator , message: '请选择网点类型!' }]">
            <template #input>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="carwashId" :options="carwashList"/>
                </van-dropdown-menu>
            </template>
        </van-field>
        <van-field name="mechanismId" label="所属机构：" required :rules="[{ validator: asyncValidator , message: '请选择所属机构!' }]">
            <template #input>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="mechanismId" :options="mechanismList"/>
                </van-dropdown-menu>
            </template>
        </van-field>
        <van-field
          required
          v-model="mobile"
          name="mobile"
          label=" 客服电话"
          placeholder="请输入客服电话"
          :rules="[{ required: true, message: '请输入客服电话!' }]"
        />
        <van-field
          required
          v-model="shopowner"
          name="shopowner"
          label=" 经理/店长姓名"
          placeholder="请输入经理/店长姓名"
          :rules="[{ required: true, message: '请输入经理/店长姓名!' }]"
        />
        <van-field
          required
          v-model="storePhone"
          name="storePhone"
          label=" 经理/店长手机号码"
          placeholder="请输入经理/店长手机号码"
          :rules="[{ required: true, message: '请输入经理/店长手机号码!' }]"
        />




        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            size="large"
            style="height:40px;"
          >绑定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { cardTitle, letter } from "@/utils/plateNumber";
import api from "@/api/login";
export default {
  data() {
    return {
      dotAbbreviation: "",
      dotName: "",
      mobile: "",
      shopowner: "",
      storePhone: "",
      mechanismId: 0,
      carwashId: 0,
      carwashList: [
        { text: '车行', value: 0 },
        { text: '代办机构', value: 1 },
      ],
      mechanismList: [
        { text: '测试机构0', value: 0 },
      ]
    };
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      api.saveVehicleUserId(values).then(res => {
        if (res.data.code == 200) {
          this.$toast.success("绑定成功！");
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
// /deep/.van-ellipsis {
//   font-size: 34px;
// }
// /deep/.van-picker__toolbar {
//   height: 80px;
//   line-height: 80px;
//   .van-picker__cancel,
//   .van-picker__title,
//   .van-picker__confirm {
//     font-size: 28px;
//   }
// }
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