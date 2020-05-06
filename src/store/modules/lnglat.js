// 这是存储列表的数据
// mutations就是动态的改变state的值完成页面的同步渲染
// mutations是同步的，只要你在一个组件执行mutations的方法了，那所有的组件只要用到mutations的方法都会同步进行改变，这并不是我们想要的结果，所以，actions来解决问题了，写法一样
export default {
    // state是存储的数据
    // 要设置的全局访问的state对象
    state: {
        center: [116.42792, 39.902896], //经度+纬度
        lngLat: [], //经度+纬度 这是手动选取的
    },
    // mutations对象是函数，默认传值是state，也就是上面的state，所以可以直接操作state.dataList
    // 动态的改变vuex的数据 触发 $store.commit('名',10)  传参直接后面添加即可
    // 唯一可以更改state
    mutations: {
      alterCenter ( state , data) {
        state.center = data
      },
      alterLngLat ( state , data) {
        state.lngLat = data
      }
    },
    // actions和mutations的写法一样，都是函数
    // 但是actions的默认参数是context，context.commit('名')的意思是触发mutations下的Count函数
    // 触发actions的函数 $store.dispatch('名')
    // dispatch方法是官方固定触发actions下函数的方法  官方推荐 , 将异步操作放在 actions 中
    // 触发更改
    actions: {
      // 改变数据
      disCenter( context , view ){
        context.commit('alterCenter' , view)
      },
      disLngLat( context , view ){
        context.commit('alterLngLat' , view)
      }
    },
    // getters用来计算 state 然后生成新的数据 ( 状态 ) 的,它也是默认接受state
    // getters计算的值是不能直接修改的， 需要对应的 state 发生变化才能修改。
    // 实时监听state值的变化（最新状态）
    getters:{
      
    }
  }
  
  
  // vuex的辅助函数mapState、mapGetters、mapActions就可以解决这个问题，办stroe对象那个映射到this