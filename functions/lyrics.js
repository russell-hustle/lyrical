const axios = require('axios');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async function (event, context, callback) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: "hello preflight how is your day?",
    };
  }
  const { url } = JSON.parse(event.body);
  let { data } = await axios.get(url, headers);
  if (data != null) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        lyrics: data,
      }),
    };
  } else {
    return {
      statusCode: 404,
      headers,
    };
  }
};
