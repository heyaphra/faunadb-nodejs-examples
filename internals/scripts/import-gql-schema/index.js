/**
 * This will be a CLI script that lets users provision Fauna database(s)
 *
 */

const minimist = require("minimist");

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  console.log(args, 'GQL!');
};
