/**
 * dictadata-client/notify.js
 */

import DictaDataAPI from './dictaDataAPI'
import Roles from './roles'

export default class Notify extends DictaDataAPI {

  constructor(options) {
    super(options)
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

      this.axios.post('/api/notify', body)
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
