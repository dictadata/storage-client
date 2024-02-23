/**
 * test/files/files.js
 */
"use strict"

import { login } from "../lib/client.js"
import Files from "../../lib/files.js"

async function testFiles() {

  try {
    let files = new Files()

    let url = "https://www.dictadata.net/robots.txt"

    console.log("--- get file")
    let contents = await files.getFile(url)
    console.log(contents)
  }
  catch (err) {
    console.warn(err.message)
    return
  }
}

// test runner
(async () => {
  console.log("dictadata-client tests")
  await login()
  await testFiles()
  console.log("--- done")
})()
