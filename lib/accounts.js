/**
 * @dictadata/org/client/lib/accounts.js
 */

import DictaDataAPI from './dictadata-api.js'
import Account from './account.js'
import Roles from './roles.js'

export default class Accounts extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   * login
   */
  login(user) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      if (typeof user !== "object" && (!user.userid || !user.password))
        throw(new Error("Invalid user parameter"))

      // override Authorization header
      let config = this.axiosConfig(user)

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
            // console.log(JSON.stringify(results))
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          Object.assign(user, results.data[ user.userid ])
          user.isAuthenticated = true

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
  logout(user) {
    return new Promise((resolve, reject) => {
      resolve("OK");
/*      
      // override Authorization header
      let config = this.axiosConfig()

      this.axios.get('/node/logout', config)
        .then(res => {
          // check errors
    
          // process results

          resolve("OK")

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
  register(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }

      let data = {
        account: user
      }

      this.axios.post('/node/register', data, this.axiosConfig(user))
        .then(res => {
          // check HTTP response
          if (res.status !== 200 && res.status !== 201) {
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
          if (!results.data[ user.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          resolve(results.data[ user.userid ])
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
  store(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      if (!this.$user.isAuthorized([ Roles.Admin, Roles.User ])) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        account: user
      }

      this.axios.put('/node/account', data, this.axiosConfig())
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
          if (!results.data[ user.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          // process results
          resolve(results.data[ user.userid ])
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
      if (!this.$user.isAuthorized([ Roles.Admin, Roles.User ])) {
        reject(new Error('Not Authorized'))
        return
      }

      let userid = user.userid || user

      this.axios.delete('/node/account/' + userid, this.axiosConfig())
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
