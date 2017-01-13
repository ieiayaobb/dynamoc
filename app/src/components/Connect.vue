<template>
  <div>
    <el-dialog title="Connect to the database" v-model="connectShow" @close="close">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="Host">
          <el-input auto-complete="off" v-model="host"></el-input>
        </el-form-item>
        <el-form-item label="Access Key">
          <el-input auto-complete="off" v-model="accessKey"></el-input>
        </el-form-item>
        <el-form-item label="Access Secret">
          <el-input auto-complete="off" v-model="accessSecret"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">cancel</el-button>
        <el-button type="primary" @click="connect">connect</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Connect',
    data () {
      return {
        host: '127.0.0.1:10500',
        accessKey: 'access_key',
        accessSecret: 'access_secret'
      }
    },
    computed: mapGetters({
      connectShow: 'connectShow'
    }),
    methods: {
      close () {
        this.$store.dispatch('hideConnect')
      },
      connect (e) {
        this.$store.dispatch('trigConnect', {
          host: this.host,
          accessKey: this.accessKey,
          accessSecret: this.accessSecret
        })
      }
    }
  }
</script>