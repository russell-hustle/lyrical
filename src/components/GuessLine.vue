<template>
	<div class="option_line">
		<p>
			<span v-for="(word, index) in cutWord" :key="index"
				>{{ word }}
			</span>
		</p>
		<v-col class="mx-auto">
			<v-btn
				class="mx-2"
				v-for="(option, index) in fullOptions"
				:key="index"
				>{{ option }}</v-btn
			>
		</v-col>
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
		return {};
	},
	computed: {
		cutWord() {
			// replace guessed word with underscores
			let copy = [...this.line.words];
			let index = this.line.guess_index;
			copy[index] = "__________";
			console.log(copy);
			return copy;
		},
		fullOptions() {
			console.log([...this.line.options, this.line.correct]);
			return [...this.line.options, this.line.correct];
		},
	},
	methods: {},
};
</script>
