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
				this.$spotify
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
								this.getLyrics();
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
		getLyrics() {
			this.$lyrics
				.post('/lyrics', {
					title: this.current.item.name,
					artist: this.current.item.artists[0].name
				})
				.then((response) => {
					// handle success
					this.loadingLyrics = false;
					this.lines = response.data;
					this.noLyrics = this.lines.length == 0;
				})
				.catch((error) => {
					// handle error
					console.error(error);
				})
				.then(() => {
					// always executed
				});
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
