/**
 * Summary:
 *   - Basic example showing HTTP request to a Fauna endpoint
 *
 * Notes:
 *  - All HTTP requests must be authenticated with a base-64 digest of your relevant key
 *  - For GraphQL you may use a Bearer authentication scheme and completely forego base-64 encoding
 */

const axios = require("axios");

const example = async token => {
  const digest = Buffer.from(`${token}:`).toString("base64");
  const opts = {
    method: "<GET | POST | PUT | DELETE>",
    headers: { Authorization: `Basic ${digest}` },
    url: "<fauna endpoint>"
  };
  try {
    const _res = await axios(opts);
    console.log(_res.status);
  } catch (e) {
    throw new Error(e);
  }
};
