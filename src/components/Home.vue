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
					<v-list v-for="(line, index) in lines" :key="index" class="pa-4">
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

import { getLyrics, parseLines } from '../getLyrics';
import { updateScore } from '../getLeaderboard';

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
			loadingLyrics: true,
			lastScroll: 0,
			currentUserId: null
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
			if (!this.currentUserId) {
				this.$spotify.http
				.get('').then((response) => {
					if (response.status == 429) {
						this.timeout = this.$TIMEOUT;
					}
				console.log('New user has joined: ', response.data.id)
				this.currentUserId = response.data.id
				updateScore(this.currentUserId, 1, this.correct / this.wrong, response.data.display_name)
				});
			} else {
				updateScore(this.currentUserId, 1, this.correct / this.wrong)
			}

		},
		/** Scroll with song */
		autoScroll() {
			if (!this.current || !this.current.item || !this.current.item.duration_ms) return;
			let percent = this.current.progress_ms / this.current.item.duration_ms;
			let pixelPercent = percent * document.body.scrollHeight;
			if (Math.abs(pixelPercent - this.lastScroll) > 400) {
				this.lastScroll = pixelPercent;
				window.scrollTo(0, pixelPercent);
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
						// If our token has expired
						// FIX: don't redirect and tell user they must login again
						if (response.status == 401) {
							this.$store.setExpired();
							this.$router.push({ name: 'Landing' });
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
								getLyrics(this.current.item.name, this.current.item.artists[0].name).then((lyrics) => {
									let parsedLines = parseLines(lyrics);
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
		}
	},
	mounted() {
		setInterval(() => {
			this.getCurrentSong();
			if (this.$store.state.autoScroll) this.autoScroll();
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
	top: 0px;
	left: 2%;

	* {
		line-height: 40px;
	}
}
</style>
