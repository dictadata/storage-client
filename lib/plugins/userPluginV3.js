/**
 * userPlugin.js
 *
 * Global account object.
 * Access in Vue components with this.$user
 */

import Account from '../account'

export const UserPluginV3 = {

  install(app, options) {
    var account = new Account()
    if (options && options.account)
      account.copy(options.account)
    // Vue.js 3
    app.config.globalProperties.$user = account
  }

}

export default UserPluginV3
