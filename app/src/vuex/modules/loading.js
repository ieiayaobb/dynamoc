import {
  SHOW_LOADING,
  HIDE_LOADING
} from '../mutation-types'

const state = {
  loading: false
}

const getters = {
  loading: state => state.loading
}

const mutations = {
  [SHOW_LOADING] (state) {
    state.loading = true
  },
  [HIDE_LOADING] (state) {
    state.loading = false
  }
}

export default {
  state,
  getters,
  mutations
}
