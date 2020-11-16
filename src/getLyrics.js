import axios from 'axios';

// Sanitizes search parameters
function getTitle(title, artist) {
	return `${title} ${artist}`
		.toLowerCase()
		.replace(/ *\([^)]*\) */g, '')
		.replace(/ *\[[^\]]*]/, '')
		.replace(/feat.|ft./g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

const searchUrl = 'https://api.genius.com/search?q=';

/**
 * @param {{apiKey: string, title: string, artist: string}} options
 */
async function searchSong(options) {
	let { apiKey, title, artist } = options;
	const song = getTitle(title, artist);
	const reqUrl = `${searchUrl}${encodeURI(song)}&access_token=${apiKey}`;
	let { data } = await axios.get(reqUrl);
	if (data.response.hits.length === 0) return null;
	const results = data.response.hits.map((val) => {
		const { full_title, song_art_image_url, id, url } = val.result;
		return { id, title: full_title, albumArt: song_art_image_url, url };
	});
	return results;
}

// ?
const cio = require('cheerio-without-node-native');

/**
 * @param {string} url - Genius URL
 */
async function extractLyrics(url) {
	let { data } = await axios.get(url);
	const $ = cio.load(data);
	let lyrics = $('div[class="lyrics"]').text().trim();
	if (!lyrics) {
		lyrics = '';
		$('div[class^="Lyrics__Container"]').each((_i, elem) => {
			if ($(elem).text().length !== 0) {
				let snippet = $(elem).html()
					.replace(/<br>/g, '\n')
					.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
				lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
			}
		});
	}
	if (!lyrics) return null;
	return lyrics.trim();
}


/**
 * @param {({apiKey: string, title: string, artist: string, optimizeQuery: boolean}|string)} arg - options object, or Genius URL
 */
async function getLyrics(arg) {
	let results = await searchSong(arg);
	if (!results) return null;
	let lyrics = await extractLyrics(results[0].url);
	return lyrics;
}

export { getLyrics };