/**
 * dictadata-client/import.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Import {

  CSV_import(user, formData) {
    //console.log("CSV_import")

    return new Promise(async(resolve, reject) => {

      if (!user.isAuthorized(Roles.Import) && !user.isAuthorized(Roles.Admin)) {
        console.log("not authorized")
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(user)
        .post('/import/csv', formData, {
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
