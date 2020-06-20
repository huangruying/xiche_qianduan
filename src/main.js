import Vue from 'vue'
import App from './App.vue'
// vuex数据
import store from './store'
// 路由
import router from './router/index'
// import AMap from 'vue-amap'
// rem 大小屏幕单位适配
// import 'lib-flexible'
import "lib-flexible/flexible.js";
// https://blog.csdn.net/weixin_44767239/article/details/91975474
// import rem from './rem/remConfig'
// rem()

// 引入第3方ui库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Toast , Lazyload } from 'vant';
Vue.use(Toast);
Vue.use(Lazyload);

// 初始化样式库
import './styles/base.css'
// icon 字体图标库
import './icon/iconfont.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')