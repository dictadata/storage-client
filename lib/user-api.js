/**
 * @dictadata/org/client/lib/accounts.js
 */

import DictaDataAPI from './dictadata-api.js'
import Account from './account.js'
import Roles from './roles.js'

export default class UserAPI extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   * Add a new user account to the Accounts datastore.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves with an Account record.
   */
  register(user) {
    return new Promise((resolve, reject) => {
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      // role is Public

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
          // check return type
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map"))
            return
          }
          // check for account record
          if (!results.data[ user.userid ]) {
            reject(new Error("Missing account record in results"))
            return
          }

          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Check for the user account in the Accounts datastore.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves with an Account record.
   */
  login(user) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      if (typeof user !== "object" || !user.userid || !user.password) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      // role is Public

      this.axios.get('/node/login', this.axiosConfig(user))
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
          // check return type
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map."))
            return
          }
          // check for account record
          if (!results.data[ user.userid ]) {
            // console.log(JSON.stringify(results))
            reject(new Error("Missing account record in results."))
            return
          }

          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Notify server user is logging out.
   * @returns Promise that resolves to a string with results message
   */
  logout(user) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      if (!user.isAuthorized([ Roles.Guest, Roles.User ])) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/node/logout', this.axiosConfig(user))
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

          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Stores the user account information in Accounts datastore.
   * @returns Promise that resolves to a string with results message
   */
  update(user) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(user))
      if (!(user instanceof Account)) {
        reject(new Error("Invalid parameter expected Account"))
        return
      }
      if (!user.isAuthorized([ Roles.User ])) {
        reject(new Error('Not Authorized'))
        return
      }

      let data = {
        account: user
      }

      this.axios.put('/node/user', data, this.axiosConfig(user))
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
          // check return type
          if (results.type !== "map") {
            reject(new Error("Wrong results type " + results.type + " expecting map."))
            return
          }
          // check for Account record
          if (!results.data[ user.userid ]) {
            // console.log(JSON.stringify(results))
            reject(new Error("Missing account record in results."))
            return
          }

          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
