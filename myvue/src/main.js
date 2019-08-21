// 使用ES6的模块化语法引用各种模块或文件
import Vue from 'vue' // 引入Vue的类库文件
import App from './App.vue' // 引用根组件
import router from './router' // 引用路由文件
import store from './store' // 引用vuex

// 引入MinUI并使用
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

// 根据不同的环境,配置不同的请求域
const commonUrl = process.env.NODE_ENV == 'development' ? 'http://192.168.50.58:8888' : 'http://47.98.251.7:8888'
// 把请求域添加Vue,然后每个组件都可以直接获取它
Vue.prototype.$commonUrl = commonUrl


//引入配置好的axios
import axios from './assets/js/axios'
// 把axios添加到Vue上,然后每个组件中都可以引用这里的axios
Vue.prototype.$axios = axios


// 实例化,把Vue代码搭载到一个id为app的div上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
