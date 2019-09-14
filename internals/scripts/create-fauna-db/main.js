const fs = require("fs");
const ora = require("ora");
const prompts = require("prompts");
const questions = require("./questions");
const { writeToEnv } = require("../utils/env");
const { createDB } = require("../utils/fdb");

class Walkthrough {
  constructor() {
    this.spinner = text => ora(text);
    this.askQuestions = this.askQuestions.bind(this);
    this.exec = this.exec.bind(this);
    this.setup = this.setup.bind(this);
    this.setConfig = this.setConfig.bind(this);
    this.selectAction = this.selectAction.bind(this);
  }
  async setConfig() {
    const _setup = questions.slice(0, 2);
    const res = await prompts(_setup);
    return res;
  }
  async selectAction() {
    const _verbs = questions[questions.length - 1];
    const res = await prompts(_verbs);
    return res;
  }
  async exec({ action }) {
    action();
  }
  async setup(config) {
    const { spinner } = this;
    /* Provision database */
    /* Write to env */    
    /* Provision keys */
  }
  async askQuestions() {
    const { setup, exec } = this;

    const _config = await this.setConfig();
    await setup(_config);

    const _action = await this.selectAction();
    await exec(_action);
  }
}

module.exports = { Walkthrough };
