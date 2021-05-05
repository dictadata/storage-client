/**
 * dictadata-client/settings.js
 */

import dictaAPI from './dictaAPI'
import Roles from './roles'

export default class Settings {

  constructor(account) {
    this.account = account
  }

  getSettings(ID) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(this.account)
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
      if (!this.account.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }
      let body = {
        data: settings
      }

      dictaAPI(this.account)
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
