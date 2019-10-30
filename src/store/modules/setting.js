import setting from '../../setting';
const state = {
    showSetting: setting.showSetting,
    openTagsView: setting.openTagsView,
    fixedHeader: setting.fixedHeader,
    sidebarLogo: setting.sidebarLogo,
}

const mutations = {
    CHANGE_HEADER(state, v) {
        state.fixedHeader = v;
    },
    SHOW_SETTING(state, v) {
        state.showSetting = v;
    }
}

const actions = {
    changeHeader(context, v) {
        context.commit('CHANGE_HEADER', v);
    },
    showSetting(context, v) {
        context.commit('SHOW_SETTING', v);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}