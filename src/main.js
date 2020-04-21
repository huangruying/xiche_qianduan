import Vue from 'vue'
import App from './App.vue'
// vuex数据
import store from './store'
// 路由
import router from './router/index'
// import AMap from 'vue-amap'
// 高德离线地图
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
 
// VueAMap.initAMapApiLoader({
//   // 高德key
//   key: 'd6eabbd08f89ccfb74278b36ab6342567', // 自己到官网申请，我随便写的
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer'],
//   v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
//   uiVersion: '1.0.11' // ui版本号，也是需要写
// })
// 引入第3方ui库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Toast } from 'vant';
Vue.use(Toast);
// rem 大小屏幕单位适配
// import 'lib-flexible'
import rem from './rem/remConfig'
rem()

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