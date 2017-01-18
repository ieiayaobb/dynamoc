<template>
  <div class="query-condition">
    <el-row>
      <el-col :span="6">
        <div class="grid-content">
          <el-select v-model="currentKey" placeholder="Key" class="key-select" @change="changeKey">
            <el-option-group
              v-for="eachKey in keys"
              :label="eachKey.label">
              <el-option
                v-for="item in eachKey.options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <el-input
            @change="changeHashKey"
            class="key-input"
            :placeholder="currentKey.hash"
            v-model="hashKeyValue">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <el-input
            class="key-input"
            v-if="currentKey.range"
            :placeholder="currentKey.range"
            v-model="rangeKeyValue">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <el-button type="primary" @click="query">{{ scanOrQuery }}</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    data () {
      return {
        indexName: '',
        currentKey: '',
        scanOrQuery: 'Scan'
      }
    },
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    methods: {
      changeKey: function (value) {
        this.currentKey = value
        this.indexName = value.indexName
      },
      query: function () {
        var payload = {
          'tableName': this.tableName,
          'indexName': this.indexName,
          'hashKey': this.currentKey.hash,
          'rangeKey': this.currentKey.range,
          'hashValue': this.hashKeyValue,
          'rangeValue': this.rangeKeyValue
        }
        this.$store.dispatch('queryWithKey', payload)
      },
      changeHashKey: function (value) {
        if (_.isEmpty(value)) {
          this.scanOrQuery = 'Scan'
        } else {
          this.scanOrQuery = 'Query'
        }
      }
    },
    computed: {
      ...mapGetters({
        primaryKey: 'primaryKey',
        globalSecondaryIndexKeys: 'globalSecondaryIndexKeys'
      }),
      keys: function () {
        var keys = [{
          label: 'Primary Key',
          options: [{
            value: {
              'hash': this.primaryKey.hash,
              'range': this.primaryKey.range
            },
            label: 'Primary Key'
          }]
        }]

        var globalSecondaryIndexArr = []
        _.forEach(this.globalSecondaryIndexKeys, function (globalSecondaryIndexKey) {
          globalSecondaryIndexArr.push({
            value: {
              'indexName': globalSecondaryIndexKey.indexName,
              'hash': globalSecondaryIndexKey.hash,
              'range': globalSecondaryIndexKey.range
            },
            label: globalSecondaryIndexKey.indexName
          })
        })
        keys.push({
          label: 'Global Secendary Index',
          options: globalSecondaryIndexArr
        })
        return keys
      }
    }
  }
</script>

<style scoped>
  .query-condition {
    margin-bottom: 5px;
  }

  .key-select {
    z-index: 1000;
    width: 150px;
  }

  .key-input {
    width: 180px;
  }
</style>