import Vue from 'vue'
import App from './App'
import store from './store/index.js';

//Vue.prototype.$store = store
Vue.config.productionTip = false

// 引入配置文件
import $C from './common/config.js';
Vue.prototype.$C = $C

// 引入请求库
import $H from './common/request.js';
Vue.prototype.$H = $H

// 引入公共函数文件
import $D from './common/common.js';
Vue.prototype.$D = $D

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
