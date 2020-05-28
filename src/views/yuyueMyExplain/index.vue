<template>
  <div class="yuyueMyExplain">
    <div class="cell_box">
          <div @click="routerGo"><van-icon name="arrow-left" /></div>
          <span>权益说明</span>
          <div></div>
    </div>
    <div v-html="item">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          item: null
        }
    },
    mounted(){
      this.item = this.$store.getters.item
    },
    methods: {
        routerGo(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>