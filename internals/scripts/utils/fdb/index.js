/**
 * Summary:
 * This script creates a new database testdb with the specified schema and test entry.
 * To be honest, this task could be delegated to a bash script, but it's probably useful
 * in production to have the ability to programmatically provision databases for users.
 * Let me know what you think!
 *
 * Prerequisites:
 * You must have an  Fauna database with your admin key stored as FDB_ADMIN_KEY in your .env file.
 * This script takes care of the rest by writing the client and server keys for the new database in your .env file.
 * Make sure to replace 'testdb' with your database name.
 *
 * TODO: Make into an interactive shell program to add flexibility, prevent overwrites, etc.
 *
 */

require("dotenv").config();

const fs = require("fs");

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

const createDB = async () => {
  try {
    const _db = await client.query(CreateDatabase({ name: "testdb2" }));
    console.log("New DB created:", _db);
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
createDB()
module.exports = { createKey };
