/**
 * @dictadata/org/client/lib/notify.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './roles.js'

/*
message formats:

the API server will fill-in the from: address
{
  "to": "drew@drewletcher.net",
  "subject": "this is a notification",
  "text": "This is the notification message."
}

*/
export default class Notify extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  /**
   * 
   * @param {*} message 
   * @returns 
   */
  sendMessage(message) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized(Roles.Notify)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        data: message
      }

      this.axios.post('/api/notify', body, this.axiosConfig())
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
