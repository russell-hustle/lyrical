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
	methods: {},
};
</script>
