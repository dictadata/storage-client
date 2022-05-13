/**
 * dictadata-client/import.js
 */

import DictaDataAPI from './dictaDataAPI.js'
import Roles from './roles.js'

export default class Upload extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  CSV_import(formData) {
    //console.log("CSV_import")

    return new Promise((resolve, reject) => {
      if (!this.user.isAuthorized([ Roles.ETL, Roles.Admin ])) {
        console.log("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.config
      config.headers[ "Content-Type" ] = 'multipart/form-data'

      this.axios.post('/import/csv', formData, config)
        .then(results => {
          //console.log("api returned")
          //console.log(results)
          resolve(results.data)
        })
        .catch(err => {
          console.log('api failed')
          console.log(err.message)
          reject(err)
        })
    })
  }

}
