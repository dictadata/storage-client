/**
 * account-plugin.js
 *
 * Global account object.
 * Access in Vue components with this.$user
 */

import { Account } from '../client'

const userPlugin = {
  install(Vue, options) {
    var account = new Account()
    if (options && options.account)
      account.copy(options.account)
    Vue.prototype.$user = account
  }
}

export default userPlugin
