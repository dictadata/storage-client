/**
 * dictadata-client/codex.js
 */

import DictaDataAPI from './dictaDataAPI'
import Roles from './roles'

export default class Codex extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  recall(smt_name) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/codex/' + smt_name)
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

  store(smt_name, entry) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!smt_name) {
        reject(new Error('Invalid SMT'))
        return
      }
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        codex: entry
      }

      this.axios.put('/node/codex/' + smt_name, body)
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
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete('/node/codex/' + smt_name)
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
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/codex/' + smt_name, body)
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
