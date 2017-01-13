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
      var value = _.values(ele)[0]
      if (_.isObject(value)) {
        return JSON.stringify(value)
      } else if (_.isBoolean(value)) {
        if (value) {
          return 'true'
        } else {
          return 'false'
        }
      } else {
        return value
      }
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
