const questions = [
  {
    type: "text",
    name: "name",
    message: "Database Name"
  },
  {
    type: "multiselect",
    name: "keys",
    message: "Would you to create any keys?",
    choices: [
      {
        title: "Admin",
        value: {
          type: "admin",
          callback: function() {
            console.log("Creating key", this.type);
          }
        }
      },
      {
        title: "Server",
        value: {
          type: "server",
          callback: function() {
            console.log("Creating key", this.type);
          }
        }
      },
      {
        title: "Client",
        value: {
          type: "client",
          callback: function() {
            console.log("Creating key", this.type);
          }
        }
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
        value: () => console.log("importGQLSchema()")
      },
      {
        title: "Create a collection",
        value: () => console.log("createCollection()")
      },
      {
        title: "Create an index",
        value: () => console.log("createIndex()")
      },
      {
        title: "Review and finalize",
        value: () => console.log("finalize()")
      }
    ],
    initial: 0
  }
];

module.exports = questions;
