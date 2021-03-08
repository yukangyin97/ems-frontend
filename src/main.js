import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from "element-ui/src/mixins/locale";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueAxios from 'vue-axios'

import './assets/css/icon.css';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;  // allow cookies to be carried across domains

Vue.use(ElementUI, {
  size: 'small',
  locale
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/login' || to.path === '/404' || to.path === '/401') {
    next();
  } else {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo.user.token === '') {
      Vue.prototype.$message.warning('Please login first');
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
