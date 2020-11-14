<template>
	<v-app>
		<v-main id="full-height" class="flex-grow-1">
			<v-container fluid class="fill-height">
				<router-view></router-view>
			</v-container>
		</v-main>
		<div id="toolbar">
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="pa-5"
						@click="$vuetify.theme.dark = !$vuetify.theme.dark"
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
	</v-app>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		toHome() {
			this.$router.push({ name: "Home" });
		},
		toAbout() {
			this.$router.push({ name: "About" });
		},
	},
};
</script>

<style lang="scss">
html {
	height: 100vh;
}

body {
	height: 100%;
}

* {
	text-align: center;
}

#full-height {
	min-height: 100vh;
}

#title {
	&:hover {
		cursor: pointer;
	}
}

#toolbar {
	position: absolute;
	right: 40px;
	top: 0;
}
</style>
