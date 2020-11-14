<template>
	<v-container fluid class="pa-0">
		<div>
			<v-progress-linear
				:value="percentComplete"
				color="green"
				class="my-0"
				height="3"
			></v-progress-linear>

			<v-row>
				<v-col class="pa-0 mt-2">
					<h2>{{ current.item.name }}</h2>
					<p class="ma-0">{{ current.item.artists[0].name }}</p>
				</v-col>
			</v-row>

			<v-row>
				<v-col class="pa-0 pb-4">
					<v-btn icon @click="prevTrack">
						<v-icon>mdi-skip-previous</v-icon>
					</v-btn>
					<v-btn v-if="this.current.is_playing" icon @click="pauseTrack">
						<v-icon>mdi-pause</v-icon>
					</v-btn>
					<v-btn v-else icon @click="playTrack">
						<v-icon>mdi-play</v-icon>
					</v-btn>
					<v-btn icon @click="skipTrack">
						<v-icon>mdi-skip-next</v-icon>
					</v-btn>
				<v-col class="pa-0 pb-2">
					<v-hover v-slot="{ hover }">
						<v-btn
							:color="hover ? 'green' : ''"
							icon
							@click="prevTrack"
						>
							<v-icon>mdi-skip-previous</v-icon>
						</v-btn>
					</v-hover>
					<v-hover v-if="this.current.is_playing" v-slot="{ hover }">
						<v-btn
							:color="hover ? 'green' : ''"
							icon
							@click="pauseTrack"
						>
							<v-icon>mdi-pause</v-icon>
						</v-btn>
					</v-hover>

					<v-hover v-else v-slot="{ hover }">
						<v-btn
							:color="hover ? 'green' : ''"
							icon
							@click="playTrack"
						>
							<v-icon>mdi-play</v-icon>
						</v-btn>
					</v-hover>
					<v-hover v-slot="{ hover }">
						<v-btn
							:color="hover ? 'green' : ''"
							icon
							@click="skipTrack"
						>
							<v-icon>mdi-skip-next</v-icon>
						</v-btn>
					</v-hover>
				</v-col>
			</v-row>
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
		playTrack() {
			this.$spotify
				.put("/player/play")
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