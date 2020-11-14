<template>
	<v-app>
		<v-main id="full-height" class="flex-grow-1">
			<v-container fluid class="fill-height">
				<router-view></router-view>
			</v-container>
		</v-main>
		<tool-bar />
	</v-app>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";

export default {
	components: { ToolBar },
	data() {
		return {
			aboutModal: false,
		};
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
