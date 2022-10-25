/**
 * @dictadata/org/client/lib/notify.js
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
