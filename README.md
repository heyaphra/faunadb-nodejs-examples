# faunadb-nodejs-examples


Familiarizing myself with FaunaDB and hoping to lessen the learning curve for others!

# Getting started
  - Create a databse using fauna shell or the dashboard
  - Create a .env file with `FDB_FQL_ADMIN_KEY=<your admin key>` (and GQL keys, if applicable)
  - `yarn` or `npm install`
  - Check out some scripts! I recommend looking at fql/auth first
  - To run any script, `node <path/to/script>`

## Local Fauna Dashboard!

You can use the included scripts on package.json to connect to any Fauna endpoint, in addition to spinning up a local FaunaDB Docker image for running fast experiments.

```
# installs repo-wide dependencies
yarn setup

# starts a FaunaDB single-node Docker image on port 8443
yarn start:fdb

#runs the Fauna dashboard in the background on port 3000
yarn start:fdb-dash

# stops the dashboard process
yarn stop:fdb-dash

# adds a Fauna endpoint
yarn add:fdb-endpoint <endpoint> --alias <alias> --key <secret>

# lists available Fauna endpoints
yarn list:fdb-endpoints

# sets your Fauna endpoint
yarn set:fdb-endpoint <alias>

# takes you inside your FaunaDB Docker image
yarn bash:fdb-dash
```

Tasks:
- [x] Make a script to bootstrap a database
- [x] Model a basic user authentication flow
- [ ] **YOUR IDEA HERE :o)**