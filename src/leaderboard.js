import axios from 'axios';

import { functions } from './axiosInstances';


const server_url = 'https://lyrical-middleman.herokuapp.com';

async function getLeaderboardData() {
	let { data } = await axios.get(server_url + '/getleaderboard');
	return data;
}


/**
 * Get all user data for the leaderboard
 * @returns {Promise<Array>} The array of users scores in ranked order
 */
async function getLeaderboard() {
	try {
		let response = await functions.get('/users');
		// Map to expected format and calculate derivatives
		const data = response.data.map((user) => {
			const accuracy = user.data.correct / user.data.total_guessed;
			return {
				id: user.ref.id,
				name: user.data.name,
				points: user.data.correct,
				accuracy: accuracy,
				score: user.data.correct * accuracy
			};
		});
		// Sort by score
		const sortedData = data.sort((a, b) => a.score > b.score ? -1 : 1);
		// Add rank
		const rankedData = sortedData.map((user, index) => ({
			rank: index + 1,
			...user
		}));

		return rankedData;
	} catch (error) {
		console.error(error);
	}
}

/**
 * 
 * @param {number} spotifyID The spotify ID retrieved from the API
 * @param {string} name Spotify username for current user
 * @returns {Promise}
 */
async function addUser(spotifyID, name) {
	try {
		console.log(spotifyID, name);
		await functions.post("/users", {
			spotifyID,
			name
		});
	} catch (error) {
		console.error(error);
	}
}

/**
 * Update a user's score by their spotify ID
 * @param {number} spotifyID The spotify ID retrieved from the API
 * @param {string} newScoreData The new data to be uploaded
 * @param {number} newScoreData.points The new points total ?
 * @param {number} newScoreData.accuracy The new accuracy
 * @returns {Promise}
 */
async function updateScore(spotifyID, correct) {
	try {
		let response = await functions.put(`/users/${spotifyID}`, {
			correct
		});
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

// export { getLeaderboardData, updateScore };
export { getLeaderboard, addUser, getLeaderboardData, updateScore };
