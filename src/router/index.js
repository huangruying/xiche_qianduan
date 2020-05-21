import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router= new Router({
    routes: [
        {
            name: 'default',
            path: '/',
            // 默认打开首页，为了提高用户体验
            redirect: { name: 'index' }
        },
        {
            path: '/index',
            name: 'index',
            component: ()=>import('@/views/index/index'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/views/login/index'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/particulars',
            name: 'particulars',
            component: ()=>import('@/views/particulars/index'),
            meta: {
                title: '门店详情'
            }
        },
        {
            path: '/user',
            name: 'user',
            component: ()=>import('@/views/user/index'),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: '/cardVolume',
            name: 'cardVolume',
            component: ()=>import('@/views/cardVolume/index'),
            meta: {
                title: '我的卡券'
            }
        },
        {
            path: '/cardParticulars',
            name: 'cardParticulars',
            component: ()=>import('@/views/cardParticulars/index'),
            meta: {
                title: '卡券详情'
            }
        },
        {
            path: '/evaluate',
            name: 'evaluate',
            component: ()=>import('@/views/evaluate/index'),
            meta: {
                title: '发表评价'
            }
        },
        {
            path: '/merchantIndex',
            name: 'merchantIndex',
            component: ()=>import('@/views/merchantIndex/index'),
            meta: {
                title: '商家中心'
            }
        },
        {
            path: '/information',
            name: 'information',
            component: ()=>import('@/views/information/index'),
            meta: {
                title: '养车资讯'
            }
        },
        {
            path: '/upkeep',
            name: 'upkeep',
            component: ()=>import('@/views/upkeep/index'),
            meta: {
                title: '夏季保养'
            }
        },
        {
            path: '/relation',
            name: 'relation',
            component: ()=>import('@/views/relation/index'),
            meta: {
                title: '联系我们'
            }
        },
        {
            path: '/oil',
            name: 'oil',
            component: ()=>import('@/views/oil/index'),
            meta: {
                title: '机油查询'
            }
        },
        {
            path: '/userAccount',
            name: 'userAccount',
            component: ()=>import('@/views/userAccount/index'),
            meta: {
                title: '个人账户'
            }
        },
        {
            path: '/orderManagement',
            name: 'orderManagement',
            component: ()=>import('@/views/orderManagement/index'),
            meta: {
                title: '订单管理'
            }
        },
        {
            path: '/redeemCode',
            name: 'redeemCode',
            component: ()=>import('@/views/redeemCode/index'),
            meta: {
                title: '兑换码核销',
                keepAlive: true, //此组件需要被缓存
            }
        },
        {
            path: '/platform',
            name: 'platform',
            component: ()=>import('@/views/platform/index'),
            meta: {
                title: '平台核销'
            }
        },
        {
            path: '/orderParticulars',
            name: 'orderParticulars',
            component: ()=>import('@/views/orderParticulars/index'),
            meta: {
                title: '订单详情',
                keepAlive: false, //此组件不需要被缓存
            }
        },
        {
            path: '/merchantLogin',
            name: 'merchantLogin',
            component: ()=>import('@/views/merchantLogin/index'),
            meta: {
                title: '商家注册',
                keepAlive: true, // 此组件需要被缓存
                isBack:false, //用于判断上一个页面是哪个
            }
        },
        {
            path: '/accredit',
            name: 'accredit',
            component: ()=>import('@/views/accredit/index'),
            meta: {
                title: '授权'
            }
        },
        {
            path: '/location',
            name: 'location',
            component: ()=>import('@/views/location/index'),
            meta: {
                title: '选择位置',
            }
        },
        {
            path: '/orderDetails',
            name: 'orderDetails',
            component: ()=>import('@/views/orderDetails/index'),
            meta: {
                title: '订单详情',
            }
        },
        {
            path: '/yuyueIndex',
            name: 'yuyueIndex',
            component: ()=>import('@/views/yuyueIndex/index'),
            meta: {
                title: '愉悦商旅',
            }
        },
        {
            path: '/yuyueUser',
            name: 'yuyueUser',
            component: ()=>import('@/views/yuyueUser/index'),
            meta: {
                title: '会员中心',
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
	// Vue.prototype.$hideLoading();
  if (to.meta.title) {
    document.title = to.meta.title // 设置当前页面的title
  }
  if(from.name=='location'){
    to.meta.keepAlive = true;
    //判断是从哪个路由过来的，
    //如果是location过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
  }
  next();
})

export default router