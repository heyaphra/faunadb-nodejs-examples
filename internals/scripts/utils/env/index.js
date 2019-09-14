const fs = require("fs");
const envfile = require("envfile");
const appRoot = require("app-root-path");

const checkEnv = () => {
  const envPath = appRoot + "/.env";
  const env = fs.existsSync(envPath);
  if (!env) {
    fs.writeFileSync(envPath);
  }
};

module.exports = { checkEnv }