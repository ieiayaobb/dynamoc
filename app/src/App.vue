<template>
  <div id="app">
    <framework></framework>
  </div>
</template>

<script>
  import store from './vuex/store'
  import Framework from './components/Framework'

  export default {
    name: 'app',
    components: {
      Framework
    },
    store
  }
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
