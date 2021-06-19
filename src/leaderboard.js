import axios from 'axios';
import qs from 'querystring';

import { functions } from './axiosInstances';


const server_url = 'https://lyrical-middleman.herokuapp.com';

async function getLeaderboardData() {
	let { data } = await axios.get(server_url + '/getleaderboard');
	return data;
}

async function updateScore(user_id, points, efficiency, name = null) {
	let body = qs.stringify({
		user_id: user_id,
		points: points,
		efficiency: efficiency,
		name: name
	});
	let { data } = await axios.put(server_url + '/updatescore', body);
	return data;
}


/**
 * Get all user data for the leaderboard
 * @returns {Array} The array of users scores in ranked order
 */
async function getLeaderboard() {
	try {
		let response = await functions.get('/users');
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

/**
 * 
 * @param {number} spotifyID The spotify ID retrieved from the API
 * @param {string} name Spotify username for current user
 */
async function addUser(spotifyID, name) {
	try {
		let response = await functions.post(`/users/${this.updateUserID}`, {
			spotifyID,
			name
		});
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Update a user's score by their spotify ID
 * @param {number} spotifyID The spotify ID retrieved from the API
 * @param {string} newScoreData The new data to be uploaded
 * @param {number} newScoreData.points The new points total ?
 * @param {number} newScoreData.accuracy Thew new accuracy
 */
async function updateUser(spotifyID, newScoreData) {
	try {
		let response = await functions.put(`/users/${spotifyID}`, newScoreData);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

// export { getLeaderboardData, updateScore };
export { getLeaderboard, addUser, updateUser, getLeaderboardData, updateScore };
