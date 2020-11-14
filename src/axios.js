import axios from 'axios';
import store from './store';

const http = axios.create({
	baseURL: 'https://api.spotify.com/v1/me',
});

http.interceptors.request.use(
	function (config) {
		const token = store.state.access_token;
		console.log(token);
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default http;