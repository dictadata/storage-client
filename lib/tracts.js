/**
 * @dictadata/org/client/lib/tracts.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Tracts extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  transfer(tract) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (typeof tract !== "object" || !tract.origin || !tract.terminal) {
        reject(new Error('Invalid tract'))
        return
      }
      if (!this.user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let body = {
        tract: tract
      }

      this.axios.post('/node/transfer/', body, this.config)
        .then(response => {
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText)
        })
        .catch(error => {
          console.error(error.message)
          reject(error)
        })
    })
  }

}