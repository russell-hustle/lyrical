import axios from "axios";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async function(event, context, callback) {
  const { url } = JSON.parse(event.body);
  console.log(url);
  let { data } = await axios.get(url);
  if (data != null) {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: data,
      }),
    });
  } else {
    callback(new Error("lyrics not found no cap"));
  }
};
