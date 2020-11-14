<template>
	<v-app>
		<v-navigation-drawer app v-if="$route.name != 'Landing'">
			<h2 class="mx-auto">Song</h2>
		</v-navigation-drawer>

		<v-app-bar app v-if="$route.name != 'Landing'">
			<h1>Color Geyser</h1>
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main class="red">
			<!-- Provides the application the proper gutter -->
			<v-container fluid class="fill-height">
				<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<h2 class="mx-auto">Made with hate</h2>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {};
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
</style>
