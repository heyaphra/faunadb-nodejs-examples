/**
 *
 * TODO: PROMISIFY CHILD PROCESS AND REFACTOR TO UTILIZE FAUNA SHELL INSTEAD OF NODE DRIVER
 *
 */

require("dotenv").config();

const fs = require("fs");
const { spawn } = require("child_process");
const envfile = require("envfile");

const faunadb = require("faunadb");
const {
  Create,
  Collection,
  CreateDatabase,
  CreateCollection,
  CreateIndex,
  CreateKey,
  Database
} = faunadb.query;

let client = new faunadb.Client({ secret: process.env.FDB_FQL_ADMIN_KEY });

const createDB = async name => {
  try {
    if (!name) return false;
   
  } catch (e) {
    console.log(e);
  }
};

const createKey = async (db, role) => {
  let _key;
  try {
    _key = await client.query(CreateKey({ database: Database(db), role }));
  } catch (e) {
    console.log(e);
  }
  return { [role]: _key.secret };
};

const createIndex = async function(client) {
  try {
    let _index = await client.query(
      CreateIndex({
        name: "<name>",
        permissions: "<permission>",
        source: "<source>",
        terms: "<terms>",
        unique: "boolean"
      })
    );
    console.log("Created index");
  } catch (e) {
    console.log(e);
  }
};

const createCollection = async function(client) {
  try {
    const _users = await client.query(CreateCollection({ name: "name" }));
  } catch (e) {
    console.log(e);
  }
};

// const setupDB = async () => {
//   await createDB();
//   const _keys = await createKeys();
//   return {
//     client: new faunadb.Client({ secret: _keys.server }),
//     keys: _keys
//   };
// };
// createKey('testdb', 'admin');
module.exports = { createDB, createKey };
