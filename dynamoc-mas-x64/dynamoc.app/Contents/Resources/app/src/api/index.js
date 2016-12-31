import {http} from 'vue'

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
  return api('get', '/host', {
    params: {
      host: host,
      access_key: accessKey,
      access_secret: accessSecret
    }
  })
}

export const scan = (tableName, lastEvaluatedKey) => {
  return api('get', '/tables/' + tableName, {
    params: lastEvaluatedKey
  })
}

export const record = (tableName, payload) => {
  return api('get', '/tables/' + tableName + '/record', {
    params: payload
  })
}

export const info = (tableName) => {
  return api('get', '/tables/' + tableName + '/info', {

  })
}

export const headers = (tableName) => {
  return api('get', '/tables/' + tableName + '/headers', {

  })
}

export const list = () => {
  return api('get', '/tables', {
    params: {
    }
  })
}
