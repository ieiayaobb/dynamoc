<template>
  <div>
    <el-table
      v-loading.body="loading"
      :data="results"
      border
      height="480">
      <el-table-column
        fixed
        :prop="headers['hash']"
        :label="headers['hash']"
        width="100"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        fixed
        :prop="headers['range']"
        :label="headers['range']"
        v-if="headers['range'] != ''"
        width="100"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        :prop="key"
        :label="key"
        v-for="key in headers.normal"
        width="180"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        inline-template
        :context="_self"
        fixed="right"
        label="操作"
        width="100">
        <span>
          <el-button @click.native.prevent="handleClick($index)" type="text" size="small">查看</el-button>
          <el-button @click="deleteRecord" type="text" size="small">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-button-group>
        <el-button type="primary" icon="arrow-left" @click="prevPage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters({
      results: 'results',
      headers: 'headers',
      lastEvaluatedKey: 'lastEvaluatedKey'
    }),
    name: 'dataGrid',
    methods: {
      handleClick (index) {
        var payload = {}
        payload[this.headers['hash']] = this.results[index][this.headers['hash']]

        if (this.headers['range'] !== '') {
          payload[this.headers['range']] = this.results[index][this.headers['range']]
        }

        payload['tableName'] = this.tableName
        this.$store.dispatch('getRecord', payload)
      },
      deleteRecord () {
      },
      prevPage (e) {
        this.$store.dispatch('setPreviousResults', {
          'tableName': this.tableName
        })
      },
      nextPage (e) {
        this.$store.dispatch('setResults', {
          'tableName': this.tableName,
          'lastEvaluatedKey': this.lastEvaluatedKey
        })
      }
    },
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    vuex: {
      getters: {
        results: (state) => state.results,
        headers: (state) => state.headers,
        lastEvaluatedKey: (state) => state.lastEvaluatedKey
      }
    },
    created () {
    },
    updated () {
    }
  }
</script>