const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const statusCode = 200;

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers,
      body: "This was not a POST request!",
    };
  }

  const data = JSON.parse(event.body);
  console.log("here is the data we are getting: " + data);
  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      data
    })
  };
};
