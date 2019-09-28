"use strict";
require("dotenv").config();
const { request } = require("graphql-request");
const gql = require("graphql-tag");

module.exports = async config => {
  const routing = new Routing(config.app);
  routing.configure();
  routing.bind(routing.handle);
};

const { FDB_GQL_ADMIN_KEY: adminKey } = process.env;
const gql_endpoint = "https://graphql.fauna.com/graphql";
const client = new GraphQLClient(gql_endpoint, {
  headers: {
    authorization: `Bearer ${adminKey}`
  }
});
const query = gql`
  mutation CreateAList($title: String!) {
    createList(data: { title: $title }) {
      title
      _id
    }
  }
`;

class Routing {
  constructor(app) {
    this.app = app;
  }

  configure() {
    const bodyParser = require("body-parser");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw());
    this.app.use(bodyParser.text({ type: "text/*" }));
    this.app.disable("x-powered-by");
  }

  bind(route) {
    const { _signup, _login, _update, _delete, _addtodo } = this;
    this.app.post("/signup", _signup);
    this.app.post("/addtodo/:title", _addtodo);
    this.app.get("/login", _login);
    this.app.patch("/update", _update);
    this.app.delete("/delete", _delete);
  }

  _addtodo(req, res) {
    const data = await request(gql_endpoint, query, { title });
    res.send(JSON.stringify(`Creating todo: ${req.params.title} ... Check your database! ${data}`));
  }

  _signup(req, res) {
    res.send(JSON.stringify(`hello from ${req.path}`));
  }

  _login(req, res) {
    res.send(JSON.stringify(`hello from ${req.path}`));
  }

  _update(req, res) {
    res.send(JSON.stringify(`hello from ${req.path}`));
  }

  _delete(req, res) {
    res.send(JSON.stringify(`hello from ${req.path}`));
  }
}