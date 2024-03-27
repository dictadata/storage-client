/**
 * storage/client/lib/etl.js
 */

import StorageAPI from './storage-api.js'
import Roles from './types/roles.js'

export default class ETL extends StorageAPI {

  constructor(options) {
    super(options)
  }

  perform(tract, fiber, params) {
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
      if (fiber)
        body[ "fiber" ] = fiber
      if (params)
        body[ "params" ] = params

      this.axios.post(uri, body, config)
        .then(res => {
          if (res.status === 200)
            resolve(res.data)
          else
            reject(res)
        })
        .catch(error => {
          // console.warn(error.message)
          reject(error)
        })
    })
  }

}
