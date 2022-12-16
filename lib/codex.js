/**
 * @dictadata/org/client/lib/codex.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './roles.js'

export default class Codex extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  store(encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!encoding.smt_urn) {
        reject(new Error('Invalid parameter expecting smt_urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Coder)) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        codex: encoding
      }

      this.axios.put('/node/codex/' + encoding.smt_urn, data, this.axiosConfig())
        .then(res => {
          // check HTTP res
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
            return
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

  dull(smt_urn) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_urn) {
        reject(new Error('Invalid Codex smt_urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Coder)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/codex/' + smt_urn, this.axiosConfig())
        .then(res => {
          // check HTTP res
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
            return
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

  /**
   *
   * @param {String} smt_urn
   * @param {Object} options
   * @param {Boolean} options.resolve_alias
   * @returns
   */
  recall(smt_urn, options) {
    // console.log(smt_urn)
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      // console.log("client.recall smt_urn: " + smt_urn)
      // console.log("options " + JSON.stringify(options, null, 2))
      // console.log(smt_urn)
      if (!smt_urn) {
        reject(new Error('Invalid Codex smt_urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let uri = '/node/codex/' + smt_urn + ((options && options.resolve) ? '?resolve=true' : '')
      // console.log("uri " + uri)

      this.axios.get(uri, this.axiosConfig())
        .then(res => {
          // check HTTP res
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

  retrieve(pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.User)) {
        // console.log('not making the call')
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/codex/', body, this.axiosConfig())
        .then(res => {
          // check HTTP res
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // process results
          resolve(res.data)
        })
        .catch(error => {
          // console.warn(error.message)
          // console.log("after the call")
          reject(error)
        })
    })
  }

}
