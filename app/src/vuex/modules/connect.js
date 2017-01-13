import {
  SHOW_CONNECT,
  HIDE_CONNECT
} from '../mutation-types'

const state = {
  connectShow: true
}

const getters = {
  connectShow: state => state.connectShow
}

const mutations = {
  [SHOW_CONNECT] (state) {
    state.connectShow = true
  },
  [HIDE_CONNECT] (state) {
    state.connectShow = false
  }
}

export default {
  state,
  getters,
  mutations
}
