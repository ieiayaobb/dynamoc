<template>
  <div id="app">
    <framework></framework>
  </div>
</template>

<script>
  import store from './vuex/store'
  import Framework from './components/Framework'
  import AWS from 'aws-sdk'

  export default {
    name: 'app',
    components: {
      Framework
    },
    created () {
      AWS.config.update({
        region: 'cn-north',
        endpoint: 'http://192.168.3.187:80',
        accessKeyId: 'fakeMyKeyId',
        secretAccessKey: 'fakeSecretAccessKey'
      })

      var dynamodb = new AWS.DynamoDB()
      var params = {
        // ExclusiveStartTableName: 'STRING_VALUE',
        // Limit: 0
      }
      dynamodb.listTables(params, function (err, data) {
        if (err) {
          console.log(err, err.stack) // an error occurred
        } else {
          console.log(data)           // successful response
        }
      })
    },
    store
  }
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
