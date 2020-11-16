<template>
	<v-app>
		<v-main id="full-height" class="flex-grow-1">
			<v-container fluid class="fill-height">
				<router-view></router-view>
			</v-container>
		</v-main>
		<tool-bar id="toolbar" />
	</v-app>
</template>

<script>
import ToolBar from './components/ToolBar.vue';

export default {
	components: { ToolBar }
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

#toolbar {
	position: fixed;
	right: 40px;
	top: 0;
}
</style>
