/**
 * @dictadata/org/client/lib/storage.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './roles.js'
import typeOf from './utils/typeOf.js'

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
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.put('/node/encoding/' + smt_name, encoding, this.axiosConfig())
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
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
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/encoding/' + smt_name, this.axiosConfig())
        .then(res => {          
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
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
      if (!this.$user.isAuthorized(Roles.User)) {
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

      this.axios.put('/node/store/' + smt_name, body, this.axiosConfig())
        .then(res => {          
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
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
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/dull/' + smt_name, this.axiosConfig())
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  recall(smt_name, pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/recall/' + smt_name, body, this.axiosConfig())
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
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
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/retrieve/' + smt_name, body, this.axiosConfig())
        .then(res => {          
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
