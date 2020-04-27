<template>
  <div class="t">
     <!-- <p> {{datalist.msg}}</p>
     <p> {{datalist.code}}</p>
     <p> {{datalist.openid}}</p>
     <p> {{datalist.headimgurl}}</p>
     <p> {{datalist.nickname}}</p> -->
     <p>{{datalist}}</p>
  </div>
</template>

<script>
export default {
    data(){
        return{
            datalist
        }
    },
    created(){
       var data = this.$route.query.name
       this.datalist = data
    //    {"msg":"成功","code":"200","openid":"o2mJowpvsqdZmR1gjCpxjTjeeSW8","sex":"1","headimgurl":"向さん","nickname":"http://thirdwx.qlogo.cn/mmopen/vi_32/iaHJ2Fed7nK5c9x7mibSD0HlricEbtba6Vdw1OlBOLk5Go8OD5ics5hFibpcLyxZnvRo3y3KZ6ogl9wEnf7ykuRTn7Q/132"}
    }
}
</script>

<style>

</style>