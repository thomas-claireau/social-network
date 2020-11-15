export const state = () => ({
  loading: false,
})

export const getters = {
  getLoading: (state) => state.loading,
}

export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
}
