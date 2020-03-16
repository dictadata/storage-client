/**
 * dicta.io-lib/account.js
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
   * login
   */
  login() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        userid: this.user.userid,
        password: this.user.password
      }

      let api = dictaAPI(this.user);
      api.get('/node/login', body)
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
   * register
   */
  register() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: this.user
      }

      dictaAPI(this.user).post('/node/register', body)
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
  * store
  */
  store() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: this.user
      }

      dictaAPI(this.user).put('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText);
          else {
            let results = response.data;
            if (results.result === 'ok') {
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
   * dull
   */
  dull() {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: {
          userid: this.user.userid,
          password: this.user.password
        }
      }

      dictaAPI(this.user).delete('/node/account', body)
        .then(response => {
          //console.log(response)
          if (response.status !== 200)
            reject(response.statusText);
          else {
            let results = response.data;
            if (results.result === 'ok') {
              this.user.roles = [Roles.Public]
              resolve(results.result)
            }
            else
              reject(results.result)
          }
        })
        .catch(error => {
          //console.log(error.message)
          reject(error.message)
        })
    })
  }


}
