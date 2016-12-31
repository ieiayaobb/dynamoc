<template>
  <div>
    <h2>{{ tableName }}</h2>
    <dataGrid :tableName="tableName"></dataGrid>
    <recordDetail :tableName="tableName"></recordDetail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DataGrid from './DataGrid'
  import RecordDetail from './RecordDetail'

  export default {
    computed: mapGetters({
      tableName: 'tableName'
    }),
    vuex: {
      getters: {
        tableName: (state) => state.tableName
      }
    },
    name: 'tableData',
    components: {
      DataGrid, RecordDetail
    }
  }
</script>