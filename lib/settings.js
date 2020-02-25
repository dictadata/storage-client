/**
 * dicta.io-client/settings.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Settings {

  constructor(user) {
    this.user = user
  }

  getSettings(ID) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .get('/api/settings/' + ID)
        .then(response => {
          resolve(response.data.settings)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  putSettings(ID, settings) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .post('/api/settings/' + ID, settings)
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
