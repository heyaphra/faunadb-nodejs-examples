require('dotenv').config();

const fs = require('fs');

const envfile = require('envfile')

const env = envfile.parseFileSync('.env');

const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FDB_ADMIN_KEY });

const createDB = async () => {
    try {
        const _db = await client.query(q.CreateDatabase({ name: 'my_app' }))
        console.log(_db)
    } catch (e) {
        console.log(e);
    }
}

const createKeys = async () => {
    try {
        let _server = await client.query(
            q.CreateKey({ database: q.Database('my_app'), role: 'server' })
        );
        console.log('Successfully created server key')
        env.FDB_SERVER_KEY = _server.secret;
    } catch (e) {
        console.log(e)
    }
    try {
        let _client = await client.query(
            q.CreateKey({ database: q.Database('my_app'), role: 'client' })
        );
        console.log('Successfully created client key')
        env.FDB_CLIENT_KEY = _client.secret;
    } catch (e) {
        console.log(e)
    }
    fs.writeFileSync('./.env', envfile.stringifySync(env));
}

const createSchema = async () => {
    try {
        const _users = await client.query(q.CreateCollection({ name: 'users' }))
        let _index = await client.query(
            q.CreateIndex(
                {
                    name: 'users_by_email',
                    permissions: { read: 'public' },
                    source: q.Collection('users'),
                    terms: [{ field: ['data', 'email'] }],
                    unique: true
                }
            )
        )
        console.log(_users, _index)
    } catch (e) {
        console.log(e);
    }
}

(async () => {
    await createDB();
    await createKeys();
    await createSchema();
})()