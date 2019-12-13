/**
 * dictadata-client/account.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Account {

  /**
   *
   * @param {*} user  The user making the request.
   */
  constructor(user) {
    this.user = user
  }

  /**
   *
   * @param {*} user User for the account.
   */
  login(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let request = { userid: user.userid, password: user.password }

      dictaAPI(this.user).get('/node/login', request)
        .then(response => {
          //console.log(response)
          resolve(response.data.account)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  /**
   *
   * @param {*} user User to be created.
   */
  register(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user).post('/node/register', user)
        .then(response => {
          resolve(response.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
