const state = {
    errorLogs: []
}

const mutations = {
    ADD_ERROR(state, item) {
        state.errorLogs.push(item);
    },
    CLEAR_ERROR(state) {
        state.errorLogs = [];
    }
}

const actions = {
    addErrorLog({
        commit
    }, log) {
        commit('ADD_ERROR', log)
    },
    clearErrorLog({
        commit
    }) {
        commit('CLEAR_ERROR')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}