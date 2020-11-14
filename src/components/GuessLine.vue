<template>
	<div class="option_line">
		<p>
			<span v-for="(word, index) in cutWord" :key="index"
				>{{ word }}
			</span>
		</p>
		<p v-for="option in data.lines[0].options" :key="option.id"></p>
		<p>{{ line.words }}</p>
		<p v-for="option in line.options" :key="option.id">
			<v-btn @click="createSentance">{{ option }}</v-btn>
		</p>
	</div>
</template>


<script>
export default {
	name: "GuessLine",
	props: {
		line: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			data: {
				lines: [
					{
						words: [
							"I'm through with standing in line to clubs I'll never get in",
						],
						guess: true,
						guess_index: 4,
						options: ["randing", "tanding", "landing"],
						correct: "standing",
					},
				],
			},
		};
	},
	computed: {
		cutWord() {
			return [
				...this.line.words.substring(0, this.line.correct),
				this.line.words.substring(0, this.line.correct),
			];
		},
	},
	methods: {
		createSentance() {},
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
