import {
  SHOW_CONNECT,
  HIDE_CONNECT
} from '../mutation-types'

const state = {
  show: true
}

const getters = {
  show: state => state.show
}

const mutations = {
  [SHOW_CONNECT] (state) {
    state.show = true
  },
  [HIDE_CONNECT] (state) {
    state.show = false
  }
}

export default {
  state,
  getters,
  mutations
}
