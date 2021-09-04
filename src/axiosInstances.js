import axios from 'axios';
import store from './store';


// SPOTIFY INTEGRATION
const spotify = axios.create({
	baseURL: 'https://api.spotify.com/v1/me',
});

spotify.interceptors.request.use(
	function (config) {
		const token = store.state.accessToken;
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// NETLIFY FUNCTION CALLS
const functions = axios.create({
	baseURL: '/.netlify/functions'
});

export { spotify, functions };