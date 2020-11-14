<template>
	<v-container>
		<h1 class="mb-12">SPOTIFY LYRICS GAME OF HELL</h1>
		<v-btn :href="spotify_url" elevation="10" color="green" x-large
			>Login With Spotify</v-btn
		>
	</v-container>
</template>

<script>
export default {
	name: "Landing",
	data() {
		return {
			client_id: "8bcb169f90554b209a351f9016ec7b04", // Your client id
			redirect_uri: "http://localhost:8080", // Your redirect uri
			scope: "user-read-currently-playing user-modify-playback-state",
		};
	},
	computed: {
		spotify_url() {
			return `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scope}&show_dialog=true`;
		},
	},
	methods: {
		login() {
			this.$http
				.get("/login")
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
		},
		redirect() {
			this.$http("/test")
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
		},
		dinosaur() {
			this.$http({
				url: "/authorize",
				baseURL: "https://accounts.spotify.com",
			})
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
		},
	},
};
</script>

<style>
</style>