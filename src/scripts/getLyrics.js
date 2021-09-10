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

// https://github.com/russell-hustle/lyrical/blob/e18f6d5987d412155808e51c9f50d6edd8423578/src/getLyrics.js
// Regex to match any non-word characters
const INVALID_CHARS = /\W/;
const VARIANCE = 6;
const INTERVAL = 6;
/**
 * Parses the lyrics into the necessary format for our guessing game
 * @param {string} lyrics A single string of all the lyrics
 * @returns {ParsedLine[]} An array of parsed lines
 * 
 * @typedef {Object} ParsedLine
 * @property {Array|string} words The words in the line (Array if guessing, string if not)
 * @property {boolean} guessing Whether this line has a guess in it
 * @property {string|null} correct The word to guess (sanitized)
 * @property {number|null} guessIndex The index into the words array of the correct word
 * @property {string} start Optional prefix for sanitization
 * @property {string} end Optional suffix for sanitization
 */
function parseLines(lyrics) {
	// Songs with no lyrics
	if (!lyrics) {
		return [];
	}
	let lines = lyrics.split("\n");
	let parsedLines = [];
	// Remove genius stanza tags
	lines = lines.filter((line) => line.charAt(0) != "[");

	let wordCounter = 0;
	// First guess randomness
	let interval = Math.floor(Math.random() * VARIANCE);
	let chosen = false;

	for (const line of lines) {
		let words = line.split(" ");
		for (const word of words) {
			// Every few words (random)
			if (wordCounter >= interval) {
				// If we have a good word
				if (word.length > 2) {
					wordCounter = 0;
					chosen = true;
					// Starter data
					/** @type {ParsedLine} */
					let parsed = {
						words,
						guessing: true,
						guessIndex: words.indexOf(word),
						start: "",
						end: "",
					};
					// First/last character fixing/handling
					let tempWord = word;
					let first = word[0];
					// Bad first char
					if (INVALID_CHARS.test(first)) {
						parsed.start = first;
						tempWord = tempWord.substring(1);
					}
					let last = word[word.length - 1];
					// Bad last char
					if (INVALID_CHARS.test(last)) {
						parsed.end = last;
						tempWord = tempWord.substring(0, tempWord.length - 1);
					}
					parsedLines.push({ correct: tempWord, ...parsed });
					// Reset interval to new random number 
					interval = Math.floor(Math.random() * VARIANCE) + INTERVAL;
				}
			}
			wordCounter++;
		}
		// If we didn't select a word in this line
		if (!chosen) {
			parsedLines.push({
				words: line,
				guessing: false,
			});
		}
		chosen = false;
	}

	return parsedLines;
}

export { getLyrics, parseLines };
