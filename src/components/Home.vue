<template>
	<v-container id="content" v-if="current != null" class="fill-height">
		<v-row style="height: 100%">
			<v-col>
				<h1>{{ current.item.name }}</h1>
				<p class="font-italic">
					{{ all_artists }}
				</p>
				<img :src="this.current.item.album.images[1].url" />

				<div v-if="this.lines.length != 0">
					<v-list v-for="(line, index) in lines" :key="index">
						<guess-line v-if="line.guessing" :line="line" />
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
	</v-container>
	<v-container v-else>
		<h1>No song detected</h1>
		<h3>Start playing music in spotify to get started</h3>
	</v-container>
</template>

<script>
import GuessLine from "./GuessLine.vue";
import Player from "./Player.vue";

export default {
	name: "Home",
	components: {
		Player,
		GuessLine,
	},
	data() {
		return {
			current: null,
			lines: [],
			timeout: 0,
			// image: this.current.item.album.images[0].url,
		};
	},
	computed: {
		all_artists() {
			let artists = "";
			for (const artist of this.current.item.artists) {
				artists += `${artist.name} `;
			}
			return `By ${artists}`;
		},
	},
	methods: {
		getCurrentSong() {
			if (this.timeout <= 0) {
				this.$spotify
					.get("/player/currently-playing")
					.then((response) => {
						console.log( response );
						if (response.status == 429) {
							this.timeout = this.$TIMEOUT;
						}
						// handle success
						// console.log(response);
						// Only update lyrics data on song change
						let prev =
							this.current == null
								? "old"
								: this.current.item.name;
						this.current =
							response.data == "" ? null : response.data;
						if (
							this.current != null &&
							prev != this.current.item.name
						) {
							console.log(
								"Song changed! Refreshing lyrics data!"
							);
							this.getLyrics();
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
				.post("/lyrics", {
					title: this.current.item.name,
					artist: this.current.item.artists[0].name,
				})
				.then((response) => {
					// handle success
					this.lines = response.data;
					console.log(response);
				})
				.catch((error) => {
					// handle error
					console.error(error);
				})
				.then(() => {
					// always executed
				});
		},
	},
	mounted() {
		setInterval(() => {
			this.getCurrentSong();
		}, this.$POLL_RATE);
	},
};
</script>

<style lang="scss">
#content {
	margin-bottom: 80px;
}
</style>
