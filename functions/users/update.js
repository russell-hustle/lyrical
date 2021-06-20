/* Import faunaDB sdk */
const process = require('process');

const { query: q, Client } = require('faunadb');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// Body will recieve
const handler = async (event) => {
  try {
    const { correct } = JSON.parse(event.body);
    // The spotify id
    const { id } = event;
    // Find user with spotify id
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('users'), id)),
        q.Lambda(x => q.Get(x))
      )
    );
    const user = data[0];
    const faunaID = user.ref.id;
    // TODO: figure out how to make this one query (find and update at same time) using some FQL magic
    const response = await client.query(
      q.Update(
        q.Ref(q.Collection('users'), faunaID),
        {
          data: {
            total_guessed: user.data.total_guessed + 1,
            correct: correct ? user.data.correct + 1 : user.data.correct
          }
        }
      ));

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
