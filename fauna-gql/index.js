require("dotenv").config();
const gql = require("graphql-tag");
const ApolloClient = require("apollo-boost").ApolloClient;
const createHttpLink = require("apollo-link-http").createHttpLink;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;

const { FDB_ADMIN_KEY: adminKey } = process.env;

/* All HTTP requests must be authenticated with a base-64 digest of your relevant key */
const digest = Buffer.from(`${adminKey}:`).toString("base64");

/* Create an Apollo Client with the FaunaDB GraphQL endpoint and authorization headers */
const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://graphql.fauna.com/graphql",
    headers: {
      Authorization: `Basic ${digest}`
    }
  }),
  cache: new InMemoryCache()
});

/* Performs a basic mutation */
const createList = async (title) => {
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
