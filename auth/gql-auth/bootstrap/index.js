
/**
 * WARNING: INCOMPLETE. USE AT YOUR OWN DISCRETION.
 */
require("dotenv").config();

const fs = require("fs");

const envfile = require("envfile");

const env = envfile.parseFileSync(".env");

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

let client = new faunadb.Client({ secret: process.env.FDB_GQL_ADMIN_KEY });

const createDB = async () => {
  try {
    const _db = await client.query(CreateDatabase({ name: "testdb" }));
    console.log("New DB created:", _db);
  } catch (e) {
    console.log(e);
  }
};

const createKeys = async () => {
  let _server, _client;
  try {
    _server = await client.query(
      CreateKey({ database: Database("testdb"), role: "server" })
    );
    console.log("Created server key");
    env.FDB_GQL_SERVER_KEY = _server.secret;
  } catch (e) {
    console.log(e);
  }
  try {
    _client = await client.query(
      CreateKey({ database: Database("testdb"), role: "client" })
    );
    console.log("Created client key");
    env.FDB_GQL_CLIENT_KEY = _client.secret;
  } catch (e) {
    console.log(e);
  }
  await fs.writeFile("./.env", envfile.stringifySync(env), () =>
    console.log("Published environmental variables")
  );
  return { server: _server.secret, client: _client.secret };
};

const createSchema = async function(client) {
  try {
    const _users = await client.query(CreateCollection({ name: "users" }));
    let _index = await client.query(
      CreateIndex({
        name: "users_by_email",
        permissions: { read: "public" },
        source: Collection("users"),
        terms: [{ field: ["data", "email"] }],
        unique: true
      })
    );
    console.log("Created schema");
  } catch (e) {
    console.log(e);
  }
};

const createUsers = async function(client) {
  try {
    const _user = await client.query(
      Create(Collection("users"), {
        credentials: { password: "secret password" },
        data: { email: "alice@example.com" }
      })
    );
    console.log("Created a test user", _user);
  } catch (e) {
    console.log(e);
  }
};

const setupDB = async () => {
  await createDB();
  const _keys = await createKeys();
  return {
    client: new faunadb.Client({ secret: _keys.server }),
    keys: _keys
  };
};

(async () => {
  const db = await setupDB();
  const server_client = db.client;
  await createSchema(server_client);
  await createUsers(server_client);
})();
