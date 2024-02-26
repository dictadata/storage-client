/**
 * storage-client/lib/tracts.js
 */

import StorageAPI from './storage-api.js'
import Roles from './types/roles.js'

export default class Tracts extends StorageAPI {

  constructor(options) {
    super(options)
  }

  store(tract) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!tract.urn) {
        reject(new Error('Invalid parameter expecting urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Coder)) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = tract;

      this.axios.put('/node/tracts/' + tract.urn, body, config)
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

  dull(urn) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!urn) {
        reject(new Error('Invalid Tracts urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Coder)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/tracts/' + urn, this.axiosConfig())
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
   * @param {String} urn
   * @param {Object} options
   * @param {Boolean} options.resolve_alias
   * @returns
   */
  recall(urn, options) {
    // console.log(urn)
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      // console.log("client.recall urn: " + urn)
      // console.log("options " + JSON.stringify(options, null, 2))
      // console.log(urn)
      if (!urn) {
        reject(new Error('Invalid Tracts urn'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let uri = '/node/tracts/' + urn + ((options && options.resolve) ? '?resolve=true' : '')
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
        console.log('not making the call ' + JSON.stringify(this.$user))
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/tracts/', body, config)
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
