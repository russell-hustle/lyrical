const process = require('process');

const { query: q, Client } = require('faunadb');

const client = new Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async () => {
	try {
		// Get all user data
		const { data } = await client.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection('users'))),
				q.Lambda(x => q.Get(x))
			)
		);
		return {
			statusCode: 200,
			body: JSON.stringify(data),
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
