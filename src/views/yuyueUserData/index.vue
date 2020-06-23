<template>
  <div class="yuyueUserData">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>修改资料</span>
          <div></div>
      </div>
      <div class="user_img_name" v-if="false">
          <van-uploader v-model="fileList" preview-size="60" :max-count="1" :after-read="afterRead">
                <div class="uploadder_box">
                    <img src="@/assets/yuyueIcon/default_user_portrait.png" alt="">
                </div>
          </van-uploader>
          <span>头像</span>
      </div>
      <van-form :show-error="false" @submit="submit" >
        <div class="input_box">
            <van-cell-group class="input_cell">
                <!-- class="nickName" placeholder="请输入真实姓名" :rules="[{ required: true, message: '真实姓名不能为空' }]"-->
                <van-field
                    disabled
                    v-model="nickName"
                    type="text"
                    label="真实姓名"
                />
            </van-cell-group>
            <van-cell-group class="input_cell">
                <van-field
                    v-model="userRawPhone"
                    label="原手机号码"
                    placeholder="请输入原手机号码"
                    :rules="[{ required: true, message: '原手机号码不能为空' },{ validator: mobileDialog2, message: '原手机号码格式错误' }]"
                />
            </van-cell-group>
            <van-cell-group class="input_cell">
                <van-field
                    v-model="userPhone"
                    label="手机号码"
                    placeholder="请输入手机号码"
                    :rules="[{ required: true, message: '手机号码不能为空' },{ validator: mobileDialog, message: '手机号格式错误' }]"
                />
            </van-cell-group>
            <!-- <van-cell-group class="input_cell">
                <van-field
                    v-model="userNname"
                    label="真实姓名"
                    placeholder="请输入真实姓名"
                />
            </van-cell-group> -->
            <van-cell-group class="input_cell">
                    <van-field
                    v-model="phoneCode"
                    placeholder="请输入验证码"
                    label="验证码"
                    maxlength="6"
                    class="code"
                    :rules="[{ required: true, message: '验证码不能为空' }]"
                    />
                <div class="bule" :class="tiems? 'hui' : ''" @click="getPhoneCode">{{phoneCodeText}}</div>
            </van-cell-group>
        </div>
        <div class="btn_box">
          <van-button round color="#3f3f3f" native-type="submit" block>保存</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { sendMsg , updateWeixinUserByPhone} from "@/api/login";
export default {
    data(){
        return{
            fileList: [],
            tiems: false,
            timeId: null,
            userPhone: "",
            userNname: "",
            nickName: "",
            phoneCode: "",
            userRawPhone: "",
            phoneCodeText: "获取验证码",
        }
    },
    mounted(){
        this.nickName = this.$route.query.name
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        },
        mobileDialog() {
            var re = /^1\d{10}$/;
            let str = this.userPhone;
            if (re.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        mobileDialog2() {
            var re = /^1\d{10}$/;
            let str = this.userRawPhone;
            if (re.test(str)) {
                return true;
            } else {
                return false;
            }
        },
        async afterRead(file) {
            // var formData = new FormData()
            // formData.append('file', file.file)
            // var res = await officialOssUpload(formData)
            // if(res.data.code == 200){
            //     this.$toast('上传成功!')
            //     this.storeImage.push(res.data.data)
            // }
        },
        async getPhoneCode(){
            if (this.tiems) {
               return false;
            }
            if (this.mobileDialog()) {
                var res = await sendMsg({
                 phone: this.userPhone //手机号
                });
                if (res.data.code == 400) {
                this.$toast(res.data.msg);
                } else if (res.data.code == 200) {
                this.$toast.success(res.data.msg);
                var num = 60;
                var timeId = this.timeId;
                timeId = setInterval(() => {
                    if (num === 0) {
                    this.phoneCodeText = "获取验证码";
                    clearInterval(timeId);
                    this.tiems = false;
                    } else {
                    this.phoneCodeText = "请等待" + num--;
                    this.tiems = true;
                    }
                }, 1000);
                }
            } else {
                this.$toast('手机号格式错误')
            }
        },
        submit(){
            var phone = this.$store.getters.phone
            if(phone != this.userRawPhone){
                this.$toast("原手机号码错误！")
                return
            }
            updateWeixinUserByPhone({
                phone: this.userRawPhone,  
                newPhone: this.userPhone,
                code: this.phoneCode,
                username: this.nickName
            }).then(res=>{
                if(res.data.code == 200){
                    this.$toast.success('保存成功！')
                    this.$router.push({name: "yuyueUser"})
                }else{
                    this.$toast(res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.btn_box{
    padding: 0 20px;
    margin-top: 50px;
}
.input_box{
    padding: 0 20px;
    margin-top: 20px;
    .input_cell{
        margin-bottom: 12px;
        position: relative;
        .bule {
            position: absolute;
            top: 0;
            right: 0;
            width: 90px;
            height: 45px;
            background: #dec389;
            border-radius: 0.1rem;
            color: #fff;
            text-align: center;
            line-height: 45px;
            &.hui {
            background: #999999;
            }
        }
        .nickName{
            /deep/.van-field__label{
                letter-spacing: 24px;
            }
        }
        .code{
            /deep/.van-field__label{
                letter-spacing: 6.5px;
            }
        }
        /deep/.van-cell{
            background: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 2px;
            /deep/.van-field__label{
                color: #333;
            }
        }
    }
}
.user_img_name{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    >span{
        color: #6699cc;
    }
    /deep/.van-uploader__preview-image{
        width: 90px !important;
        height: 90px !important;
        border-radius: 50%; 
    }
}
.uploadder_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin: 20px auto;
    >img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
}
</style>