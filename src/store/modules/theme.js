const THEME = '#1890ff'
const state = {
    theme: THEME,
}

const mutations = {
    CHANGE_THEME(state, theme) {
        if (theme)
            state.theme = theme || THEME;
    },
}

const actions = {
    changeTheme(context, theme) {
        context.commit('CHANGE_THEME', theme);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}