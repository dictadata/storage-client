/**
 * dictadata-client/settings.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Settings {

  getSettings(user,ID) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(user)
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

  putSettings(user, ID, settings) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(user)
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
