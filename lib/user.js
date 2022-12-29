/**
 * dicta-client/user.js
 */
import DictaDataAPI from './dictadata-api.js'
import UserAPI from './user-api.js'
import Account from './account.js'

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

    this.listeners = []
  }

  setDefaultUser(user) {
    if (user) {
      this._defaultUser.userid = user.userid
      this._defaultUser.password = user.password
      if ('profile' in user)
        Object.assign(this._defaultUser.profile, user.profile)
      if ('settings' in user)
        Object.assign(this._defaultUser.settings, user.settings)
    }

    $user.clear() // sets Roles Public and Guest
    $user.userid = this._defaultUser.userid
    $user.password = this._defaultUser.password
    $user.roles = this._defaultUser.roles
    $user.isAuthenticated = false
    $user.isLocal = true
    $user.profile = Object.assign({}, this._defaultUser.profile)
    $user.settings = Object.assign({}, this._defaultUser.settings)
  }

  // $user changed event
  addListener(callback) {
    this.listeners.push(callback)
  }

  removeListener(callback) {
    let index = this.listeners.indexOf(callback)
    if (index >= 0)
      this.listeners.splice(index,1)
  }

  emit() {
    this.listeners.forEach(cb => cb())
  }

  /**
   * Check for user account in the data store.
   * If OK changes the current $user with information from the server.
   * @param {Object} user new user account to create
   * @param {String} user.userid required
   * @param {String} user.password required
   * @param {String} guest signifies a local guest user login, no server request
   * @returns Promise that resolves to a string with results message
   */
  login(user) {
    return new Promise((resolve, reject) => {
      let userAPI = new UserAPI()

      userAPI.login(user)
        .then(results => {
          // change $user
          $user.clear()
          Object.assign($user, results.data[ user.userid ])
          $user.password = user.password
          $user.isAuthenticated = true
          $user.isLocal = false

          $user.emit()
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
   * Changes the current $user account to guest account.
   * @returns Promise that resolves to a string with results message
   */
  logout() {
    return new Promise((resolve, reject) => {
      let userAPI = new UserAPI()

      userAPI.logout($user)
        .then(results => {
          // change $user
          this.setDefaultUser()

          $user.emit()
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
   * Does not change the current $user account.
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
   * Stores the current $user account information.
   * @returns Promise that resolves to a string with results message
   */
  update() {
    return new Promise((resolve, reject) => {

      let userAPI = new UserAPI()

      userAPI.update($user)
        .then(results => {
          // refresh $user with account info from server
          $user._update(results.data[ $user.userid ])

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
