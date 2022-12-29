/**
 * @dictadata/org/client/lib/import.js
 */

import DictaDataAPI from './dictadata-api.js'
import Roles from './roles.js'

export default class Upload extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  CSV_import(formData) {
    // console.log("CSV_import")

    return new Promise((resolve, reject) => {
      if (!this.$user.isAuthorized([ Roles.ETL, Roles.Admin ])) {
        console.warn("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      let config = this.axiosConfig(null, {
        "Content-Type": 'multipart/form-data'
      })

      this.axios.post('/import/csv', formData, config)
        .then(response => {
          // console.log("api returned")
          // console.log(response)
          resolve(response.data)
        })
        .catch(err => {
          console.warn('api failed')
          console.warn(err.message)
          reject(err)
        })
    })
  }

}
