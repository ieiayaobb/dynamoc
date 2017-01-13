<template>
  <div>
    <el-dialog :title="tableName" v-model="show" @close="close">
      <el-form label-position="right" label-width="150px">
        <el-form-item :label="key" v-for="(value, key) in record">
          <el-input auto-complete="off" :value="value"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <!-- <el-button type="primary" @click="hide">保存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'RecordDetail',
    computed: mapGetters({
      show: 'recordShow',
      record: 'record'
    }),
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    updated () {
    },
    methods: {
      close () {
        this.$store.dispatch('hideRecord')
      }
    },
    watch: {
      value: function (val, oldVal) {
        console.log(val)
      }
    }
  }
</script>