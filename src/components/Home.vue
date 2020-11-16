<template>
	<v-container v-if="loadingSong">
		<v-progress-circular indeterminate color="green"></v-progress-circular>
	</v-container>
	<v-container id="content" v-else-if="!noSong" class="fill-height">
		<v-row style="height: 100%">
			<v-col>
				<h1>{{ current.item.name }}</h1>
				<p class="font-italic">
					{{ all_artists }}
				</p>
				<img :src="current.item.album.images[1].url" class="my-6" />

				<v-divider></v-divider>

				<div v-if="loadingLyrics" class="mt-16">
					<v-progress-circular indeterminate color="green"></v-progress-circular>
				</div>
				<div v-else-if="!noLyrics" class="rounded-xl">
					<v-list v-for="(line, index) in lines" :key="index">
						<guess-line v-if="line.guessing" @enter="score" :line="line" />
						<p v-else>
							{{ line.words }}
						</p>
					</v-list>
				</div>
				<div v-else>
					<h1>Sorry!</h1>
					<h3>We couldn't find any lyrics for that song.</h3>
				</div>
			</v-col>
		</v-row>
		<v-footer fixed padless>
			<player :current="current" />
		</v-footer>
		<div id="score">
			<h2>Score: {{ correct }} / {{ correct + wrong }}</h2>
		</div>
	</v-container>
	<v-container v-else>
		<h1 class="text-h2 mb-6 font-weight-medium">No song detected</h1>
		<h3>Start playing music in spotify to get started</h3>
	</v-container>
</template>

<script>
import GuessLine from './GuessLine.vue';
import Player from './Player.vue';

import { getLyrics } from 'genius-lyrics-api';

export default {
	name: 'Home',
	components: {
		Player,
		GuessLine
	},
	data() {
		return {
			current: null,
			lines: [],
			timeout: 0,
			correct: 0,
			wrong: 0,
			noSong: false,
			loadingSong: true,
			noLyrics: false,
			loadingLyrics: true
		};
	},
	computed: {
		all_artists() {
			let artists = this.current.item.artists[0].name;
			for (let index = 1; index < this.current.item.artists.length - 1; index++) {
				artists += ` | ${this.current.item.artists[index].name}`;
			}
			return artists;
		}
	},
	methods: {
		score(correct) {
			if (correct) {
				this.correct++;
			} else {
				this.wrong++;
			}
		},
		getCurrentSong() {
			if (this.timeout <= 0) {
				this.$spotify.http
					.get('/player/currently-playing')
					.then((response) => {
						this.loadingSong = false;
						// If we exceed spotify rate limit
						if (response.status == 429) {
							this.timeout = this.$TIMEOUT;
						}
						// Only update lyrics data on song change
						let prev = this.current == null ? 'old' : this.current.item.name;
						this.current = response.data == '' ? null : response.data;
						this.noSong = this.current == null;
						if (!this.noSong) {
							if (prev != this.current.item.name) {
								console.log('Song changed! Refreshing lyrics data!');
								this.loadingLyrics = true;
								// Get lyrics data
								getLyrics({
									apiKey: this.$genius_key,
									title: this.current.item.name,
									artist: this.current.item.artists[0].name,
									optimizeQuery: true
								}).then((lyrics) => {
									let parsedLines = this.parseLyrics(lyrics);
									if (parsedLines.length != 0) {
										this.lines = parsedLines;
										this.loadingLyrics = false;
									} else {
										this.noLyrics = true;
									}
								});
								this.correct = 0;
								this.wrong = 0;
							}
						}
					})
					.catch((error) => {
						// handle error
						console.error(error);
					})
					.then(() => {
						// always executed
					});
			} else {
				this.timeout--;
			}
		},
		parseLyrics(lyrics) {
			let lines = lyrics.split('\n');
			let parsedLines = [];
			// Remove genius stanza tags
			lines = lines.filter((line) => line.charAt(0) != '[');

			let wordCounter = 0;
			let badEndings = [',', '!', '?'];
			let chosen = false;

			for (const line of lines) {
				let words = line.split(' ');
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
								correct: newWord
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
						correct: null
					});
				}
				chosen = false;
			}

			return parsedLines;
		}
	},
	mounted() {
		setInterval(() => {
			this.getCurrentSong();
		}, this.$POLL_RATE);
	}
};
</script>

<style lang="scss">
#content {
	margin-bottom: 80px;
}

#score {
	position: fixed;
	top: 10px;
	left: 20px;
}
</style>
