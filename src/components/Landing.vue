<template>
	<v-container>
		<h1 id="title" class="mb-16 text-h1 font-weight-black">Lyrical</h1>
		<v-btn :href="spotify_url" elevation="10" color="green" x-large>Login With Spotify</v-btn>
	</v-container>
</template>

<script>
export default {
	name: 'Landing',
	data() {
		return {};
	},
	computed: {
		spotify_url() {
			return `https://accounts.spotify.com/authorize?client_id=${this.$spotify.client_id}&response_type=token&redirect_uri=${this.$spotify.redirect_uri}&scope=${this.$spotify.scopes}&show_dialog=true`;
		}
	},
	methods: {}
};
</script>

<style lang="scss">
// #title {
// 	margin-bottom: 5%;
// 	font-size: 6rem;
// }
</style>