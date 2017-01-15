import {http} from 'vue'
import AWS from 'aws-sdk'
import _ from 'lodash'

export const initAPI = () => {
  const ROOT = '/'
  const ACCEPT = 'application/json'
  const CONTENT_TYPE = 'application/json'

  http.options.root = ROOT
  http.headers.common['Accept'] = ACCEPT
  http.headers.common['Content-Type'] = CONTENT_TYPE
  http.headers.put['Content-Type'] = CONTENT_TYPE
  http.headers.post['Content-Type'] = CONTENT_TYPE
  http.headers.patch['Content-Type'] = CONTENT_TYPE
  http.headers.delete['Content-Type'] = CONTENT_TYPE

  http.interceptors.push((req, next) => {
    next((res) => {

    })
  })
}

var dynamodb

export const api = (type = 'get', url, ...tail) => {
  return http[type](url, ...tail)
    .then((res) => {
      return JSON.parse(res.body)
    })
    .catch(() => {
      console.log('Hmm.. Something has gone awry. Please try again in a bit, or contact support.')
    })
}

export const connect = (host, accessKey, accessSecret) => {
  AWS.config.update({
    region: 'cn-north',
    endpoint: 'http://' + host,
    accessKeyId: accessKey,
    secretAccessKey: accessSecret
  })

  dynamodb = new AWS.DynamoDB()
}

export const scan = (tableName, lastEvaluatedKey) => {
  return new Promise(function (resolve, reject) {
    dynamodb.scan({
      TableName: tableName,
      Limit: 20,
      ExclusiveStartKey: lastEvaluatedKey
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const record = (tableName, payload) => {
  return new Promise(function (resolve, reject) {
    dynamodb.getItem({
      TableName: tableName,
      Key: payload
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const info = (tableName) => {
  return new Promise(function (resolve, reject) {
    dynamodb.describeTable({
      TableName: tableName
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const list = () => {
  return new Promise(function (resolve, reject) {
    dynamodb.listTables({}, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}

export const query = (tableName, indexName, hashKey, rangeKey, hashValue, rangeValue) => {
  var expressionAttributeNames = {
    '#hk_anchor': hashKey
  }

  var expressionAttributeValues = {
    ':hv_anchor': {
      'S': hashValue
    }
  }
  var queryExpression = {
    TableName: tableName,
    KeyConditionExpression: '#hk_anchor = :hv_anchor',
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  }

  if (!_.isEmpty(indexName)) {

  }
  console.log(queryExpression)
  return new Promise(function (resolve, reject) {
    dynamodb.query(queryExpression, function (err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        resolve(data)
      }
    })
  })
}
