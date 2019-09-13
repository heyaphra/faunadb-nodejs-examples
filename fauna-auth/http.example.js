/**
 * Summary: Authenticated HTTP Request
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

