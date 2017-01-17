<template>
  <div class="table-data">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h2>{{ tableName }}</h2>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content">
          <queryCondition :tableName="tableName"></queryCondition>
        </div>
      </el-col>
    </el-row>
    
    <dataGrid :tableName="tableName"></dataGrid>
    <recordDetail :tableName="tableName"></recordDetail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DataGrid from './DataGrid'
  import RecordDetail from './RecordDetail'
  import QueryCondition from './QueryCondition'

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
      DataGrid, RecordDetail, QueryCondition
    }
  }
</script>
<style scoped>
  .table-data {
  }
</style>