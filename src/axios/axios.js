import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue';

Vue.use(VueAxios, axios);

const WHITE_LIST = [
    'http: //up.qiniu.com',
    'https://up.qiniu.com',
    'http://upload.qiniup.com',
    'https://upload.qiniup.com',
    'http://up-z1.qiniu.com',
    'https://up-z1.qiniu.com',
    'http://upload-z1.qiniup.com',
    'https://upload-z1.qiniup.com',
    'http://up-z2.qiniu.com',
    'https://up-z2.qiniu.com',
    'http://upload-z2.qiniup.com',
    'https://upload-z2.qiniup.com',
]

// 创建实例
const service = axios.create({
    baseURL: '/',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        // 白名单处理
        console.log(WHITE_LIST);
        // do something before request is sent

        // if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        // config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            Vue.prototype.$Message.error({
                content: res.message || 'Error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                // reload相关
                Vue.prototype.$Message.error({
                    content: res.message || 'Error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Vue.prototype.$Message.error({
            content: error.message,
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service