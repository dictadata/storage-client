/**
 * dicta-client/user.js
 */

import Account from './account.js'

class User extends Account {
  constructor() {
    super()
    this.callbacks = []
  }

  addListener(callback) {
    this.callbacks.push(callback)
  }

  removeListener(callback) {
    let index = this.callbacks.indexOf(callback)
    if (index >= 0)
      this.callbacks.splice(index,1)
  }

  emit() {
    this.callbacks.forEach(cb => cb())
  }

}

// defaults to guest:guest
const $user = new User()

export default $user
