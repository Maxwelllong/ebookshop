import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    active: ''
  },
  mutations: {
    toActive(state) {
      this.active = state
    }
  },
  actions: {},
  modules: {}
})
