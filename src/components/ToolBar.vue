<template>
	<div id="toolbar">
		<v-dialog v-model="aboutModal" eager transition="fade-transition">
			<v-card id="about-modal" tile elevation="20">
				<v-btn id="modal-close" icon @click="aboutModal = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-img class="mx-auto" width="60%" :src="getThemedImage" eager />
				<!-- <v-img class="mx-auto" width="60%" :src="require('getThemedImage()')" /> -->
				<v-card-text class="text-h5"
					>This web app was made for Southern Utah Code Camp 2020 Remote by team Ru$$el Hustle.
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="aboutModal = true" icon v-bind="attrs" v-on="on">
					<v-icon>mdi-information</v-icon>
				</v-btn>
			</template>
			<span>About</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon href="https://github.com/russell-hustle/lyrical" v-bind="attrs" v-on="on">
					<v-icon>mdi-github</v-icon>
				</v-btn>
			</template>
			<span>Source Code</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon v-bind="attrs" v-on="on">
					<v-icon>mdi-white-balance-sunny</v-icon>
				</v-btn>
			</template>
			<span v-if="$vuetify.theme.dark">Light Mode</span>
			<span v-else>Dark Mode</span>
		</v-tooltip>
	</div>
</template>

<script>
export default {
	name: 'ToolBar',
	data() {
		return {
			aboutModal: false,
			darkImg: require('@/assets/codecamp-dark.png'),
			lightImg: require('@/assets/codecamp-light.png')
		};
	},
	computed: {
		getThemedImage() {
			return this.$vuetify.theme.dark ? this.darkImg : this.lightImg;
		}
	}
};
</script>

<style lang="scss" scoped>
#about-modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	margin: auto;
}

#modal-close {
	position: absolute;
	right: 0;
}

// Get ride of ripple effect lingering
.v-btn:before {
	opacity: 0 !important;
}

.v-ripple__container {
	opacity: 0 !important;
}
</style>