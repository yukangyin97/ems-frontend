import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from "element-ui/src/mixins/locale";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";

import './assets/css/icon.css';

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
  locale
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
