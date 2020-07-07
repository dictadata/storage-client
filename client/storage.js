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
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
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
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
          })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  store(smt, construct, key='') {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: {}
      };
      if (key)
        body.data[key] = construct
      else
        body.data = [construct]

      dictaAPI(this.user)
        .put('/node/store/' + smt, body)
        .then(response => {
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
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
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
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

      let body = {
        pattern: pattern
      }

      dictaAPI(this.user)
        .post('/node/retrieve/' + smt, body)
        .then(response => {
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
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
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
          })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
