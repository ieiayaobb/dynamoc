<template>
  <div>
    <el-table
      :data="results"
      border
      height="480"
      v-loading.body="loading">

      <el-table-column
        fixed
        :prop="header['AttributeName']"
        :label="header['AttributeName']"
        v-for="header in headers"
        width="100"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        :prop="key"
        :label="key"
        v-for="key in normal"
        width="150"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        inline-template
        :context="_self"
        fixed="right"
        label="Operation"
        width="120">
        <span>
          <el-button @click.native.prevent="view($index)" type="text" size="small">View</el-button>
          <!-- <el-button @click="deleteRecord" type="text" size="small">Delete</el-button> -->
        </span>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-button-group>
        <!-- <el-button type="primary" icon="arrow-left" @click="prevPage">Previous</el-button> -->
        <el-button type="primary" size="small" @click="nextPage">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    computed: {
      ...mapGetters({
        headers: 'headers',
        results: 'results',
        lastEvaluatedKey: 'lastEvaluatedKey'
      }),
      normal: function () {
        var normalKeys = []
        var freezedKeys = _.map(this.headers, function (header) {
          return header['AttributeName']
        })
        _.map(this.results, function (item) {
          normalKeys = _.concat(normalKeys, _.keys(item))
        })
        return _.pullAll(_.uniq(normalKeys), freezedKeys)
      }
    },
    name: 'dataGrid',
    data () {
      return {
        lastEvaluatedKeys: [],
        loading: false
      }
    },
    methods: {
      view (index) {
        var payload = {}
        var hashValue = this.results[index][this.headers[0]['AttributeName']]
        if (_.isNumber(hashValue)) {
          payload[this.headers[0]['AttributeName']] = {'N': hashValue}
        } else {
          payload[this.headers[0]['AttributeName']] = {'S': hashValue}
        }

        if (this.headers.length > 1) {
          var rangeValue = this.results[index][this.headers[1]['AttributeName']]
          payload[this.headers[1]['AttributeName']] = this.results[index][this.headers[1]['AttributeName']]
          if (_.isNumber(rangeValue)) {
            payload[this.headers[1]['AttributeName']] = {'N': rangeValue}
          } else {
            payload[this.headers[1]['AttributeName']] = {'S': rangeValue}
          }
        }

        payload['tableName'] = this.tableName
        this.$store.dispatch('getRecord', payload)
      },
      deleteRecord () {
      },
      prevPage (e) {
        var lastKey = this.lastEvaluatedKeys.pop()
        this.$store.dispatch('setPreviousResults', {
          'tableName': this.tableName,
          'lastEvaluatedKey': lastKey
        })
      },
      nextPage (e) {
        this.$store.dispatch('setResults', {
          'tableName': this.tableName,
          'lastEvaluatedKey': this.lastEvaluatedKey
        })
      }
    },
    watch: {
      lastEvaluatedKey: function (val, oldVal) {
        console.log(val)
      }
    },
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    created () {
    },
    updated () {
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .key {
    width: 80px;
    display: inline-block;
  }

  .key>span {
    float: right;
  }

  .value {
    margin-left: 20px;
    display: inline-block;
  }

  .value>span {
    float: left;
  }
</style>