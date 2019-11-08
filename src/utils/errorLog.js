import Vue from 'vue';
import store from '@/store/index';

Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    Vue.nextTick(() => {
        store.dispatch('errorlog/addErrorLog', {
            err,
            vm,
            info,
            url: window.location.href
        });
        // console.error(err, info);
    });
}