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
  * store
  */
  store(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }

      let url
      let config
      if (this.$user.isAuthorized([ Roles.Admin ])) {
        url = '/node/accounts/' + user.userid
        config = this.axiosConfig()
      }
      else if (this.$user.isAuthorized([ Roles.User ]) && user.userid === this.$user.userid) {
        // user is updating itself
        url = '/node/accounts'
        config = this.axiosConfig(user)
      }
      else {
        reject(new Error('Not Authorized'))
        return
      }

      config.headers["Content-Type"] = "application/json; charset=utf-8"

      let body = {
        account: user
      }

      this.axios.put(url, body, config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }
          // check storage results
          let results = res.data
          if (results.status !== 0) {
            reject(new Error(results.message))
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
          resolve(results)
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
      let url
      let config
      if (this.$user.isAuthorized([ Roles.Admin ])) {
        url = '/node/accounts/' + user.userid
        config = this.axiosConfig()
      }
      else if (this.$user.isAuthorized([ Roles.User ]) && user.userid === this.$user.userid) {
        // user is trying to delete itself
        url = '/node/accounts'
        config = this.axiosConfig(user)
      }
      else {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.delete(url, config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
          }
          // check storage results
          let results = res.data
          if (results.status !== 0) {
            reject(new Error(results.message))
            return
          }
          if (results.type !== "message") {
            reject(new Error("Wrong results type " + results.type + " expecting message"))
            return
          }

          // process results
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  recall(user) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      let url
      let config
      if (this.$user.isAuthorized([ Roles.Admin ])) {
        url = '/node/accounts/' + user.userid
        config = this.axiosConfig()
      }
      else if (this.$user.isAuthorized([ Roles.User ]) && user.userid === this.$user.userid) {
        // user is trying to request itself
        url = '/node/accounts'
        config = this.axiosConfig(user)
      }
      else {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get(url, config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
            return
          }
          // check the storage results
          let results = res.data;
          if (results.status !== 0) {
            reject(new Error(results.message))
            return
          }
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map."))
            return
          }
          if (!results.data[ user.userid ]) {
            // console.log(JSON.stringify(results))
            reject(new Error("Missing account record in results."))
            return
          }

          // return account record
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  retrieve(pattern) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      if (!this.$user.isAuthorized([ Roles.Admin ])) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        pattern: pattern
      }

      this.axios.post('/node/accounts', body, config)
        .then(res => {
          // check HTTP response
          if (res.status !== 200) {
            reject("HTTP " + new Error(res.statusText))
            return
          }
          // check the storage results
          let results = res.data;
          if (results.status !== 0) {
            reject(new Error(results.message))
            return
          }
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map."))
            return
          }

          // return account record
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
