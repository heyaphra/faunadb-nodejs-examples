/**
 * This will be a CLI script that lets users provision Fauna database(s)
 * WARNING: THIS IS NOT READY FOR USE. CURRENTLY UNDER DEVELOPMENT.
 */
const fs = require("fs");
const envfile = require("envfile");
const appRoot = require("app-root-path");
const { Walkthrough } = require("./main");

module.exports = async () => {
  checkEnv();
  new Walkthrough().askQuestions();
};

const checkEnv = () => {
  const envPath = appRoot + "/.env";
  const env = fs.existsSync(envPath);
  if (!env) {
    fs.writeFileSync(envPath);
  }
}