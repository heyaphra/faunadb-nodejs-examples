/**
 * This will be a CLI script that lets users provision Fauna database(s)
 * WARNING: THIS IS NOT READY FOR USE. CURRENTLY UNDER DEVELOPMENT.
 */
const fs = require("fs");
const appRoot = require("app-root-path");
const { Walkthrough } = require("./main");
module.exports = async () => {
  const envfile = require("envfile");
  const envPath = appRoot + "/.env";
  let env = fs.existsSync(envPath);
  if (!env) {
    fs.writeFileSync(envPath);
  }
  new Walkthrough().askQuestions();
};
