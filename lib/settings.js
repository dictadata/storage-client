/**
 * dictadata-client/settings.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Settings extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  getSettings(ID) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/api/settings/' + ID, this.config)
        .then(response => {
          let results = response.data;
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText);
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

      this.axios.post('/api/settings/' + ID, body, this.config)
        .then(response => {
          let results = response.data;
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText);
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
