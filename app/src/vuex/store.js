import Vuex from 'vuex'
import Vue from 'vue'
import connect from './modules/connect'
import result from './modules/result'
import tables from './modules/tables'
import records from './modules/records'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    connect,
    result,
    tables,
    records
  },
  strict: true
})
