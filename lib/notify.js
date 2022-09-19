/**
 * dictadata-client/notify.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Notify extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  sendMessage(message) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized(Roles.Notify)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: message
      }

      this.axios.post('/api/notify', body, this.config)
        .then(response => {
          let results = response.data;
          if (results.resultText === 'OK')
            resolve(results.data)
          else
            reject(results.resultText);
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

}
