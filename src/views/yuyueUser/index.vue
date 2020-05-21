<template>
  <div class="yuyueUser">
      ddd
      <tabbar :active.sync="active"></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar"
export default {
    components: {
        tabbar
    },
    data(){
        return{
            active: 1
        }
    }
}
</script>

<style lang="less" scoped>

</style>