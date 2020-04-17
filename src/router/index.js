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
            component: ()=>import('@/views/index/index')
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/views/login/index')
        },
    ]
})

// router.beforeEach((to, from, next) => {
// 	Vue.prototype.$hideLoading();
// 	if (to.meta.title) {
//     document.title = to.meta.title
//   }
// 	next();
// })

export default router