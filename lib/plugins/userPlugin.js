/**
 * userPlugin.js
 *
 * Global account object.
 * Access in Vue components with this.$user
 */

import Account from '../account'

export const UserPlugin = {

  install(Vue, options) {
    var account = new Account()
    if (options && options.account)
      account.copy(options.account)
    Vue.prototype.$user = account
  }

}

export default UserPlugin
