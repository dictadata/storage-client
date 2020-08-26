/**
 * dictadata-client/accounts.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Accounts {

  /**
   *
   * @param {*} account  The user making the request.
   */
  constructor(account) {
    this.account = account
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

      let api = dictaAPI(this.account)
      api.get('/node/login', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.result === 'ok') {
              this.account.update(results.data[this.account.userid])
              resolve(results.result)
            }
            else
              reject(results.result)
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

      dictaAPI(this.account).post('/node/register', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.result === 'ok') {
              this.account.update(results.data[this.account.userid])
              resolve(results.result)
            }
            else
              reject(results.result)
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

      dictaAPI(this.account).put('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.result === 'ok') {
              resolve(results.result)
            }
            else
              reject(results.result)
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

      dictaAPI(this.account).delete('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.result === 'ok') {
              this.account.roles = [Roles.Public]
              resolve(results.result)
            }
            else
              reject(results.result)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

}
