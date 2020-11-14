<template>
	<div>
		<div id="toolbar">
			<v-tooltip bottom>
				<v-dialog v-model="aboutModal">
					<v-card>
						<v-btn
							class="float-right"
							icon
							@click="aboutModal = false"
						>
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-img
							class="mx-auto"
							width="80%"
							:src="getThemedImage"
						></v-img>
						<v-card-title class="headline justify-center">
							About
						</v-card-title>
						<v-card-text
							>This web app was made for Southern Utah Code Camp
							2020 Remote. It was worked on exclusively by deez
							nuts.</v-card-text
						>
					</v-card>
				</v-dialog>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="pa-5"
						@click="aboutModal = true"
						icon
						v-bind="attrs"
						v-on="on"
					>
						<v-icon>mdi-information</v-icon>
					</v-btn>
				</template>
				<span>About</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="pa-5"
						@click="$vuetify.theme.dark = !$vuetify.theme.dark"
						icon
						v-bind="attrs"
						v-on="on"
					>
						<v-icon>mdi-white-balance-sunny</v-icon>
					</v-btn>
				</template>
				<span v-if="$vuetify.theme.dark">Light Mode</span>
				<span v-else>Dark Mode</span>
			</v-tooltip>
		</div>
	</div>
</template>

<script>
export default {
	name: "ToolBar",
	data() {
		return {
			aboutModal: false,
			darkImg: require("@/assets/codecamp-dark.png"),
			lightImg: require("@/assets/codecamp-light.png"),
		};
	},
	computed: {
		getThemedImage() {
			return this.$vuetify.theme.dark ? this.darkImg : this.lightImg;
		},
	},
};
</script>

<style>
</style>