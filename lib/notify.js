/**
 * dicta.io-client/notify.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Notify {

  constructor(user) {
    this.user = user
  }

  sendMessage(message) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Notify)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.user)
        .post('/api/notify', message)
        .then(response => {
          resolve(response.data.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
