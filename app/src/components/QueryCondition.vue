<template>
  <div class="query-condition">
    <el-row>
      <el-col :span="6">
        <div class="grid-content">
          <el-select v-model="defaultKey" placeholder="Key" class="key-select" @change="changeKey">
            <el-option-group
              v-for="group in keys"
              :label="group.label">
              <el-option
                v-for="item in group.options"
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
            class="key-input"
            :placeholder="defaultKey.hash"
            v-model="hashKeyValue">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <el-input
            class="key-input"
            v-if="defaultKey.range"
            :placeholder="defaultKey.range"
            v-model="rangeKeyValue">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <el-button type="primary" @click="query">Query</el-button>
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
        defaultKey: 'primaryKey'
      }
    },
    methods: {
      changeKey: function (item) {
        this.defaultKey = item
      },
      query: function () {
        console.log(this.defaultKey)
        console.log(this.hashKeyValue)
        console.log(this.rangeKeyValue)
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
            value: 'primaryKey',
            label: 'Primary Key'
          }]
        }]

        var globalSecondaryIndexArr = []
        _.forEach(this.globalSecondaryIndexKeys, function (globalSecondaryIndexKey) {
          globalSecondaryIndexArr.push({
            value: {
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
    width: 150px;
  }

  .key-input {
    width: 180px;
  }
</style>