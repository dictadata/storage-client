/**
 * dictadata-client/account.js
 */

const dictaAPI = require('./dictaAPI')
const Roles = require('./roles')

module.exports = class Account {

  login(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(user).get('/node/login', {userid: user.userid, password: user.password})
        .then(response => {
          //console.log(response)
          resolve(response.data.account)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  register(user) {
    // eslint-disable-next-line space-in-parens
    return new Promise((resolve, reject) => {
      if (!user.isAuthorized(Roles.Public)) {
        reject(new Error('Not Authorized'))
        return
      }

      dictaAPI(user).post('/node/register', user)
        .then(response => {
          resolve(response.result)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

}
