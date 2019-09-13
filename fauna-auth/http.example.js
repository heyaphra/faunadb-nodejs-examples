/**
 * Summary: HTTP requests to your database must contain a base-64 digest of the relevant key in the Authorization header.
 * Prerequisites: A Fauna database with an endpoint.
 */
const axios = require("axios");

const example = async token => {
  const digest = Buffer.from(`${token}:`).toString("base64");
  const opts = {
    method: '<GET | POST | PUT | DELETE>',
    headers: { Authorization: `Basic ${digest}` },
    url: '<fauna endpoint>'
  };
  try {
    const _res = await axios(opts);
    console.log(_res.status);
  } catch (e) {
    throw new Error(e);
  }
};

