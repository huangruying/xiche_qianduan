<template>
  <div class="evaluate">
      <div class="bgdfff">
        <div class="user_box">
            <img src="@/assets/cardVolume/bgdjuan.png" alt="">
            <div class="text_box">
                <div>普洗轿车</div>
                <span>美容养护</span>
            </div>
        </div>
        <div class="xin">门店环境： <van-rate v-model="value1" size="22px" void-icon="star" /></div>
        <div class="xin">服务质量： <van-rate v-model="value2" size="22px" void-icon="star" /></div>
        <div class="xin">服务态度： <van-rate v-model="value3" size="22px" void-icon="star" /></div>
      </div>
      <div class="qingjia clearFix">
          <div class="biao">评价有礼写点评价即可获得20积分</div>
          <span class="btn" :class="index.id1? 'col': ''" @click="qingjia(0)">洗的很干净</span>
          <span class="btn" :class="index.id2? 'col': ''" @click="qingjia(1)">操作专业</span>
          <span class="btn" :class="index.id3? 'col': ''" @click="qingjia(2)">态度热情</span>
          <span class="btn" :class="index.id4? 'col': ''" @click="qingjia(3)">服务好</span>
      </div>
      <div class="qingjia_input">
          <van-field
            v-model="message"
            rows="4"
            autosize
            label=""
            type="textarea"
            maxlength="100"
            placeholder="说说您的体验和意见吧..."
            show-word-limit
            />
      </div>
      <div class="uploader">
          <van-uploader v-model="fileList" multiple :max-count="4" preview-size="60">
              <div class="uploadder_box">
                  <img src="@/assets/上传照片@2x.png" alt="">
                  <span>上传照片</span>
              </div>
          </van-uploader>
      </div>
      <div class="cell_box">
          <van-checkbox v-model="checked" checked-color="#0F8FFF" shape="square">匿名</van-checkbox>
          <span>您的评价将以匿名的形式展示</span>
      </div>
      <div class="btn_box"><van-button type="info" block>提交</van-button></div>
  </div>
</template>

<script>
export default {
    data () {
        return{
            message: "",
            checked: false,
            value1: 0,
            value2: 0,
            value3: 0,
            index: {
                id1: false,
                id2: false,
                id3: false,
                id4: false,
            },
            fileList: [

            ]
        }
    },
    mounted () {

    },
    methods: {
        qingjia(index){
            if(index === 0){
                this.index.id1 = !this.index.id1
            }else if(index === 1){
                this.index.id2 = !this.index.id2
            }else if(index === 2){
                this.index.id3 = !this.index.id3
            }else if(index === 3){
                this.index.id4 = !this.index.id4
            }
        }
    }
}
</script>

<style lang="less" scoped>
// :active
.btn_box{
    padding: 76px 60px 30px;
    .van-button--block{
        height: 80px;
        border-radius: 50px;
        .van-button__text{
            font-size: 32px;
            letter-spacing: 15px;
        }
    }
}
.cell_box{
    background: #fff;
    padding: 29px 30px;
    margin:  20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /deep/.van-checkbox{
        overflow: visible;
    }
    >span{
        color: #808080;
        font-size:26px;
    }
}
.uploader{
    background: #fff;
    padding: 10px 30px 40px;
    .uploadder_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 15px 25px;
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
.qingjia_input{
    background: #fff;
    padding: 0px 30px 30px;
    /deep/.van-field{
    background: #F6F7FB;
    }
}
.qingjia{ 
    background: #fff;
    margin: 20px 0 0;
    padding: 39px 30px;
    .btn{
        float: left;
        width: 28%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border: 1px solid #CCCCCC;
        border-radius: 30px;
        margin-left: 20px;
        margin-top: 20px;
        &:active{
            background: #F6F7FB;
        }
        &.col{
            background: #0F8FFF;
            border: none;
            color: #fff;
        }
    }
    .biao{
        color: #0F8FFF;
        font-size:28px;
        padding-bottom: 10px;
    }
}
.xin{
    display: flex;
    align-items: center;
    font-size:28px;
    font-weight:400;
    color:rgba(1,1,1,1);
    margin: 35px 0;
}
.user_box{
    display: flex;
    .text_box{
        >span{
            color: #A3A3A3;
            font-size: 24px;
        }
        >div{
            font-size:30px;
            font-weight:bold;
            color:rgba(1,1,1,1);
            padding-bottom: 12px;
        }
    }
    >img{
        width: 82px;
        height: 82px;
        margin-right: 18px;
        border-radius: 8px;
    }
}
.bgdfff{
    background: #fff;
    padding: 30px;
}
.evaluate{
    background: #F5F4F9;
}
</style>