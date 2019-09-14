const questions = [
  {
    type: "text",
    name: "name",
    message: "Database Name",
  },
  {
    type: "multiselect",
    name: "keys",
    message: "Would you to create any keys?",
    choices: [
      {
        title: "Admin",
        value: async () => await console.log("creating admin key")
      },
      {
        title: "Server",
        value: async () => await console.log("creating server key")
      },
      {
        title: "Client",
        value: async () => await console.log("creating client key")
      }
    ]
  },
  {
    type: "select",
    name: "action",
    message: "What would you like to do?",
    choices: [
      {
        title: "Import a GraphQL schema",
        value: () => console.log('importGQLSchema()')
      },
      {
        title: "Create a collection",
        value: () => console.log('createCollection()')
      },
      {
        title: "Create an index",
        value: () => console.log('createIndex()')
      },
      {
        title: "Review and finalize",
        value: () => console.log('finalize()')
      }
    ],
    initial: 0
  }
];

module.exports = questions;
