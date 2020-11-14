<template>
	<v-container>
		<h1>HOME</h1>
		<v-btn @click="getCurrentSong">Current Song</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	components: {},
	methods: {
		getCurrentSong() {
			this.$http
				.get("/player/currently-playing")
				.then((response) => {
					// handle success
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
};
</script>
