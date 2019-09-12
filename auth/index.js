/**
 * Summary:
 * This script contains functions that use our mock data to perform some common authentication related tasks.
 * 
 * Prerequisites:
 * You must have a seeded FaunaDB created using ../bootstrap_db
 * 
 */

require('dotenv').config();

const faunadb = require('faunadb'),
    q = faunadb.query;

const { Login, Select, Get, Match,  Identify, Index } = q;

let client = new faunadb.Client({ secret: process.env.FDB_SERVER_KEY });

const loginWithEmail = async (email, password) => {
    try {
        const _user = await findUserByEmail(email);
        const _res = await client.query(
            Login(
                Match(
                    Index('users_by_email'),
                    Select(['data', 'email'], Get(user.ref))
                ), { password }
            )
        );
        console.log(_res)
    } catch (e) {
        console.log(e)
    }
}

const findUserByEmail = async (email) => {
    try {
        const _res = await client.query(
            Select(['ref'], Get(Match(Index('users_by_email'), email)))
        );
        return _res;
    } catch (e) {
        console.log(e.status)
    }
}

const validateCredentials = async (user, password) => {
    try {
        const _id = await client.query(
            Identify(Match(Index('users_by_email'), user), password)
        );
        console.log(id);
    } catch (e) {
        console.log(e)
    }
}

const revokeAllTokens = async () => {
    try {
        const _res = await client.query(q.Logout(true));
        console.log(_res)
    } catch (e) {
        console.log(e)
    }
}

/* Login */
// loginWithEmail('alice@example.com', 'secret password')

/* Find user by email */
// findUserByEmail('alice@example.com')

/* Logout */
// revokeAllTokens()

/* Get auth status */
// validateCredentials('alice@example.com', 'secret_password')