/**
 * dicta-client/user.js
 */
import DictaDataAPI from './dictadata-api.js'
import Accounts from './accounts.js'
import Account from './account.js'

class User extends Account {
  constructor() {
    super()
    this.callbacks = []
  }

  /**
   * Create a new user account in the storage server.
   * Does not change the current $user account.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves to a user Account with information from the server.
   */
  register(user) {
    return new Promise((resolve, reject) => {
      let accounts = new Accounts();
      accounts.register(user)
        .then((account) => {
          resolve(account)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Check for user account in the storage server.
   * If OK changes the current $user account with information from the server.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves to a string with results message
   */
  login(user) {
    return new Promise((resolve, reject) => {
      let accounts = new Accounts();
      accounts.login(user)
        .then((result) => {
          $user.clear()
          Object.assign($user, user)
          $user.emit()
          resolve(result)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Logs out the current $user. Resets $user to guest account.
   * @returns Promise that resolves to a string with results message
   */
  logout() {
    return new Promise((resolve, reject) => {
      let user = Object.assign({}, $user)
      let accounts = new Accounts();
      accounts.logout(user)
        .then((result) => {
          $user.clear()
          $user.emit()
          resolve(result)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
 * Stores the current $user account information.
 * @returns Promise that resolves to a string with results message
 */
  store() {
    return new Promise((resolve, reject) => {
      //let user = new Account($user)
      let accounts = new Accounts();
      accounts.store($user)
        .then((result) => {
          resolve(result)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  addListener(callback) {
    this.callbacks.push(callback)
  }

  removeListener(callback) {
    let index = this.callbacks.indexOf(callback)
    if (index >= 0)
      this.callbacks.splice(index,1)
  }

  emit() {
    this.callbacks.forEach(cb => cb())
  }

}

// defaults to guest:guest
const $user = new User()
DictaDataAPI.$user = $user

export default $user
