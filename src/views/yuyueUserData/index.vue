<template>
  <div class="yuyueUserData">
      <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>修改资料</span>
          <div></div>
      </div>
      <div class="user_img_name">
          <van-uploader v-model="fileList" preview-size="60" :after-read="afterRead">
                <div class="uploadder_box">
                    <img src="@/assets/yuyueIcon/default_user_portrait.png" alt="">
                    <span>头像</span>
                </div>
          </van-uploader>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            fileList: []
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

</style>