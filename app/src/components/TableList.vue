<template>
  <div class="table-name-list-wrapper">
    <div class="table-name-list">
      <div v-for="(table_name,index) in tables" class="table-item" :class="{ active: isActive(index) }" @click="selectTable(table_name, index)">
        <i class="el-icon-document"></i><span class="table-name">{{ table_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableList',
  computed: mapGetters({
    tables: 'tables'
  }),
  data () {
    return {
      realSelectedIndex: this.selectedIndex
    }
  },
  created () {
  },
  methods: {
    selectTable: function (tableName, index) {
      this.$store.dispatch('setResults', {
        'tableName': tableName
      })
      this.$store.dispatch('getHeaders', tableName)
      this.$store.dispatch('setKeys', tableName)
      this.realSelectedIndex = index
    },
    isActive: function (index) {
      return index === this.realSelectedIndex
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-name-list {
  padding-bottom: 10px;
}

.table-name-list-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 580px;
}

.el-icon-menu {

}
.table-item {
  margin: 10px 0;
  white-space:nowrap;
  cursor:pointer;
}

.table-name {
  margin-left: 5px;
}

.table-name:hover {
  color: #58B7FF;
}

.active {
  color: #1D8CE0;
}
</style>
