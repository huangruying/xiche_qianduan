<template>
  <div class="yuyueUser">
      <div class="title_top">会员中心</div>
      <div class="boxbgd">
          <div class="box"></div>
          <div class="user_box">
              <div class="user_img_box">
                  <img src="@/assets/yuyueIcon/default_user_portrait.png" alt="">
                  <div class="text_box">
                      <span>点击登录</span>
                  </div>
                  <div class="text_user"  v-if="false">
                      <span>13729014409</span>
                      <div>胡椒粉</div>
                  </div>
              </div>
              <div class="centre_text">
                <i></i>
                <span>没有开通权益哦！快去购买吧！</span>
                <van-icon name="play" size="21"/>
              </div>
              <div class="bottom_class">
                  协助取票  |  引导进站  |  优先登车  |  全流程服务
              </div>
          </div>
      </div>
      <div class="class_my">
          <span>常用功能</span>
          <div>
            <van-grid :column-num="4">
                <van-grid-item @click="userTab(0)">
                   <div class="tab_img">
                       <img src="@/assets/yuyueIcon/16.png" alt="">
                       <span>购买记录</span>
                   </div>
                </van-grid-item>
                <van-grid-item @click="userTab(1)">
                    <div class="tab_img">
                        <img src="@/assets/yuyueIcon/13.png" alt="">
                        <span>我的券包</span>
                    </div>
                </van-grid-item>
                <van-grid-item @click="userTab(2)">
                   <div class="tab_img">
                        <img src="@/assets/yuyueIcon/18.png" alt="">
                        <span>修改资料</span>
                    </div>
                </van-grid-item>
                <van-grid-item @click="userTab(3)">
                   <div class="tab_img">
                        <img src="@/assets/yuyueIcon/07.png" alt="">
                        <span>我的优惠券</span>
                    </div>
                </van-grid-item>
                <van-grid-item @click="userTab(4)">
                   <div class="tab_img">
                        <img src="@/assets/yuyueIcon/partner.png" alt="">
                        <span>我的携伴</span>
                    </div>
                </van-grid-item>
            </van-grid>
          </div>
      </div>
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
    },
    methods: {
        userTab(index){
            if(index === 0){

            }else if(index === 1){

            }else if(index === 2){
                this.$router.push({name: "yuyueUserData"})
            }else if(index === 3){
                
            }else if(index === 4){
                
            }
        }
    }
}
</script>

<style lang="less" scoped>
.class_my{
    background: #fff;
    // /deep/.van-grid-item__content::after{
    //     // border-width: 0 1px 1px 0;
    //     // border: 1px solid #999;
    // }
    .tab_img{
        display: flex;
        align-items: center;
        flex-direction: column;
        >img{
            width: 27px;
            height: 27px;
        }
        >span{
            font-size: 12px;
            color: #999;
            display: block;
            margin-top: 6px;
        }
    }
    >span{
        font-size: 13.5px;
        display: block;
        padding: 8px 23px;
    }
}
.yuyueUser{
    background: #f0f0f0;
    height: 100vh;
    .boxbgd{
        .bottom_class{
            color: #d1ae83;
            text-align: center;
            margin-top: 25px;
            font-size: 13px;
        }
        .centre_text{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            margin-top: 8px;
            padding: 0 10px;
            >span{
                font-size: 16px;
            }
        }
        .box{
            background: #d1ae84;
            height: 130px;
            border-radius: 0 0 40px 40px;
        }
        .user_box{
            background: #000;
            height: 152px;
            width: 90%;
            margin: -115px auto 15px;
            .user_img_box{
                padding: 12px 15px;
                display: flex;
                .text_user{
                    color: #fff;
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    >span{
                        font-size: 11px;
                    }
                    >div{
                        margin-top: 4px;
                    }
                }
                .text_box{
                    display: flex;
                    align-items: center;
                    >span{
                        color: #d1af85;
                        font-size: 12px;
                    }
                }
                >img{
                    width: 43px;
                    height: 43px;
                    border-radius: 50%;
                    margin-right: 9px;
                }
            }
        }
    }
    .title_top{
        background: #3f3f3f;
        padding: 10px 0;
        margin: 0 auto;
        color: #fff;
        text-align: center;
    }
}
</style>