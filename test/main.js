/**
 * test/main.js
 */

const client = require('../index');

async function main() {
  console.log("dictadata-client test");

  let user = new client.User('drewlab')
  user.password = 'pi7za1'

  let account = new client.Account()
  let response = await account.login(user)
  console.log(JSON.stringify(response,null,"  "))
}

main();
