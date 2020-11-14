<template>
	<div class="option_line">
		<p>{{ data.lines[0].words }} </p>
		<p v-for="option in data.lines[0].options" :key="option.id">
			<v-btn @click="createSentance">{{ option }}</v-btn>
		</p>
	</div>
</template>


<script>
export default {
	name: "OptionalLine",
	data() {
		return {
			data: {
				lines: [
					{
						words: ["I'm through with standing in line to clubs I'll never get in"],
						guess: true,
						guess_index: 4,
						options: ["randing", "tanding", "landing"],
						correct: "standing",
					},
				]
			}
		};
	},
	computed: {
		// getLines() {
		// 	return this.lyrics.split("\n");
		// },
	},
	methods: {
		createSentance( ) {
		},
		// createOptionalLines(data) {

		// },
		// createAnswers( options, correct ) {
		// 	var answer_array = [];
		// 	for option in options {
		// 		answer_array.append(option);
		// 		ans
		// 		}
		// },
		// getLyrics() {
		// 	this.$lyrics
		// 		.post("/lyrics", {
		// 			title: this.currentSong.name,
		// 			artist: this.currentSong.artists[0].name,
		// 		})
		// 		.then((response) => {
		// 			// handle success
		// 			this.lyrics = response.data;
		// 		})
		// 		.catch((error) => {
		// 			// handle error
		// 			console.log(error);
		// 		})
		// 		.then(() => {
		// 			// always executed
		// 		});
		// },
	// },
	// mounted() {
	// 	setInterval(() => {
	// 		this.getCurrentSong();
	// 	}, 2000);
	},
};
</script>