import axios from 'axios'

export const state = () => ({
  user: null,
  users: [],
})

export const actions = {
  async addUsers(state, payload) {
    axios
      .post('http://localhost:3000/users', payload)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        this.dispatch('error/addError', error)
      })
      .finally(() => {
        this.dispatch('loading/setLoading', false)
      })
  },
}
