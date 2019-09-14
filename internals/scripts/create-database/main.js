const prompts = require("prompts");
const questions = require("./questions");
class Walkthrough {
  constructor() {
    this.askQuestions = this.askQuestions.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit() {
    console.log('woohoo!')
  }
  async askQuestions() {
    const { onSubmit } = this;
    prompts(questions, { onSubmit })
  }
}

module.exports = { Walkthrough };
