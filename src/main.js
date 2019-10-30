import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import iView from 'iview'
import {
  filter
} from './shared/filter';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(iView);

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')