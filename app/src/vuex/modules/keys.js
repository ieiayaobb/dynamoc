import {
  SET_KEYS
} from '../mutation-types'

import _ from 'lodash'

const state = {
  primaryKey: {},
  globalSecondaryIndexKeys: []
}

const getters = {
  primaryKey: state => state.primaryKey,
  globalSecondaryIndexKeys: state => state.globalSecondaryIndexKeys
}

const mutations = {
  [SET_KEYS] (state, results) {
    state.globalSecondaryIndexKeys = []
    var primaryKey = {}
    _.forEach(results['Table']['KeySchema'], function (key) {
      if (key['KeyType'] === 'HASH') {
        primaryKey.hash = key['AttributeName']
      } else if (key['KeyType'] === 'RANGE') {
        primaryKey.range = key['AttributeName']
      }
    })
    state.primaryKey = primaryKey
    _.forEach(results['Table']['GlobalSecondaryIndexes'], function (globalSecondaryIndex) {
      var indexName = globalSecondaryIndex['IndexName']
      var globalSecondaryIndexKey = {}
      _.forEach(globalSecondaryIndex['KeySchema'], function (key) {
        if (key['KeyType'] === 'HASH') {
          globalSecondaryIndexKey.hash = key['AttributeName']
        } else if (key['KeyType'] === 'RANGE') {
          globalSecondaryIndexKey.range = key['AttributeName']
        }
      })
      globalSecondaryIndexKey['indexName'] = indexName
      state.globalSecondaryIndexKeys.push(globalSecondaryIndexKey)
    })
  }
}

export default {
  state,
  getters,
  mutations
}
