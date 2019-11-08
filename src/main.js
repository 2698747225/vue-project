import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import './permission';
import iView from 'iview'
import {
  filter
} from './shared/filter';
import 'iview/dist/styles/iview.css';
import {
  showLoading,
  hideLoading
} from './shared/loading';
import '@/utils/errorLog';

Vue.config.productionTip = false
Vue.use(iView);

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

// 全局混入
Vue.mixin({
  methods: {
    showLoading,
    hideLoading
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')