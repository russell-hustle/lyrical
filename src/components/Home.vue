<template>
	<v-container>
		<h1>Current Song</h1>
		<h2>{{ currentSong.name }}</h2>
		<v-row class="mx-auto">
			<p v-for="artist in currentSong.artists" :key="artist.id">
				{{ artist.name }}
			</p>
		</v-row>
		<p>{{ lyrics }}</p>
		<v-btn @click="getCurrentSong">ammon sucks</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			currentSong: {},
			lyrics: "",
		};
	},
	methods: {
		getCurrentSong() {
			this.$spotify
				.get("/player/currently-playing")
				.then((response) => {
					// handle success
					this.currentSong = response.data.item;
					this.getLyrics();
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
					title: this.currentSong.name,
					artist: this.currentSong.artists[0].name,
				})
				.then((response) => {
					// handle success
					console.log(response);
					this.lyrics = response;
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
		// setInterval(() => {
		// 	this.getCurrentSong();
		// }, 2000);
	},
};
</script>
