import {
  GET_RECORD,
  HIDE_RECORD
} from '../mutation-types'

import _ from 'lodash'

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

    var flattenRecord = _.mapValues(record['Item'], function (ele) {
      return _.values(ele)[0]
    })
    state.record = flattenRecord
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
