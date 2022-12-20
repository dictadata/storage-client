/**
 * @dictadata/org/client/lib/settings.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './roles.js'

export default class Settings extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  getSettings(ID) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.get('/api/settings/' + ID, this.axiosConfig())
        .then(response => {
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText);
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

  putSettings(ID, settings) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.User)) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let body = {
        data: settings
      }

      this.axios.post('/api/settings/' + ID, body, config)
        .then(response => {
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText);
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
