import {
  LIST_TABLES
} from '../mutation-types'

const state = {
  tables: []
}

const getters = {
  tables: state => state.tables
}

const mutations = {
  [LIST_TABLES] (state, response) {
    state.tables = response['TableNames']
  }
}

export default {
  state,
  getters,
  mutations
}
