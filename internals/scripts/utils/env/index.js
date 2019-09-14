const fs = require("fs");
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
  const { db, keys } = params;
  keys.forEach(async key => {
    const variable = `${db.toUpperCase()}_FDB_${key.type.toUpperCase()}_KEY`;
    // 1. create a new secret key here
    // 2. set env[variable] = secret
  })
  // 3. Write to env file
  // fs.writeFileSync(envPath, envfile.stringifySync(env));
};

module.exports = { checkEnv, writeToEnv };
