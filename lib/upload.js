/**
 * dictadata-client/import.js
 */

import DictaDataAPI from './dictaDataAPI'
import Roles from './roles'

export default class Upload extends DictaDataAPI {

  constructor(options) {
    super(options)
  }

  CSV_import(formData) {
    //console.log("CSV_import")

    return new Promise( (resolve, reject) => {
      if (!this.account.isAuthorized(Roles.Import) && !this.account.isAuthorized(Roles.Admin)) {
        console.log("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      this.axios.post('/import/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
