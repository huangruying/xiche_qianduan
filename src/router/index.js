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
                title: '我的卡卷'
            }
        },
        {
            path: '/cardParticulars',
            name: 'cardParticulars',
            component: ()=>import('@/views/cardParticulars/index'),
            meta: {
                title: '卡卷详情'
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
                title: '个人中心'
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
    ]
})

router.beforeEach((to, from, next) => {
	// Vue.prototype.$hideLoading();
  if (to.meta.title) {
    document.title = to.meta.title
  }
	next();
})

export default router