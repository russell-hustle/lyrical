<template>
	<v-container fluid class="pa-0">
		<div v-if="current.is_playing">
			<v-progress-linear
				:value="current.progress_ms"
				:buffer-value="current.item.duration_ms"
				class="my-0"
				height="3"
			></v-progress-linear>

			<v-row>
				<v-col class="pa-0">
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>{{
									current.item.name
								}}</v-list-item-title>
								<v-list-item-subtitle>{{
									current.item.artists[0]
								}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>

			<v-row>
				<v-col class="pa-0">
					<v-list>
						<v-list-item>
							<v-list-item-icon>
								<v-btn icon>
									<v-icon>mdi-skip-previous</v-icon>
								</v-btn>
							</v-list-item-icon>

							<v-list-item-icon>
								<v-btn icon>
									<v-icon>mdi-pause</v-icon>
								</v-btn>
							</v-list-item-icon>

							<v-list-item-icon>
								<v-btn icon>
									<v-icon>mdi-skip-next</v-icon>
								</v-btn>
							</v-list-item-icon>
						</v-list-item>
					</v-list>
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
};
</script>

<style>
</style>