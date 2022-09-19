/**
 * dictadata-client/codex.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Codex extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   *
   * @param {String} smt_urn
   * @param {Object} options
   * @param {Boolean} options.resolve_alias
   * @returns
   */
  recall(smt_urn, options) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      //console.log("client.recall smt_urn: " + smt_urn)
      //console.log("options " + JSON.stringify(options, null, 2))

      if (!smt_urn) {
        reject(new Error('Invalid Codex smt_urn'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let uri = '/node/codex/' + smt_urn
      if (options && options.resolve)
        uri += '?resolve=true'
      //console.log("uri " + uri)

      this.axios.get(uri, this.config)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

  store(encoding) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!encoding.smt_urn) {
        reject(new Error('Invalid Codex smt_urn'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        codex: encoding
      }

      this.axios.put('/node/codex/' + encoding.smt_urn, data, this.config)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.error(error.message)
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
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/codex/' + smt_urn, this.config)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

  retrieve(pattern) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/codex/', body, this.config)
        .then(response => {
          let results = response.data
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText)
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

}
