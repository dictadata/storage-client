/**
 * dicta.io-client/account.js
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
   */
  login() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let request = { userid: this.user.userid, password: this.user.password }

      let api = dictaAPI(this.user);
      api.get('/node/login', request)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText);
          else {
            let results = response.data;
            if (results.result === 'ok') {
              this.user.update(results.data[this.user.userid])
              resolve(results.result)
            }
            else
              reject(results.result);
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

  /**
   *
   * @param {*} user User to be created.
   */
  register() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let request = { userid: this.user.userid, password: this.user.password }

      dictaAPI(this.user).post('/node/register', request)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText);
          else {
            let results = response.data;
            if (results.result === 'ok') {
              this.user.update(results.data[this.user.userid])
              resolve(results.result)
            }
            else
              reject(results.result);
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }

}
