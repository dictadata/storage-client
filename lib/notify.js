/**
 * dictadata-client/notify.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Notify {

  constructor(account) {
    this.account = account
  }

  sendMessage(message) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Notify)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: message
      }

      dictaAPI(this.account)
        .post('/api/notify', body)
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
