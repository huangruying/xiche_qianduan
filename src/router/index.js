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