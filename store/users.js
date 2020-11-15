import axios from 'axios'

export const state = () => ({
  user: null,
  users: [],
})

export const mutations = {
  async addUsers(state, payload) {
    axios
      .post('http://localhost:3000/users', payload)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => this.dispatch('error/addError', error))

    // console.log('passe')
    // this.dispatch('error/addError')
  },
}
