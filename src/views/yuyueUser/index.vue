<template>
  <div class="yuyueUser">
    <div class="title_top">会员中心</div>
    <div class="boxbgd">
      <!-- 空盒子背景图 -->
      <div class="box">
        <div class="box_user" v-if="cardBox">
          <img :src="UserList.headimgurl" alt v-if="userImg" />
          <img src="@/assets/yuyueIcon/default_user_portrait.png" alt v-if="!userImg" />
          <div class="text_box" v-if="!userBoxName" @click="loginUser">
            <span>点击登录</span>
          </div>
          <div class="text_user" v-if="userBoxName">
            <span>{{UserList.phone}}</span>
            <div>{{UserList.nickname}}</div>
          </div>
        </div>
      </div>
      <div class="user_box" v-if="userBox">
        <div class="user_img_box">
          <img :src="UserList.headimgurl" alt v-if="userImg" />
          <img src="@/assets/yuyueIcon/default_user_portrait.png" alt v-if="!userImg" />
          <div class="text_box" v-if="!userBoxName" @click="loginUser">
            <span>点击登录</span>
          </div>
          <div class="text_user" v-if="userBoxName">
            <span>{{UserList.phone}}</span>
            <div>{{UserList.nickname}}</div>
          </div>
        </div>
        <div class="centre_text" @click="purchase">
          <i></i>
          <span>没有开通权益哦！快去购买吧！</span>
          <van-icon name="play" size="21" />
        </div>
        <div class="bottom_class">协助取票 | 引导进站 | 优先登车 | 全流程服务</div>
      </div>
      <div class="card_box" v-if="cardBox">
        <van-swipe autoplay="hah" ref="swipes" height="200" @change="onChange">
          <van-swipe-item v-for="(image, index) in images" :key="index" @click="swipeQR(image)">
            <img v-lazy="image.picfilepath" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
          </template>
        </van-swipe>
        <van-icon
          name="arrow-left"
          class="arrow_left"
          @click="iconSwipe(1)"
          v-if="images.length>1"
        />
        <van-icon name="arrow" class="arrow_right" @click="iconSwipe(2)" v-if="images.length>1" />
      </div>
    </div>
    <div class="my_equity" v-if="myEquity">
      <div class="top">尊享权益</div>
      <van-grid :column-num="5" class="equity_box" :border="false">
        <van-grid-item v-for="(item,idx) in images[current].services" :key="idx">
          <div class="equity_img">
            <img :src="item.serviceIcon" alt />
            <span>{{item.serviceName}}</span>
          </div>
        </van-grid-item>
      </van-grid>
      <div class="look" @click="yuyueMyExplain(images[current].equityBrief)">查看权益说明</div>
    </div>
    <div class="class_my" style="overflow-y: scroll; padding-bottom: 90px;">
      <span>常用功能</span>
      <div>
        <van-grid :column-num="4">
          <van-grid-item @click="userTab(0)">
            <div class="tab_img">
              <img src="@/assets/yuyueIcon/16.png" alt />
              <span>购买记录</span>
            </div>
          </van-grid-item>
          <van-grid-item @click="userTab(1)">
            <div class="tab_img">
              <img src="@/assets/yuyueIcon/13.png" alt />
              <span>我的卡包</span>
            </div>
          </van-grid-item>
          <van-grid-item @click="userTab(2)">
            <div class="tab_img">
              <img src="@/assets/yuyueIcon/18.png" alt />
              <span>修改资料</span>
            </div>
          </van-grid-item>
          <van-grid-item @click="userTab(3)">
            <div class="tab_img">
              <img src="@/assets/yuyueIcon/07.png" alt />
              <span>我的优惠券</span>
            </div>
          </van-grid-item>
          <van-grid-item @click="userTab(4)">
            <div class="tab_img">
              <img src="@/assets/yuyueIcon/partner.png" alt />
              <span>我的携伴</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 弹窗,原来单张卡权益，后面升级可能会保留，勿删 -->
    <!-- <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
            <div class="dialog">
                <div class="dialog_text">{{card.card}}</div>
                <div class="dialog_ying">{{card.name}}</div>
                <div class="dialog_qr"><div id="qrcode" class="qrcode" ref="ref_qr"></div></div>
                <div class="dialog_txt">请扫描二维码</div>
                <div class="dialog_img">
                    <span v-if="blCard"><van-icon name="arrow-left" /><span>左右滑动切换卡包</span> <van-icon name="arrow" /></span>
                </div>
            </div>
        </div>
    </van-overlay>-->
    <transition name="van-fade">
      <div v-if="overlayShow" @click="overlayShow = false">
        <div class="dialog-cover">
          <div @click.stop class="click_stop">
            <van-swipe @change="onChange2" :loop="true" indicator-color="#d4b06f">
              <van-swipe-item v-for="(item,index) in arrCard" :key="index">
                <div class="dialog">
                  <div class="dialog_text">{{item.card}}</div>
                  <div class="dialog_ying">{{item.name}}</div>
                  <div class="dialog_textName">{{item.iname}}</div>
                  <div class="dialog_qr">
                    <div :id="'qrcode' + index" class="qrcode" ref="ref_qr"></div>
                  </div>
                  <div class="dialog_txt">请扫描二维码</div>
                  <div class="dialog_img">
                    <span v-if="blCard">
                      <van-icon name="arrow-left" />
                      <span>左右滑动切换会员卡</span>
                      <van-icon name="arrow" />
                    </span>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
            <div class="indicator_current2">{{ current2 + 1 }} / {{ arrCard.length }}</div>
          </div>
        </div>
      </div>
    </transition>
    <tabbar :active.sync="active"></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
