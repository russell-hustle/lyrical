import axios from 'axios';


const server_url = 'https://lyrical-middleman.herokuapp.com'

async function getLeaderboardData() {
	let { data } = await axios.get(server_url+ '/getleaderboard');
	return data;
}

export { getLeaderboardData };