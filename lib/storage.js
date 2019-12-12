/**
 * dictadata-client/storage.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Storage {

  constructor(user) {
    this.user = user
  }

  setEncoding(smt, encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .put('/node/encoding/' + smt, encoding)
        .then(response => {
          resolve(response.data)
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
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .get('/node/encoding/' + smt)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  store(smt, construct) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .put('/node/store/' + smt, construct)
        .then(response => {
          resolve(response.data)
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
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .get('/node/retrieve/' + smt)
        .then(response => {
          resolve(response.data)
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
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .post('/node/retrieve/' + smt, pattern)
        .then(response => {
          resolve(response.data)
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
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .delete('/node/dull/' + smt)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
