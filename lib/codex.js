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
   * @param {String} name 
   * @param {Object} options 
   * @param {Boolean} options.resolve_alias
   * @returns 
   */
  recall(name, options) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!name) {
        reject(new Error('Invalid Codex name'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let uri = '/node/codex/' + name + (options && options.resolve) ? '?resolve=true' : ''

      this.axios.get(uri, this.config)
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
        reject(new Error('Invalid Codex name'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        codex: encoding
      }

      this.axios.put('/node/codex/' + encoding.name, data, this.config)
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
        reject(new Error('Invalid Codex name'))
        return
      }
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/codex/' + name, this.config)
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
          console.log(error.message)
          reject(error)
        })
    })
  }

}
