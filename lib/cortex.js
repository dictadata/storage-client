/**
 * dictadata-client/cortex.js
 */

import DictaDataAPI from './dictaDataAPI'
import Roles from './roles'

export default class Cortex extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  recall(name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!name) {
        reject(new Error('Invalid Cortex name'))
        return
      }
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/cortex/' + name)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  store(encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!encoding.name) {
        reject(new Error('Invalid Cortex name'))
        return
      }
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        cortex: encoding
      }

      this.axios.put('/node/cortex/' + encoding.name, body)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  dull(name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!name) {
        reject(new Error('Invalid Cortex name'))
        return
      }
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/cortex/' + name)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  retrieve(pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/cortex/', body)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
