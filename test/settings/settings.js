/**
 * test/settings/settings.js
 */
"use strict"

import { login } from "../lib/client.js"
import Settings from "../../storage/client/settings.js"

async function testSettings() {

  try {
    let settings = new Settings()

    let key = 'words'
    let props = {
      hello: 'world',
      guden: 'dach',
      languages: [ 'english', 'german' ]
    }

    console.log("--- store settings")
    console.log(JSON.stringify(props))
    let results = await settings.store(key, props)
    console.log(results.status + " " + results.message)

    console.log("--- recall settings")
    results = await settings.recall(key)
    console.log(results.status + " " + results.message)
    console.log(JSON.stringify(results.data[key]))
  }
  catch (err) {
    console.warn(err.message)
    return
  }
}

// test runner
(async () => {
  console.log("storage-client tests")
  await login()
  await testSettings()
  console.log("--- done")
})()
