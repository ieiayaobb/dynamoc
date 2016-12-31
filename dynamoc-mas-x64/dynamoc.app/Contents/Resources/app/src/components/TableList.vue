<template>
  <div class="table-name-list">
    <div v-for="table_name in listTables" class="table-item" @click="selectTable(table_name)">
      <i class="el-icon-menu"></i><span class="table-name">{{ table_name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableList',
  computed: mapGetters({
    listTables: 'listTables'
  }),
  vuex: {
    getters: {
      listTables: (state) => state.listTables
    }
  },
  created () {
  },
  methods: {
    selectTable: function (tableName) {
      this.$store.dispatch('setResults', {
        'tableName': tableName
      })
      this.$store.dispatch('getHeaders', tableName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-name-list {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 540px;
}

.el-icon-menu {

}
.table-item {
  margin: 10px;
  white-space:nowrap;
  cursor:pointer;
}

.table-name {
  margin-left: 5px;
}
</style>
