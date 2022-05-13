/**
 * dictadata-client/storage.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Storage extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  setEncoding(smt_name, encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.put('/node/encoding/' + smt_name, encoding, this.config)
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

  getEncoding(smt_name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/encoding/' + smt_name, this.config)
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

  store(smt_name, construct, key = '') {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: {}
      }
      if (key)
        body.data[ key ] = construct
      else
        body.data = [ construct ]

      this.axios.put('/node/store/' + smt_name, body, this.config)
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

  recall(smt_name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/retrieve/' + smt_name, this.config)
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

  retrieve(smt_name, pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/retrieve/' + smt_name, body, this.config)
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

  dull(smt_name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/dull/' + smt_name, this.config)
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
