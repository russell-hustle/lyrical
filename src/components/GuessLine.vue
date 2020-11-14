<template>
	<div class="option_line">
		<p>
			<span v-for="(word, index) in cutWord" :key="index"
				>{{ word }}
			</span>
		</p>
		<v-col class="mx-auto">
			<v-btn
				v-for="(option, index) in fullOptions"
				:class="{ 'disable-events': alreadyGuessed }"
				:key="index"
				@click="selectAnswer(option, index)"
				:color="buttons[index]"
				class="mx-2"
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
		return {
			fullOptions: [],
			buttons: ["", "", "", ""],
			alreadyGuessed: false,
		};
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
	},
	methods: {
		selectAnswer(idx) {
			this.alreadyGuessed = true;
			// check idx for user score
			console.log(idx);
			let n = [];
			for (let index = 0; index < this.fullOptions.length; index++) {
				n.push(
					this.fullOptions[index] == this.line.correct
						? "green"
						: "red"
				);
			}
			this.buttons = n;
		},
	},
	created() {
		this.fullOptions = [...this.line.options, this.line.correct];
	},
};
</script>

<style lang="scss">
.disable-events {
	pointer-events: none;
}
</style>
