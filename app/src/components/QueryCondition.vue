<template>
  <div class="query-condition">
    <el-row>
      <el-col :span="6">
        <div class="grid-content">
          <el-select v-model="defaultKey" placeholder="Key" class="key-select">
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
      <el-col :span="9">
        <div class="grid-content">
          <el-input
            class="key-input"
            :placeholder="primaryKey.hash"
            v-model="hashKeyValue">
          </el-input>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content">
          <el-input
            class="key-input"
            v-if="primaryKey.range"
            :placeholder="primaryKey.range"
            v-model="rangeKeyValue">
          </el-input>
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
            value: globalSecondaryIndexKey.indexName,
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
  }

  .key-select {
    width: 150px;
  }

  .key-input {
    width: 180px;
  }
</style>