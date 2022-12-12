/**
 * @dictadata/org/client/lib/accounts.js
 */

import DictaDataAPI from './dictadata-api.js'
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
        user = Object.assign({}, $user);

      // override Authorization header
      let config = this.config
      config.headers[ "Authorization" ] = 'Basic ' + this._btoa(user.userid + ':' + user.password)

      this.axios.get('/node/login', config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
            return
          }

          // check the storage results
          let results = res.data;
          if (results.resultCode !== 0) {
            reject(new Error(results.resultMessage))
            return
          }
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map"))
            return
          }
          if (!results.data[ user.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          $user.clear()
          $user.copy(results.data[ user.userid ])
          $user.password = user.password
          $user.state.isAuthenticated = true
          $user.emit()

          resolve(results.resultMessage)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * logout
   */
  logout() {
    return new Promise((resolve, reject) => {
/*      
      // override Authorization header
      let config = this.config
      config.headers[ "Authorization" ] = 'Basic ' + this._btoa($user.userid + ':' + $user.password)

      // this.axios.get('/node/logout', config)
      //  .then(res => {
          // check errors
*/      
          // process results
          $user.clear()
          $user.emit()

          resolve("OK")
/*
          resolve(results.resultMessage)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
*/
    })
  }

  /**
   * register
   */
  register(account) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(account instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }

      let data = {
        account: account
      }

      this.axios.post('/node/register', data, this.config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // check storage results
          let results = res.data
          if (results.resultCode !== 0) {
            reject(new Error(results.resultMessage))
            return
          }
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map"))
            return
          }
          if (!results.data[ account.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          resolve(results.data[ account.userid ])
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
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
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      if (!this.user.isAuthorized([ Roles.Admin, Roles.User ])) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        account: account
      }

      this.axios.put('/node/account', data, this.config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // check storage results
          let results = res.data
          if (results.resultCode !== 0) {
            reject(new Error(results.resultMessage))
            return
          }
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map"))
            return
          }
          if (!results.data[ account.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          resolve(results.data[ account.userid ])
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
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
        reject(new Error('Not Authorized'))
        return
      }

      let userid = user.userid || user

      this.axios.delete('/node/account/' + userid, this.config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }

          // check storage results
          let results = res.data
          if (results.resultCode !== 0) {
            reject(new Error(results.resultMessage))
            return
          }
          if (results.type !== "message") {
            reject(new Error("Wrong results type " + results.type + " expecting message"))
            return
          }

          // process results
          resolve(results.data)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
