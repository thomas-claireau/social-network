export const state = () => ({
  error: null,
})

export const getters = {
  getError: (state) => state.error,
}

export const mutations = {
  ADD_ERROR(state, payload) {
    console.log('mutation - ADD_ERROR')
    console.log(payload)
    state.error = payload
  },
  REMOVE_ERROR(state) {
    state.error = null
  },
}

export const actions = {
  addError({ commit }, payload) {
    console.log('actions - addError')
    if (payload) commit('ADD_ERROR', payload)
  },
  removeError({ commit }) {
    commit('REMOVE_ERROR')
  },
}
