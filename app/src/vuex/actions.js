import {
  scan,
  query,
  connect,
  list,
  record,
  info
} from '../api/index'

import {
    SHOW_CONNECT,
    HIDE_CONNECT,

    GET_TABLE_HEADERS,
    GET_TABLE_INFO,
    SET_RESULTS,
    GET_RECORD,
    HIDE_RECORD,
    LIST_TABLES,
    SET_KEYS,
    SHOW_LOADING,
    HIDE_LOADING
} from '../vuex/mutation-types'
import _ from 'lodash'

export const showConnect = ({ commit }) => {
  commit(SHOW_CONNECT)
}

export const hideConnect = ({ commit }) => {
  commit(HIDE_CONNECT)
}

export const trigConnect = ({ commit, dispatch }, payload) => {
  connect(payload.host, payload.accessKey, payload.accessSecret)
  dispatch('hideConnect')
  dispatch('listTables')
}

export const setResults = ({ commit }, payload) => {
  return scan(payload.tableName, payload.lastEvaluatedKey).then((response) => {
    response['tableName'] = payload.tableName
    commit(SET_RESULTS, response)
  })
}

export const queryWithKey = ({ commit, dispatch }, payload) => {
  console.log(payload)
  if (_.isEmpty(payload.hashValue)) {
    return dispatch('setResults', {
      'tableName': payload.tableName
    })
  }
  return query(payload.tableName, payload.indexName, payload.hashKey, payload.rangeKey, payload.hashValue, payload.rangeValue).then((response) => {
    response['tableName'] = payload.tableName
    commit(SET_RESULTS, response)
  })
}

export const setPreviousResults = ({ commit }, payload) => {
  return scan(payload.tableName, payload.lastEvaluatedKey).then((response) => {
    response['tableName'] = payload.tableName
    commit(SET_RESULTS, response)
  })
}

export const getRecord = ({ commit }, payload) => {
  var tableName = payload['tableName']
  delete payload.tableName
  return record(tableName, payload).then((response) => {
    commit(GET_RECORD, response)
  })
}

export const hideRecord = ({ commit }) => {
  commit(HIDE_RECORD)
}

export const showLoading = ({ commit }) => {
  commit(SHOW_LOADING)
}

export const hideLoading = ({ commit }) => {
  setTimeout(function () {
    commit(HIDE_LOADING)
  }, 3000)
}

export const getHeaders = ({ commit }, tableName) => {
  return info(tableName).then((response) => {
    commit(GET_TABLE_HEADERS, response)
  })
}

export const getInfo = ({ commit }, tableName) => {
  return info(tableName).then((response) => {
    commit(GET_TABLE_INFO, response)
  })
}

export const listTables = ({ commit }) => {
  return list().then((response) => {
    commit(LIST_TABLES, response)
  })
}

export const setKeys = ({ commit }, tableName) => {
  return info(tableName).then((response) => {
    commit(SET_KEYS, response)
  })
}
