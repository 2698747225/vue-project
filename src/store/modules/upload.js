const state = {
    qiniuaddr: 'http://q05zllqfu.bkt.clouddn.com', // 七牛图片外链地址
    domain: 'https://upload-z2.qiniup.com' // 七牛上传地址
};

const mutations = {
    CHANGE_QINIUADDR(state, v) {
        if (v)
            state.qiniuaddr = v;
    },
    CHANGE_DOMAIN(state, v) {
        if (v)
            state.domain = v;
    }
}

const actions = {
    changeQiniuaddr(context, v) {
        context.commit('CHANGE_QINIUADDR', v);
    },
    changeDomain(context, v) {
        context.commit('CHANGE_DOMAIN', v);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}