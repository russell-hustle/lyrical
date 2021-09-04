import axios from "axios";
import cio from "cheerio-without-node-native";

import { functions } from '~/axiosInstances';

// Sanitizes search parameters
function getTitle(title, artist) {
	return `${title} ${artist}`
		.toLowerCase()
		.replace(/ *\([^)]*\) */g, "")
		.replace(/ *\[[^\]]*]/, "")
		.replace(/feat.|ft./g, "")
		.replace(/\s+/g, " ")
		.trim();
}

const searchUrl = "https://api.genius.com/search?q=";
const genius_key = process.env.VUE_APP_GENIUS_API_KEY;

/**
 * Multi-step process to fetch lyrics using APIs and scraping
 * @param {string} title The title of the song
 * @param {string} artist The artist of the song
 * @returns A list of guessable lines following the app protocol
 */
async function getLyrics(title, artist) {
	let results = await searchGeniusAPI(title, artist);
	if (!results) return null;
	let lyrics = await extractLyrics(results[0].url);
	return lyrics;
}

/**
 * Gets the song data from the genius API
 * @param {string} title The title of the song
 * @param {string} artist The artist of the song
 */
async function searchGeniusAPI(title, artist) {
	const song = getTitle(title, artist);
	const reqUrl = `${searchUrl}${encodeURI(song)}&access_token=${genius_key}`;
	let { data } = await axios.get(reqUrl);
	if (data.response.hits.length === 0) return null;
	const results = data.response.hits.map((val) => {
		const { full_title, song_art_image_url, id, url } = val.result;
		return { id, title: full_title, albumArt: song_art_image_url, url };
	});
	return results;
}

/**
 * Scrapes the lyrics based on the song URL
 * @param {string} url - Genius URL
 */
async function extractLyrics(url) {
	// Use querystring for GET requests
	let { data } = await functions.get("/lyrics", {
		params: {
			url
		}
	});
	const $ = cio.load(data.lyrics);
	let lyrics = $('div[class="lyrics"]')
		.text()
		.trim();
	if (!lyrics) {
		lyrics = "";
		$('div[class^="Lyrics__Container"]').each((_i, elem) => {
			if ($(elem).text().length !== 0) {
				let snippet = $(elem)
					.html()
					.replace(/<br>/g, "\n")
					.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
				lyrics +=
					$("<textarea/>")
						.html(snippet)
						.text()
						.trim() + "\n\n";
			}
		});
	}
	if (!lyrics) return null;
	return lyrics.trim();
}

// Regex to match any non-word characters
const INVALID_CHARS = /\W/;
/**
 * Parses the lyrics into the necessary format for our guessing game
 * @param {string} lyrics A single string of all the lyrics
 */
function parseLines(lyrics) {
	let lines = lyrics.split("\n");
	let parsedLines = [];
	// Remove genius stanza tags
	lines = lines.filter((line) => line.charAt(0) != "[");

	let wordCounter = 0;
	let chosen = false;

	for (const line of lines) {
		let words = line.split(" ");
		for (const word of words) {
			// Every 12 words
			if (wordCounter > 12) {
				// If we have a good word
				if (word.length > 4 && !INVALID_CHARS.test(word)) {
					wordCounter = 0;
					chosen = true;
					let idx = words.indexOf(word);
					parsedLines.push({
						words,
						guessing: true,
						guess_index: idx,
						correct: word,
					});
				}
			}
			wordCounter++;
		}
		// If we didn't select a word in this line
		if (!chosen) {
			parsedLines.push({
				words: line,
				guessing: false,
				guess_index: null,
				correct: null,
			});
		}
		chosen = false;
	}

	return parsedLines;
}

export { getLyrics, parseLines };
