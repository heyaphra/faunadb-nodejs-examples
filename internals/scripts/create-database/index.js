/**
 * This will be a CLI script that lets users provision Fauna database(s)
 * WARNING: THIS IS NOT READY FOR USE. CURRENTLY UNDER DEVELOPMENT.
 */
const { Walkthrough } = require('./main');;
module.exports = async () => {
  const questions = new Walkthrough().askQuestions()
};
