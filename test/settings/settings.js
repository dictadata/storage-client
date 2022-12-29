/**
 * test/settings/settings.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Settings from "../../lib/settings.js"
import $user from '../../lib/user.js'

DictaDataAPI.baseURL = "http://dev.dictadata.org"

/**
 * User
 */
async function testSettings() {

  try {
    console.log("--- user login")
    let user = { userid: "user", password: "user" }
    let account = await $user.login(user)

    let settings = new Settings()
    let props = {
      hello: 'world',
      guden: 'dach',
      languages: [ 'english', 'german' ]
    }
    console.log(JSON.stringify(props))

    console.log("--- put settings")
    let message = await settings.store('words', props)
    console.log(message)

    let rProps = await settings.recall('words')
    console.log(JSON.stringify(rProps))
  }
  catch (err) {
    console.warn(err.message)
    return
  }

}

// test runner
(async () => {
  console.log("dictadata-client tests")
  await testSettings()
  console.log("--- done")
})()
