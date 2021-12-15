/**
 * dictadata-client/accounts.js
 */

import DictaDataAPI from './dictaDataAPI'
import Roles from './roles'

export default class Accounts extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   * login
   */
  login() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        userid: this.account.userid,
        password: this.account.password
      }

      this.axios.get('/node/login', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              this.account.update(results.data[this.account.userid])
              resolve(results.resultText)
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
   * register
   */
  register() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: this.account
      }

      this.axois.post('/node/register', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              this.account.update(results.data[this.account.userid])
              resolve(results.resultText)
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
  * store
  */
  store() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: this.account
      }

      this.axios.put('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              resolve(results.resultText)
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
   * dull
   */
  dull() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: {
          userid: this.account.userid,
          password: this.account.password
        }
      }

      this.axios.delete('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              this.account.roles = [Roles.Public]
              resolve(results.resultText)
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

}
