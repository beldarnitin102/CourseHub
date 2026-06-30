const { CohereClientV2 } = require("cohere-ai");
require("dotenv").config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

module.exports = cohere;