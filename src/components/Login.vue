<template>
	<v-container>
		<v-row>
			<v-col class="d-flex justify-center">
				<v-card elevation="15" outlined width="50%" class="mb-16">
					<v-btn></v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	data: () => ({}),
	methods: {
		test() {
			this.$http
				.get("/")
				.then(function (response) {
					// handle success
					console.log(response);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
		},
	},
};
</script>

<style lang="scss">
</style>
