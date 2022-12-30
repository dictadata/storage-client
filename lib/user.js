/**
 * dicta-client/user.js
 */
import DictaDataAPI from './dictadata-api.js'
import UserAPI from './user-api.js'
import Account from './account.js'
import Roles from './types/roles.js'
import StorageResults from './types/storage-results.js'

class User extends Account {
  constructor(options) {
    super(options)

    this._defaultUser = {
      "userid": "guest",
      "password": "guest",
      "roles": [ "Guest" ],
      "_state": {
        "isAuthenticated": false,
        "isLocal": true
      },
      "profile": {},
      "settings": {
        "homePage": "/"
      }
    }

    this._listeners = []
  }

  setDefaultUser(user) {
    this._defaultUser.userid = user.userid
    this._defaultUser.password = user.password

    this._defaultUser.roles.length = 0
    if ('roles' in user)
      this._defaultUser.roles.push(...user.roles)
    else
      this._defaultUser.roles = [ "Guest" ]

    if ('profile' in user)
      Object.assign(this._defaultUser.profile, user.profile)
    if ('settings' in user)
      Object.assign(this._defaultUser.settings, user.settings)

    this.changeUser(this._defaultUser)
  }

  changeUser(user) {
    this.clear()
    this.update(user)
    this.userid = user.userid
    this.password = user.password
    this.isAuthenticated = false
    this.isLocal = true
    this.emit()
  }

  // user changed event
  addListener(callback) {
    this._listeners.push(callback)
  }

  removeListener(callback) {
    let index = this._listeners.indexOf(callback)
    if (index >= 0)
      this._listeners.splice(index,1)
  }

  emit() {
    this._listeners.forEach(cb => cb())
  }

  /**
   * Check for user account in the data store.
   * If OK updates props with information from the server.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves to a string with results message
   */
  login(user, local = false) {
    return new Promise((resolve, reject) => {
      if (local) {
        this.changeUser(user)
        resolve(new StorageResults(0, "OK", this, user.userid))
        return
      }

      let userAPI = new UserAPI()
      userAPI.login(user)
        .then(results => {
          if (results.status === 0) {
            this.changeUser(results.data[ user.userid ])
            this.password = user.password  // server doesn't send password
            this.isAuthenticated = true
            this.isLocal = false
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
   * Changes the current user to default.
   * @returns Promise that resolves to a string with results message
   */
  logout() {
    return new Promise((resolve, reject) => {
      if (this.isLocal) {
        this.changeUser(this._defaultUser)
        resolve({ status: 0, message: "OK" })
        return
      }

      let userAPI = new UserAPI()
      userAPI.logout(this)
        .then(results => {
          this.changeUser(this._defaultUser)
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Add a new user account to the data store.
   * Does not change the current user account.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @returns Promise that resolves with an Account record.
   */
  register(user) {
    return new Promise((resolve, reject) => {

      let userAPI = new UserAPI()
      userAPI.register(user)
        .then(results => {
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  /**
   * Stores the current user account information on the server.
   * @returns Promise that resolves to a string with results message
   */
  store() {
    return new Promise((resolve, reject) => {

      let userAPI = new UserAPI()
      userAPI.store(this)
        .then(results => {
          // refresh user with account info from server
          if (results.status === 0)
            this.update(results.data[ this.userid ])
          resolve(results)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}

const $user = new User()

DictaDataAPI.$user = $user

export default $user
