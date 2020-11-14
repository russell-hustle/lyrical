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
					<v-btn icon>
						<v-icon>mdi-skip-previous</v-icon>
					</v-btn>
					<v-btn icon>
						<v-icon>mdi-pause</v-icon>
					</v-btn>
					<v-btn icon>
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
};
</script>

<style>
</style>