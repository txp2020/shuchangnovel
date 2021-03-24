import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 设置Vue原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

// axios拦截器, 在发起请求前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);

    // 

  }

  //必须返回config
  return config;
})


// 注册路由
Vue.use(VueAxios, axios)


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
