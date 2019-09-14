const fs = require("fs");
const { spawn } = require("child_process");
const { createKey }= require('../fdb');
const envfile = require("envfile");
const appRoot = require("app-root-path");
const envPath = appRoot + "/.env";
const env = envfile.parseFileSync(envPath);

const checkEnv = () => {
  if (!env) {
    fs.writeFileSync(envPath);
  }
};

const writeToEnv = params => {
 /* Write to env */
};

module.exports = { checkEnv, writeToEnv };
