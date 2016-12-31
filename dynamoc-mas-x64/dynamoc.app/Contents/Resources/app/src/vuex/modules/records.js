import {
  GET_RECORD,
  HIDE_RECORD
} from '../mutation-types'

const state = {
  recordShow: false,
  record: {}
}

const getters = {
  recordShow: state => state.recordShow,
  record: state => state.record
}

const mutations = {
  [GET_RECORD] (state, record) {
    state.recordShow = true
    state.record = record
  },
  [HIDE_RECORD] (state) {
    state.recordShow = false
  }
}

export default {
  state,
  getters,
  mutations
}
