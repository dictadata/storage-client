/**
 * @dictadata/org/client/lib/settings.js
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
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText);
        })
        .catch(error => {
          console.error(error.message)
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
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText);
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

}
