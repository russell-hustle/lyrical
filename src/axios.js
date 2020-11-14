import axios from 'axios';
import qs from 'querystring';
import store from './store';


const spotify = axios.create({
	baseURL: 'https://api.spotify.com/v1/me',
});

spotify.interceptors.request.use(
	function (config) {
		const token = store.state.access_token;
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

const lyrics = axios.create({
	baseURL: 'http://127.0.0.1:5000/',
	// baseURL: 'https://lyrics-microservice.azurewebsites.net',
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
});


// Serializes data into application/x-www-form-urlencoded
lyrics.interceptors.request.use(
	function (config) {
		console.log(config.data);
		config.data = qs.stringify(config.data);
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);


export { spotify, lyrics };