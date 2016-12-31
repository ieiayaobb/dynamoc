<template>
  <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Dynamoc</el-menu-item>
    <el-menu-item index="3">connect</el-menu-item>
  </el-menu>
</template>

<script>
  // import {showConnect, hideConnect} from '../vuex/actions'
  export default {
    name: 'Navibar',

    methods: {
      handleSelect (key, keyPath) {
        if (key === '3') {
          this.$store.dispatch('showConnect')
        }
      }
    }
  }
</script>