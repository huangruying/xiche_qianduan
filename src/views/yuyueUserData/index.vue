<template>
  <div class="yuyueUserData">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>修改资料</span>
          <div></div>
      </div>
      <div class="user_img_name">
          <van-uploader v-model="fileList" preview-size="60" :max-count="1" :after-read="afterRead">
                <div class="uploadder_box">
                    <img src="@/assets/yuyueIcon/default_user_portrait.png" alt="">
                </div>
          </van-uploader>
          <span>头像</span>
      </div>
      <div class="input_box">
        <van-cell-group class="input_cell">
            <van-field
                v-model="userPhone"
                label="手机号码"
                placeholder="请输入手机号码"
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
                v-model="nickName"
                label="昵称"
                placeholder="请输入昵称"
                class="nickName"
            />
        </van-cell-group>
      </div>
      <div class="btn_box">
          <van-button round color="#3f3f3f" block>保存</van-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            fileList: [],
            userPhone: "",
            userNname: "",
            nickName: ""
        }
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
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
    }
}
</script>

<style lang="less" scoped>
.btn_box{
    padding: 0 20px;
    margin-top: 35px;
}
.input_box{
    padding: 0 20px;
    .input_cell{
        margin-bottom: 12px;
        .nickName{
            /deep/.van-field__label{
                letter-spacing: 24px;
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