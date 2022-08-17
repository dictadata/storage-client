/**
 * dictadata-client/accounts.js
 */


import DictaDataAPI from './dictaDataAPI.js'
import Account from './account.js'
import Roles from './roles.js'
import $user from './user.js'

export default class Accounts extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   * login
   */
  login(user) {
    return new Promise((resolve, reject) => {
      if (typeof user === "undefined")
        user = Object.assign({}, DictaDataAPI.$user);

      // override Authorization header
      let config = this.config
      config.headers[ "Authorization" ] = 'Basic ' + this._btoa(user.userid + ':' + user.password)

      this.axios.get('/node/login', config)
        .then(response => {
          // console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              if (results.data[ user.userid ]) {
                $user.clear()
                $user.copy(results.data[ user.userid ])
                $user.password = user.password
                $user.state.isAuthenticated = true
                resolve(results.resultText)
              }
              else
                reject("Invalid account record")
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          // console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
   * register
   */
  register(account) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(account instanceof Account)) {
        reject("Invalid Parameter")
        return
      }

      let data = {
        account: account
      }

      this.axios.post('/node/register', data, this.config)
        .then(response => {
          // console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK')
              resolve(results.resultText)
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          // console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
  * store
  */
  store(account) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(account instanceof Account)) {
        reject("Invalid Parameter")
        return
      }
      if (!this.user.isAuthorized([ Roles.Admin, Roles.User ])) {
        reject('Not Authorized')
        return
      }

      let data = {
        account: account
      }

      this.axios.put('/node/account', data, this.config)
        .then(response => {
          // console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK')
              resolve(results.resultText)
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          // console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
   * dull
   */
  dull(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized([ Roles.Admin, Roles.User ])) {
        reject('Not Authorized')
        return
      }

      let userid = user.userid || user

      this.axios.delete('/node/account/' + userid, this.config)
        .then(response => {
          // console.log(response)
          if (response.status !== 200)
            reject(response.statusText)
          else {
            let results = response.data
            if (results.resultText === 'OK') {
              if ($user.userid === user.userid)
                $user.clear()
              resolve(results.resultText)
            }
            else
              reject(results.resultText)
          }
        })
        .catch(error => {
          // console.log(error.message)
          reject(error.message)
        })
    })
  }

}
