<template>
	<v-container v-if="current != null" class="fill-height">
		<v-row style="height: 100%">
			<v-col>
				<h1>{{ current.item.name }}</h1>

				<v-row class="mx-auto">
					<p v-for="artist in current.item.artists" :key="artist.id">
						{{ artist.name }}
					</p>
				</v-row>

				<v-list v-for="(line, index) in lines" :key="index">
					<guess-line v-if="line.guessing" :line="line" />
					<p v-else>
						{{ line.words }}
					</p>
				</v-list>

				<v-footer fixed padless>
					<player :current="current" />
				</v-footer>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<h1>No song detected!</h1>
		<v-btn @click="getCurrentSong">Try again</v-btn>
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
			lines: [
				{
					words: ["this", "is", "the", "music", "line"],
					guess: true,
					guess_index: 3,
					options: ["busic", "trusic", "nusic"],
					correct: "music",
				},
				{
					words: ["ammon", "is", "the", "whack", "line"],
					guess: false,
					guess_index: 2,
					options: ["busic", "trusic", "nusic"],
					correct: "whack",
				},
				{
					words: ["buzz", "in", "the", "whack", "line"],
					guess: false,
					guess_index: 2,
					options: ["busic", "trusic", "nusic"],
					correct: "buzz",
				},
			],
			current: null,
		};
	},
	computed: {},
	methods: {
		getCurrentSong() {
			this.$spotify
				.get("/player/currently-playing")
				.then((response) => {
					// handle success
					// console.log(response);
					// Only update lyrics data on song change
					let prev =
						this.current == null ? "old" : this.current.item.name;
					this.current = response.data == "" ? null : response.data;
					if (prev != this.current.item.name) {
						console.log("Song changed! Refreshing lyrics data!");
						this.getLyrics();
					}
				})
				.catch((error) => {
					// handle error
					console.log(error);
				})
				.then(() => {
					// always executed
				});
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
					console.log(error);
				})
				.then(() => {
					// always executed
				});
		},
	},
	mounted() {
		setInterval(() => {
			this.getCurrentSong();
		}, 250);
	},
};
</script>


// data: {
// 	lines: [
// 		line: {
// 			words: []
// 			guess: true,
// 			guess_index: [],
// 			options: [].
// 			correct: word
// 		}
// 	]
// }
