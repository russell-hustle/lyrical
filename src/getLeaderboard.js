import axios from 'axios';
import qs from 'querystring';


const server_url = 'https://lyrical-middleman.herokuapp.com'

async function getLeaderboardData() {
	let { data } = await axios.get(server_url + '/getleaderboard');
	return data;
}

async function updateScore(user_id, points, efficiency, name=null) {
	let body = qs.stringify({
		user_id: user_id,
		points: points,
		efficiency: efficiency,
		name: name
	});
	let { data } = await axios.put(server_url + '/updatescore', body);
	return data;
}

export { getLeaderboardData, updateScore };