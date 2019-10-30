import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 用require批量引入store文件
const moduleFiles = require.context('./modules', true, /\.js$/);
const modules = [];
moduleFiles.keys().forEach(modulePath => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = moduleFiles(modulePath);
    modules[moduleName] = value.default;
});

const store = new Vuex.Store({
    modules,
})

export default store