import axios from 'axios';
import qs from 'querystring';
import store from './store';


// SPOTIFY INTEGRATION
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

// LYRICS SERVER
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

// GENIUS
const genius = axios.create({
	baseURL: 'https://api.genius.com',
	// baseURL: 'https://lyrics-microservice.azurewebsites.net',
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "TyQSN0a4oA7_NUcqKoaM3FH40G86CctyPIbkMD_CTYSbSzj2gAA24NR5NX5qlWes"
	},
});

// Serializes data into application/x-www-form-urlencoded
genius.interceptors.request.use(
	function (config) {
		console.log(config.data);
		config.data = qs.stringify(config.data);
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// import { getLyrics, getSong } from 'genius-lyrics-api';

// const options = {
// 	apiKey: 'XXXXXXXXXXXXXXXXXXXXXXX',
// 	title: 'Blinding Lights',
// 	artist: 'The Weeknd',
// 	optimizeQuery: true
// };

// getLyrics(options).then((lyrics) => console.log(lyrics));

// getSong(options).then((song) =>
// 	console.log(`
// 	${song.id}
// 	${song.url}
// 	${song.albumArt}
// 	${song.lyrics}`)
// );

export { spotify, lyrics, genius };