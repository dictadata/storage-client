/**
 * user-plugin.js
 *
 * Global user object.
 * Access in Vue components with this.$user
 */

import { User } from '../client'

const userPlugin = {
  install(Vue) {
    var user = new User('dicta')
    user.password = 'data'
    user.roles = ["Public", "Docs", "Notify"]
    Vue.prototype.$user = user
  }
}

export default userPlugin
