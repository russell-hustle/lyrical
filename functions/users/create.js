const process = require('process');

const { query, Client } = require('faunadb');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async (event) => {
  try {
    // Get spotify ID
    const userInfo = JSON.parse(event.body);
    const newUser = {
      points: 0,
      accuracy: 1.0,
      ...userInfo
    };
    console.log("New User creation:", newUser);
    /* construct the fauna query */
    const response = await client.query(
      query.Create(query.Collection('users'), newUser)
    );
    console.log('success', response);
    /* Success! return the response with statusCode 200 */
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log('error', error);
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler };
