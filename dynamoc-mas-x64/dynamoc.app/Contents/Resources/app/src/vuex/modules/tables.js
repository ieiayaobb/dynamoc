import {
  LIST_TABLES
} from '../mutation-types'

const state = {
  listTables: []
}

const getters = {
  listTables: state => state.listTables
}

const mutations = {
  [LIST_TABLES] (state, listTables) {
    state.listTables = listTables
  }
}

export default {
  state,
  getters,
  mutations
}
