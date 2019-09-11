require('dotenv').config();

const fs = require('fs');

const envfile = require('envfile')

const env = envfile.parseFileSync('.env');

const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FDB_ADMIN_KEY });

const createDB = async () => {
    try {
        const res = await client.query(q.CreateDatabase({ name: 'my_app' }))
        console.log(res)
    } catch (e) {
        console.log(e);
    }
}

const createKeys = async () => {
    try {
        let _server = await client.query(
            q.CreateKey({ database: q.Database('my_app'), role: 'server' })
        );
        env.FDB_SERVER_KEY = _server.secret;
    } catch (e) {
        console.log(e)
    }
    try {
        let _client = await client.query(
            q.CreateKey({ database: q.Database('my_app'), role: 'client' })
        );
        env.FDB_CLIENT_KEY = _client.secret;
    } catch (e) {
        console.log(e)
    }
    fs.writeFileSync('./.env', envfile.stringifySync(env));
}

(async () => { await createDB(); await createKeys(); })()