import api from "@/api/yuyueUser";
import QRCode from "qrcodejs2";
export default {
  components: {
    tabbar,
    QRCode
  },
  data() {
    return {
      show: false,
      userImg: false,
      userBox: true,
      cardBox: false,
      userBoxName: false,
      myEquity: false,
      overlayShow: false,
      blCard: false,
      active: 1,
      current: 0,
      current2: 0,
      images: [
        // require('@/assets/yuyueIndex/yuyueIndex.png')
      ],
      UserList: {},
      card: {},
      arrCard: []
    };
  },
  watch: {
    $route: {
      handler() {
        var phone = this.$route.query.phone;
        if (phone) {
          // this.UserList.phone = localStorage.getItem('phone')
          var openId = localStorage.getItem("wxUserId");
          this.apiGetWeiXinByOpenId(openId);
        }
        // 深度监听，同时也可监听到param参数变化
      },
      deep: true
    }
  },
  comments: {
    // value.replace(value.substring(4, value.length - 4), '****')
  },
  mounted() {
    this.getOpenId()
    // this.loginUser() // 测试绑定手机号
  },
  created() {
    // this.getOpenId()
  },
  activated() {
    // 页面缓存时走这里
    this.getOpenId();
  },
  methods: {
    swipeQR(card) {
      // 单卡权益弹窗
      // this.show = true
      // this.card = card
      // 调用二维码 注意：在需要调用的地方,这样必须这样调用,否则会出现 appendChild null 就是id为qrcode的dom获取不到,返回结果为null
      // this.$nextTick (function () {
      //   this.qrcode(card.card);
      // })
      // this.$refs.ref_qr.innerHTML = ""
      // console.log(card.serviceCard);
      this.overlayShow = true
      this.arrCard = card.serviceCard
      if (card.serviceCard.length > 1) {
        this.blCard = true;
      }
      this.arrCard.forEach((v, i) => {
        this.applyCode(v, i);
      });
    },
    applyCode(item, idCode) {
      var idIndex = "qrcode" + idCode;
      this.$nextTick(function() {
        this.qrcode(item.card, idIndex); // 二维码内容及id
      });
      // this.$refs.ref_qr.innerHTML = ""
    },
    getOpenId() {
      // this.$store.dispatch('alterOpenId', 'o2mJowp-PE2-xcdFlbu6-DDHA8tY')   // 我的openid
      // var openId = this.$store.getters.openId
      // localStorage.setItem("wxUserId",'o2mJowuCwy7R__H2fAKc9nLoCyd0')
      var openId = localStorage.getItem("wxUserId"); // 上线之后打开
      if (!openId) {
        this.userImg = false;
        this.userBoxName = false;
        //  this.loginUser()
      } else {
        this.userBoxName = true;
        this.apiGetWeiXinByOpenId(openId);
      }
    },
    //  生成二维码
    qrcode(cardNumber, idCode) {
      let that = this;
      let qrcode = new QRCode(idCode, {
        width: 124,
        height: 124, // 高度
        text: cardNumber // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',   // 背景色
        // foreground: '#ff0'    // 前景色
      });
    },
    loginUser() {
      this.$parent.phoneDialog();
    },
    apiGetWeiXinByOpenId(openid) {
      api.getWeiXinByOpenId({ openid }).then(res => {
        // console.log(res);
        if (res.data && res.data.code == 200) {
          this.UserList = res.data.data;
          this.$store.dispatch("alterId", res.data.data.id);
          this.userImg = true;
          if (!this.UserList.phone) {
            // 还没有绑定手机号
            // console.log(this.UserList.phone);
          } else {
            // vuex存储手机号,修改手机号会用到
            this.$store.commit("alterPhone", res.data.data.phone);
            // 截取手机号保密信息，记得用的是备份资料
            this.UserList.phone = this.UserList.phone.replace(
              this.UserList.phone.substring(3, this.UserList.phone.length - 4),
              "****"
            );
          }
          if (
            !this.UserList.yuyueProducts ||
            this.UserList.yuyueProducts.length <= 0
          ) {
            // 没有权益
            this.myEquity = false;
          } else {
            this.myEquity = true;
            this.userBox = false;
            this.cardBox = true;
            this.images = this.UserList.yuyueProducts;
          }
          // 其他页面跳转过来的，需要强制刷新页面
          this.$forceUpdate();
        } else {
          this.loginUser();
          this.userBoxName = false;
          this.userImg = false;
        }
      });
    },
    onChange(index) {
      this.current = index;
    },
    onChange2(index) {
      this.current2 = index;
    },
    purchase() {
      this.$router.push({ name: "yuyueIndex" });
    },
    userTab(index) {
      if (index === 0) {
        if (!this.UserList.phone) {
          this.loginUser();
        } else {
          this.$router.push({ name: "yuyueMyBuy" });
        }
      } else if (index === 1) {
        if (!this.UserList.phone) {
          this.loginUser();
        } else {
          var id = this.$store.getters.userID;
          this.$router.push({
            name: "yuyueMyTicket",
            query: {
              uid: id
            }
          });
        }
      } else if (index === 2) {
        if (!this.UserList.phone) {
          this.loginUser();
        } else {
          this.$router.push({
            name: "yuyueUserData",
            query: {
              name: this.UserList.username
            }
          });
        }
      } else if (index === 3) {
        if (!this.UserList.phone) {
          this.loginUser();
        } else {
          this.$router.push({ name: "yuyueMyCoupon" });
        }
      } else if (index === 4) {
      }
    },
    yuyueMyExplain(item) {
      this.$store.dispatch("dispatchItem", item);
      this.$router.push({ name: "yuyueMyExplain" });
    },
    iconSwipe(index) {
      if (index == 1) {
        this.$refs.swipes.prev();
      } else {
        this.$refs.swipes.next();
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-grid-item__content::after {
  z-index: auto;
}
/deep/.van-swipe__indicators {
  bottom: 1px;
}
// 最外层 设置position定位
.dialog {
  // position: relative;
  color: #2e2c2d;
  font-size: 16px;
}
// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
.dialog-cover {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /deep/.van-swipe {
    width: 276px !important;
    height: 330px !important;
  }
}
//   内容，记得定宽高阻止事件冒泡
.click_stop {
  width: 276px !important;
  height: 330px !important;
  margin: 2.67rem auto;
}
.dialog {
  background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  text-align: center;
  border-radius: 0.3rem;
  .dialog_img {
    display: flex;
    justify-content: center;
    height: 1.2rem;
    > span {
      display: flex;
      align-items: center;
      color: #777777;
    }
    > img {
      width: 1rem;
      height: 1rem;
      margin: 0.2rem 0.28rem;
    }
  }
  .dialog_txt {
    text-align: center;
    font-size: 0.3rem;
    font-family: PingFang SC;
    color: #333;
    margin: 0.3rem 0;
  }
  .dialog_textName {
    text-align: center;
    color: #000;
  }
  .dialog_text {
    font-size: 0.36rem;
    text-align: center;
    margin: 0.1rem 0;
    color: #000;
  }
  .dialog_ying {
    font-size: 0.5rem;
    color: #d4b06f;
    text-align: center;
    margin: 0.2rem 0;
  }
  /*固定宽高*/
  .dialog_qr {
    height: 3.6rem;
    width: 3.6rem;
    background: #08a0ff;
    margin: 0 auto;

    /*内容自适应*/
    /deep/.qrcode {
      width: 100% !important;
      height: 100% !important;
    }

    /*生成的二维码里面的img标签宽高自适应*/
    /deep/.qrcode img {
      width: 100% !important;
      height: 100% !important;
    }
    /*一开始生成的canvas也要进行宽高自适应*/
    /deep/.qrcode canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
//   单卡权益样式
// .dialog {
//   background-image: url("../../assets/yuyueIcon/dizhuo@2x.png");
//   background-repeat: no-repeat;
//   background-size: cover;
//   position: relative;
//   padding-bottom: 0.2rem;
//   padding-top: 0.2rem;
//   width: 75%;
//   margin: 2.67rem auto;
//   border-radius: 0.3rem;
//   &::before {
//     content: "";
//     width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background: #000;
//     position: absolute;
//     top: 4rem;
//     right: -0.5rem;
//     opacity: 0;
//   }
//   &::after {
//     content: "";
//     width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background: #000;
//     position: absolute;
//     top: 4rem;
//     left: -0.5rem;
//     opacity: 0;
//   }
//   .dialog_img {
//     display: flex;
//     justify-content: center;
//     height: 1.4rem;
//     > img {
//       width: 1rem;
//       height: 1rem;
//       margin: 0.2rem 0.28rem;
//     }
//   }
//   .dialog_txt {
//     text-align: center;
//     font-size: 0.3rem;
//     font-family: PingFang SC;
//     color: #333;
//     margin: 0.3rem 0;
//   }
//   .dialog_text {
//     font-size: 0.36rem;
//     text-align: center;
//     margin: 0.1rem 0;
//     color: #000;
//   }
//   .dialog_ying {
//     font-size: 0.5rem;
//     color: #d4b06f;
//     text-align: center;
//     margin: 0.2rem 0;
//   }
//    /*固定宽高*/
//   .dialog_qr {
//     height: 3.6rem;
//     width: 3.6rem;
//     background: #08a0ff;
//     margin: 0 auto;

//     /*内容自适应*/
//     /deep/.qrcode{
//         width: 100% !important;
//         height: 100% !important;
//     }

//     /*生成的二维码里面的img标签宽高自适应*/
//     /deep/.qrcode img{
//         width: 100% !important;
//         height: 100% !important;
//     }
//     /*一开始生成的canvas也要进行宽高自适应*/
//     /deep/.qrcode canvas{
//         width: 100% !important;
//         height: 100% !important;
//     }
//   }
// }
.indicator_current2 {
  position: absolute;
  right: 5px;
  top: 420px;
  // padding: 3px 7px;
  font-size: 14px;
  // background: rgba(37, 37, 37, 0.1);
  border-radius: 5px;
  // background: #fff;
  color: #fff;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 3px 6px;
  font-size: 12px;
  background: rgba(37, 37, 37, 0.1);
  border-radius: 5px;
  z-index: 9;
}
/deep/.van-swipe__track {
  height: 0px;
}
/deep/.van-swipe-item {
  img {
    height: 152px;
    border-radius: 8px;
  }
}
.my_equity {
  margin-bottom: 10px;
  .equity_img {
    display: flex;
    align-items: center;
    flex-direction: column;
    > img {
      width: 25px;
      height: 25px;
    }
    > span {
      font-size: 11px;
      color: #777;
      display: block;
      margin-top: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .equity_box {
    background: #fff;
  }
  .look {
    background: #fff;
    text-align: right;
    color: #999999;
    padding: 0 13px 13px 0;
    font-size: 13px;
  }
  .top {
    text-align: center;
    padding-bottom: 8px;
    color: #555;
  }
}
.class_my {
  background: #fff;
  margin-bottom: 50px;
  // /deep/.van-grid-item__content::after{
  //     // border-width: 0 1px 1px 0;
  //     // border: 1px solid #999;
  // }
  .tab_img {
    display: flex;
    align-items: center;
    flex-direction: column;
    > img {
      width: 27px;
      height: 27px;
    }
    > span {
      font-size: 12px;
      color: #999;
      display: block;
      margin-top: 6px;
    }
  }
  > span {
    font-size: 13.5px;
    display: block;
    padding: 8px 23px;
  }
}
.yuyueUser {
  background: #f0f0f0;
  height: 100vh;
  position: relative;
  .boxbgd {
    .box_user {
      padding: 12px 23px 0;
      display: flex;
      .text_user {
        color: #3f3f3f;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > span {
          font-size: 11px;
        }
        > div {
          margin-top: 4px;
        }
      }
      .text_box {
        display: flex;
        align-items: center;
        > span {
          color: #d1af85;
          font-size: 12px;
        }
      }
      > img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
    }
    .bottom_class {
      color: #d1ae83;
      text-align: center;
      margin-top: 25px;
      font-size: 13px;
    }
    .centre_text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      margin-top: 8px;
      padding: 0 10px;
      > span {
        font-size: 16px;
      }
    }
    .box {
      background: #dec389;
      height: 130px;
      border-radius: 0 0 40px 40px;
    }
    .card_box {
      // 轮播卡片
      // background: #000;
      height: 152px;
      width: 90%;
      // margin: -115px auto 15px;
      margin: -70px auto 15px;
      border-radius: 8px;
      position: relative;
      .arrow_left {
        font-size: 23px;
        position: absolute;
        top: 50%;
        left: 2px;
        transform: translateY(-50%);
        // background: #000;
        background-color: rgba(37, 37, 37, 0.3);
        color: #fff;
        display: block;
        padding: 3px;
        border-radius: 50%;
        // opacity: .3;
      }
      .arrow_right {
        font-size: 23px;
        position: absolute;
        top: 50%;
        right: 2px;
        transform: translateY(-50%);
        // background: #000;
        // opacity: .3;
        background-color: rgba(37, 37, 37, 0.3);
        color: #fff;
        display: block;
        padding: 3px;
        border-radius: 50%;
      }
    }
    .user_box {
      background: #000;
      height: 152px;
      width: 90%;
      margin: -115px auto 15px;
      .user_img_box {
        padding: 12px 15px;
        display: flex;
        .text_user {
          color: #fff;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          > span {
            font-size: 11px;
          }
          > div {
            margin-top: 4px;
          }
        }
        .text_box {
          display: flex;
          align-items: center;
          > span {
            color: #d1af85;
            font-size: 12px;
          }
        }
        > img {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          margin-right: 9px;
        }
      }
    }
  }
  .title_top {
    background: #3f3f3f;
    padding: 10px 0;
    margin: 0 auto;
    color: #fff;
    text-align: center;
  }
}
</style>