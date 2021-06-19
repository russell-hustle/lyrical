const process = require('process');

const { query, Client } = require('faunadb');

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async () => {
  try {
    const response = await client.query(
      query.Paginate(
        query.Match(
          query.Index('users')
        )
      )
    );
    const itemRefs = response.data;
    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllItemsDataQuery = itemRefs.map((ref) => query.Get(ref));
    // then query the refs
    const ret = await client.query(getAllItemsDataQuery);
    // Map to expected format and calculate derivatives
    const data = ret.map((user) => {
      console.log(user);
      return {
        id: user.ref.id,
        name: user.data.name,
        points: user.data.points,
        efficiency: user.data.efficiency,
        score: user.data.points * user.data.efficiency
      };
    });
    // TODO: maybe move this to client side? so we dont take excess server time
    // Sort by score
    const sortedData = data.sort((a, b) => a.score < b.score ? -1 : 1);
    // Add rank
    const rankedData = sortedData.map((user, index) => ({
      rank: index + 1,
      ...user
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(rankedData),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler };
