/**
 * dictadata-client/settings.js
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
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
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
      let body = {
        data: settings
      }

      dictaAPI(this.user)
        .post('/api/settings/' + ID, body)
        .then(response => {
          let results = response.data;
          if (results.result === 'ok')
            resolve(results.data)
          else
            reject(results.result);
          })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
