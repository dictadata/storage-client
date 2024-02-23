/**
 * @dictadata/org/client/lib/etl.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './types/roles.js'

export default class ETL extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  perform(tract, action, params) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (typeof tract !== "string" && typeof tract !== "object") {
        reject(new Error('Invalid tract'))
        return
      }
      if (!this.$user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": "application/json; charset=utf-8"
      })

      let uri = '/node/etl/'
      let body = {}
      if (typeof tract === "string")
        uri += tract
      else
        body["tract"] = tract
      if (action)
        body[ "action" ] = action
      if (params)
        body[ "params" ] = params

      this.axios.post(uri, body, config)
        .then(response => {
          if (response.status === 200)
            resolve(response.data)
          else
            reject(response.statusText)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
