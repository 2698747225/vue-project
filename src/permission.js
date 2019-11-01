import router from './router'
import ViewUI from 'view-design';
import Vue from 'vue';
Vue.use(ViewUI);

// 根路由
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});