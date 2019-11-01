import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import homePage from '@views/page/home-page';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/homePage',
      component: () => import('@views/home-page'),
      children: [{
          path: '/',
          redirect: 'chartPage'
        }, {
          path: 'chartPage',
          component: () => import('@views/page/charts-page'),
          meta: ['用户分布', '图表']
        },
        {
          path: 'export',
          component: async () => {
            return import('@views/page/xlsx-parse.vue')
          },
          meta: ['用户数据', '导出']
        },
        {
          path: 'import',
          component: async () => {
            return import('@views/page/xlsx-import.vue')
          },
          meta: ['用户数据', '导入']
        },
        {
          path: 'splitPanel',
          component: async () => {
            return import('@views/page/split-panel-demo/split-panel.vue')
          },
          meta: ['组件', '分隔栏']
        },
        {
          path: '404',
          component: async () => {
            return import('@views/page/error/404.vue')
          },
          meta: ['错误页面', '404']
        },
        {
          path: 'imageUpload',
          component: async () => {
            return import('@views/page/image-upload.vue')
          },
          meta: ['组件', '图片上传']
        },
        {
          // 会匹配所有路径
          path: '*',
          redirect: '404',
          meta: ['错误页面', '404']
        }
      ]
    },
    {
      path: 'test',
      component: () => import('@com/charts')
    },
  ]
})