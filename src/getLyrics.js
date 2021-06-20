import axios from "axios";
import cio from "cheerio-without-node-native";

import { functions } from './axiosInstances';

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
const genius_key =
	"jnk3Z7zFGcLZsSgZPk0kGifKBUhJzYlhqgDJmbYPCJBxKUVjE1EtudaHvco_90Tr";

/**
 * Gets the song data from the genius API
 * @param {string} title The title of the song
 * @param {artist} artist The artist of the song
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
	let badEndings = [",", "!", "?"];
	let chosen = false;

	for (const line of lines) {
		let words = line.split(" ");
		for (const word of words) {
			// Every 12 words
			if (wordCounter > 12) {
				// If we have a good word
				if (word.length > 4) {
					wordCounter = 0;
					chosen = true;
					let lineWords = words;
					let idx = words.indexOf(word);
					let newWord = word;
					// Check for trailing baddies
					let ending = word.charAt(word.length - 1);
					if (badEndings.includes(ending)) {
						// Remove last char
						newWord = newWord.substring(0, word.length - 1);
						// Decide where to put the char
						// Add new word with it
						if (words[idx] == word) {
							lineWords.push(ending);
						}
						// Add it to start of next word
						else {
							lineWords[idx + 1] = `${ending} ${lineWords[idx + 1]}`;
						}
					}
					parsedLines.push({
						words: lineWords,
						guessing: true,
						guess_index: idx,
						correct: newWord,
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

async function getLyrics(title, artist) {
	let results = await searchGeniusAPI(title, artist);
	if (!results) return null;
	let lyrics = await extractLyrics(results[0].url);
	return lyrics;
}

export { getLyrics, parseLines };
