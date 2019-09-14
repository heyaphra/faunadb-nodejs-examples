const questions = [
  {
    type: "text",
    name: "dbName",
    message: "Database Name"
  },
  {
    type: "select",
    name: "gqlEnabled",
    message: "Would you to import a GraphQL schema?",
    choices: [
      {
        title: "Yes",
        description: "Import a GraphQL schema to your new database",
        value: true
      },
      {
        title: "No",
        description: "Continue without GraphQL",
        value: false
      }
    ],
    initial: 0
  },
  {
    type: "multiselect",
    name: "keys",
    message: "Would you to create any keys?",
    choices: [
      {
        title: "Admin",
        value: true
      },
      {
        title: "Server",
        value: false
      },
      {
        title: "Client",
        value: false
      }
    ]
  },
  {
    type: "select",
    name: "actions",
    message: "What would you like to do?",
    choices: [
      {
        title: "Create a collection",
        value: true
      },
      {
        title: "Create an index",
        value: true
      },
      {
        title: "Create a child database",
        value: true
      },
      {
        title: "Review and finalize",
        value: true
      }
    ],
    initial: 0
  }
];

module.exports = questions;
