<template>
	<v-app>
		<div id="full-height" class="d-flex">
			<v-app-bar app v-if="$route.name != 'Landing'">
				<h1 class="mx-auto">Color Geyser</h1>
			</v-app-bar>

			<!-- Sizes your content based upon application components -->
			<v-main class="flex-grow-1 yellow accent-2">
				<!-- Provides the application the proper gutter -->
				<v-container fluid class="fill-height">
					<!-- If using vue-router -->
					<router-view></router-view>
				</v-container>
			</v-main>
		</div>

		<v-footer>
			<v-col>
				<h2 class="mx-auto">Made with hate</h2>
				<p id="about" @click="toAbout">About</p>
			</v-col>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
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
	height: 100vh;
}

#about {
	&:hover {
		cursor: pointer;
		color: red;
	}
}
</style>
