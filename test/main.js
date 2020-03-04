/**
 * test/main.js
 */

const client = require('../index');

console.log("dicta.io-client tests");
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_DICTA_API);

let user = new client.User('drewlab', 'pi7za1')

/**
 * login
 */
async function accountTests() {
  console.log("=== register test");
  try {
    let account = new client.Account(user)
    let result = await account.register()
    console.log("result: " + JSON.stringify(result, null, "  "))
  }
  catch (err) {
    console.log(err);
  }

  console.log("=== login test");
  try {
    let account = new client.Account(user)
    let result = await account.login()
    console.log("result: " + JSON.stringify(result, null, "  "))
  }
  catch (err) {
    console.log(err);
  }
}

/**
 * 
 */

// test runners
accountTests();
