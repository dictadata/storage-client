/**
 * dictadata-client/storage.js
 */

import dictaAPI from './dictaAPI'
import Roles from './roles'

export default class Storage {

  constructor(account) {
    this.account = account
  }

  setEncoding(smt, encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.account)
        .put('/node/encoding/' + smt, encoding)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  getEncoding(smt) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.account)
        .get('/node/encoding/' + smt)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  store(smt, construct, key = '') {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: {}
      }
      if (key)
        body.data[key] = construct
      else
        body.data = [construct]

      dictaAPI(this.account)
        .put('/node/store/' + smt, body)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  recall(smt) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.account)
        .get('/node/retrieve/' + smt)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  retrieve(smt, pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      dictaAPI(this.account)
        .post('/node/retrieve/' + smt, body)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  dull(smt) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.account)
        .delete('/node/dull/' + smt)
        .then(response => {
          let results = response.data
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
