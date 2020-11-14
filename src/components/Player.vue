<template>
	<v-container fluid class="pa-0">
		<div v-if="current.is_playing">
			<v-progress-linear
				:value="percentComplete"
				class="my-0"
				height="3"
			></v-progress-linear>

			<v-row>
				<v-col class="pa-0">
					<h2>{{ current.item.name }}</h2>
					<p>{{ current.item.artists[0].name }}</p>
				</v-col>
			</v-row>

			<v-row>
				<v-col class="pa-0 pb-4">
					<v-btn icon @click="prevTrack">
						<v-icon>mdi-skip-previous</v-icon>
					</v-btn>
					<v-btn
						v-if="this.current.is_playing"
						icon
						@click="pauseTrack"
					>
						<v-icon>mdi-pause</v-icon>
					</v-btn>
					<v-btn v-else icon @click="playTrack">
						<v-icon>mdi-play</v-icon>
					</v-btn>
					<v-btn icon @click="skipTrack">
						<v-icon>mdi-skip-next</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</div>
		<div v-else>
			<h1>No song currently playing!</h1>
		</div>
	</v-container>
</template>
<script>
export default {
	// current.is_playing
	name: "Player",
	props: {
		current: {
			type: Object,
		},
	},
	computed: {
		percentComplete() {
			return (
				100 * (this.current.progress_ms / this.current.item.duration_ms)
			);
		},
	},
	methods: {
		pauseTrack() {
			this.$spotify
				.put("/player/pause")
				.then((response) => {
					if (response == 204) {
						console.log("device worked");
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.then(() => {});
		},
		skipTrack() {
			this.$spotify
				.post("/player/next")
				.then((response) => {
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
		prevTrack() {
			this.$spotify
				.post("/player/previous")
				.then((response) => {
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

<style>
</style>