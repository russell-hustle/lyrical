const process = require('process');

const { query: q, Client } = require('faunadb');

const client = new Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async () => {
	try {
		// Get all user data
		const response = await client.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection('users'))),
				q.Lambda(x => q.Get(x))
			)
		);

		// Map to expected format and calculate derivatives
		const data = response.data.map((user) => {
			return {
				id: user.ref.id,
				name: user.data.name,
				points: user.data.points,
				accuracy: user.data.accuracy,
				score: user.data.points * user.data.accuracy
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
