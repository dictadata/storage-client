/**
 * test/storage/recall.js
 */
"use strict"

import { login } from "../lib/client.js"
import Storage from "../../lib/storage.js"

console.log("=== tests: storage recall")

function replacer(key, value) {
  if (value instanceof Map) {
    return Object.fromEntries(value.entries())
  } else if (value instanceof Set) {
    return [ ...value ]
  } else {
    return value;
  }
}

async function test_recall(smt_urn, keyValue) {
  console.log("recall " + smt_urn)
  let retCode = 0

  try {
    let storage = new Storage()

    // console.log('call storage.retrieve')
    let pattern = {
      "match": {
      },
      "count": 100
    }
    if (keyValue === 'first')
      pattern.match[ "key" ] = keyValue
    else
      pattern.match[ "Foo" ] = keyValue

    let results = await storage.recall(smt_urn, pattern)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log(smt_urn + " " + JSON.stringify(results.data, replacer))
  }
  catch (err) {
    console.warn(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  await login()

  if (await test_recall(":es_foo_schema", 'first')) return
  if (await test_recall(":es_foo_schema", 'seventh')) return
  if (await test_recall(":es_foo_schema", 'twenty')) return

  if (await test_recall(":mssql_foo_schema", 'second')) return
  if (await test_recall(":mysql_foo_schema", 'second')) return
})()
