<template>
  <div class="yuyueUser">
      <div class="title_top">会员中心</div>
      <div class="boxbgd">
          <!-- 空盒子背景图 -->
          <div class="box"></div>   
          <div class="user_box" v-if="userBox">
              <div class="user_img_box">
                  <img :src="UserList.headimgurl" alt="" v-if="userImg">
                  <img src="@/assets/yuyueIcon/default_user_portrait.png" alt="" v-if="!userImg">
                  <div class="text_box" v-if="!userBoxName" @click="loginUser">
                      <span>点击登录</span>
                  </div>
                  <div class="text_user"  v-if="userBoxName">
                      <span>{{UserList.phone}}</span>
                      <div>{{UserList.nickname}}</div>
                  </div>
              </div>
              <div class="centre_text" @click="purchase">
                <i></i>
                <span>没有开通权益哦！快去购买吧！</span>
                <van-icon name="play" size="21"/>
              </div>
              <div class="bottom_class">
                  协助取票  |  引导进站  |  优先登车  |  全流程服务
              </div>
          </div>
          <div class="card_box" v-if="cardBox">
              <van-swipe autoplay="rf" ref="swipe" height="200" @change="onChange">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image.picfilepath" />
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">
                    {{ current + 1 }} / 4
                    </div>
                </template>
              </van-swipe>
              <van-icon name="arrow-left" class="arrow_left" @click="iconSwipe(1)"/>
              <van-icon name="arrow" class="arrow_right" @click="iconSwipe(2)"/>
          </div>
      </div>
      <div class="my_equity" v-if="myEquity">
          <div class="top">尊享权益</div>
          <van-grid :column-num="5" class="equity_box" :border="false">
                <van-grid-item>
                   <div class="equity_img">
                       <img src="@/assets/yuyueIcon/16.png" alt="">
                       <span>贵宾休息</span>
                   </div>
                </van-grid-item>
                <van-grid-item>
                    <div class="equity_img">
                        <img src="@/assets/yuyueIcon/13.png" alt="">
                        <span>精美茶点</span>
                    </div>
                </van-grid-item>
                <van-grid-item>
                   <div class="equity_img">
                        <img src="@/assets/yuyueIcon/18.png" alt="">
                        <span>书籍</span>
                    </div>
                </van-grid-item>
                <van-grid-item>
                   <div class="equity_img">
                        <img src="@/assets/yuyueIcon/07.png" alt="">
                        <span>WiFi上网</span>
                    </div>
                </van-grid-item>
                <van-grid-item>
                   <div class="equity_img">
                        <img src="@/assets/yuyueIcon/partner.png" alt="">
                        <span>手机充电</span>
                    </div>
                </van-grid-item>
                <van-grid-item>
                   <div class="equity_img">
                        <img src="@/assets/yuyueIcon/partner.png" alt="">
                        <span>视听娱乐</span>
                    </div>
                </van-grid-item>
                <van-grid-item>
                   <div class="equity_img">
                        <img src="@/assets/yuyueIcon/partner.png" alt="">
                        <span>携伴优惠</span>
                    </div>
                </van-grid-item>
            </van-grid>
          <div class="look" @click="yuyueMyExplain">查看权益说明</div>
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
                        <span>我的卡包</span>
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
import api from "@/api/yuyueUser"
export default {
    components: {
        tabbar,
    },
    data(){
        return{
            userImg: false,
            userBox: true,
            cardBox: false,
            userBoxName: false,
            myEquity: false,
            active: 1,
            current: 0,
            images: [ // require('@/assets/yuyueIndex/yuyueIndex.png')
            ],
            UserList: {}
        }
    },
    watch: {
        $route: {
            handler() {
                var phone = this.$route.query.phone;
                if(phone){
                    // this.UserList.phone = localStorage.getItem('phone')
                    var openId = localStorage.getItem("wxUserId")
                    this.apiGetWeiXinByOpenId(openId)
                }
                // 深度监听，同时也可监听到param参数变化
            },
            deep: true,
        }
    },
    mounted(){
        this.getOpenId()
    },
    methods: {
        getOpenId(){
            this.$store.dispatch('alterOpenId', 'o2mJowp-PE2-xcdFlbu6-DDHA8tY')   // 我的openid
            // this.$store.dispatch('alterOpenId', undefined)   // 测试
            var openId = this.$store.getters.openId

            // var openId = localStorage.getItem("wxUserId")  // 上线之后打开
            if(!openId){
                 this.userImg = false
                 this.userBoxName = false
                //  this.loginUser()
             }else{
                 this.userBoxName = true
                 this.apiGetWeiXinByOpenId(openId)
             }
        },
        loginUser(){
            this.$parent.phoneDialog()
        },
        apiGetWeiXinByOpenId(openid){
            api.getWeiXinByOpenId({openid}).then(res=>{
                // console.log(res);
                if(res.data && res.data.code == 200){
                    this.UserList = res.data.data
                    this.$store.dispatch("alterId", res.data.data.id)
                    if(!(this.UserList.phone)){ // 还没有绑定手机号
                        // console.log(this.UserList.phone);
                    }
                    if(this.UserList.yuyueProducts.length <= 0){ // 没有权益
                        this.myEquity = false
                    }else{
                        this.myEquity = true
                        this.userBox = false
                        this.cardBox = true
                        this.images = this.UserList.yuyueProducts
                    }
                    this.userImg = true
                }else{
                    this.loginUser()
                    this.userBoxName = false
                    this.userImg = false
                }
            })
        },
        onChange(index) {
        //   this.$toast('当前 Swipe 索引：' + index);
          this.current = index
        },
        purchase(){
            this.$router.push({name: "yuyueIndex"})
        },
        userTab(index){
            if(index === 0){
                this.$router.push({name: "yuyueMyBuy"})
            }else if(index === 1){
                this.$router.push({name: "yuyueMyTicket"})
            }else if(index === 2){
                if(!(this.UserList.phone)){
                    this.loginUser()
                }else{
                    this.$router.push({name: "yuyueUserData",query: {
                       phone: this.UserList.phone
                    }})
                }
            }else if(index === 3){
                if(!(this.UserList.id)){
                    this.loginUser()
                }else{
                    this.$router.push({name: "yuyueMyCoupon"})
                }
            }else if(index === 4){
                
            }
        },
        yuyueMyExplain(){
            this.$router.push({name: "yuyueMyExplain"})
        },
        iconSwipe(index){
            if(index == 1){
                this.$refs.swipe.prev()
            }else{
                this.$refs.swipe.next()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 3px 6px;
    font-size: 12px;
    background: rgba(37, 37, 37, 0.1);
    border-radius: 5px;
}
/deep/.van-swipe__track{
    height: 0px;
}
/deep/.van-swipe-item{
    img{
        height: 152px;
        border-radius: 8px;
    }
}
.my_equity{
    margin-bottom: 10px;
    .equity_img{
        display: flex;
        align-items: center;
        flex-direction: column;
        >img{
            width: 25px;
            height: 25px;
        }
        >span{
            font-size: 11px;
            color: #777;
            display: block;
            margin-top: 3px;
        }
    }
    .equity_box{
        background: #fff;
    }
    .look{
        background: #fff;
        text-align: right;
        color: #999999;
        padding: 0 13px 13px 0;
        font-size: 13px;
    }
    .top{
        text-align: center;
        padding-bottom: 8px;
        color: #555;
    }
}
.class_my{
    background: #fff;
    margin-bottom: 50px;
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
            background: #dec389;
            height: 130px;
            border-radius: 0 0 40px 40px;
        }
        .card_box{
            // 轮播卡片
            // background: #000;
            height: 152px;
            width: 90%;
            margin: -115px auto 15px;
            border-radius: 8px;
            position: relative;
            .arrow_left{
                font-size: 23px;
                position: absolute;
                top: 50%;
                left: 2px;
                transform: translateY(-50%);
                // background: #000;
                background-color:rgba(37, 37, 37, 0.3);
                color: #fff;
                display: block;
                padding: 3PX;
                border-radius: 50%;
                // opacity: .3;
            }
            .arrow_right{
                font-size: 23px;
                position: absolute;
                top: 50%;
                right: 2px;
                transform: translateY(-50%);
                // background: #000;
                // opacity: .3;
                background-color:rgba(37, 37, 37, 0.3);
                color: #fff;
                border-radius: 50%;
            }
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