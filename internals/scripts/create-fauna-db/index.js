/**
 * This will be a CLI script that lets users provision Fauna database(s)
 * WARNING: THIS IS NOT READY FOR USE. CURRENTLY UNDER DEVELOPMENT.
 */
const { checkEnv } = require('../utils/env');
const { Walkthrough } = require("./main");
const { askQuestions } = new Walkthrough();

module.exports = async () => {
  checkEnv();
  askQuestions();
};

