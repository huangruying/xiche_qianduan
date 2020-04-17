<template>
  <div class="noData">
      <headGo :name="name"></headGo>
      <div class="text">已经没有更多数据</div>
  </div>
</template>

<script>
import headGo from "@/components/head";
export default {
  components: {
    headGo
  },
    data () {
        return {
            name: ""
        }
    },
    mounted () {
        var { name } = this.$route.query
        this.name = name
    }
}
</script>

<style scoped lang="less">
.text{
    text-align: center;
    color: #ccc;
    margin-top: 18px;
}
</style>