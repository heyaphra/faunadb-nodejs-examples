/**
 * Summary: 
 *   - Basic example showing use of Apollo/GraphQL with FaunaDB
 * 
 * Prerequisites: 
 *   - Get your database up and running - https://docs.fauna.com/fauna/current/start/graphql
 * 
 * Notes:
 *  - All HTTP requests must be authenticated with a base-64 digest of your relevant key
 *  - Alternatively, with Fauna's GraphQL endpoint you can use the Bearer authentication scheme and completely forego base-64 encoding
 */


require("dotenv").config();
const gql = require("graphql-tag");
const ApolloClient = require("apollo-boost").ApolloClient;
const createHttpLink = require("apollo-link-http").createHttpLink;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;

const { FDB_ADMIN_KEY: adminKey } = process.env;

const digest = Buffer.from(`${adminKey}:`).toString('base64');

/* Create an Apollo Client with the FaunaDB GraphQL endpoint and authorization headers */
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      Authorization: `Basic ${digest}`
    }
  }),
  cache: new InMemoryCache()
});

/* Performs a basic mutation */
const createList = async title => {
  const _res = await client.mutate({
    variables: { title },
    mutation: gql`
      mutation CreateAList($title: String!) {
        createList(data: { title: $title }) {
          title
          _id
        }
      }
    `
  });
  console.log(JSON.stringify(_res.data, null, 2));
};

createList('My Awesome List');
