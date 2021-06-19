/* Import faunaDB sdk */
const process = require('process');

const { query, Client } = require('faunadb');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// Body will recieve
const handler = async (event) => {
  const scoreData = JSON.parse(event.body);
  // The spotify id
  const { id } = event;
  console.log(`Function 'update' invoked. update spotify id: ${id}`);
  try {
    // Find user with spotify id
    const { data } = await client.query(
      client.Match(
        client.Index('users'), id
      )
    );
    const faunaID = data[0].ref.id;
    console.log(`user with spotify ID ${id} found in FaunaDB, rref id: ${faunaID}`);

    const response = await query.Update(
      query.Ref(
        query.Collection('users'), faunaID), { scoreData }
    );

    console.log('success', response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler };
