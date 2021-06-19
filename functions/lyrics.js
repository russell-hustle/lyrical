const axios = require('axios');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = async (event) => {
  // if (event.httpMethod === 'OPTIONS') {
  //   return {
  //     statusCode: 200,
  //     headers,
  //     body: "hello preflight how is your day?",
  //   };
  // }

  try {
    // Get genius song URL
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
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

};

module.exports = { handler };