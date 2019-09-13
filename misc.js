/* Code snippets that might be useful. */

/**
 * Authenticated HTTP Request
 */
const axios = require("axios");

const isLoggedIn = async token => {
  const digest = Buffer.from(`${token}:`).toString("base64");
  const opts = {
    method: "GET",
    headers: { Authorization: `Basic ${digest}` },
    url: "https://db.fauna.com/tokens/self"
  };
  try {
    const _res = await axios(opts);
    console.log(_res.status);
  } catch (e) {
    throw new Error(e);
  }
};

isLoggedIn("fnEDYD1I3OACCgNgPUYfEAIK5K9EblR_NAONWKiMfZq3XvF0I2E");
