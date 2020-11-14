<template>
	<v-row class="d-inline-flex">
		<p>{{ start }}</p>
		<v-text-field
			class="guess-input mx-4"
			:background-color="color"
			:readonly="guessed"
			v-model="answer"
			@keydown="enter"
			dense
			solo
			light
		></v-text-field>
		<p>{{ end }}</p>
	</v-row>
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
			start: "",
			end: "",
			answer: "",
			color: null,
			guessed: false,
		};
	},
	computed: {},
	methods: {
		enter(e) {
			if (e.key == "Enter") {
				this.correct = this.answer == this.line.correct;
				this.color = this.correct ? "green" : "red";
				this.guessed = true;
				this.$emit("enter", this.correct);
			}
		},
	},
	mounted() {
		let idx = this.line.guess_index;
		this.start = this.line.words.slice(0, idx).join(" ");
		// Check for trailing comma
		let add = "";
		if (this.line.correct[this.line.correct.length - 1] == ",") {
			add += this.line.correct[this.line.correct.length - 1];
			this.line.correct = this.line.correct.slice(0, -1);
		}
		this.end = this.line.words.slice(idx + 1).join(" ");
		this.end = add + " " + this.end;
	},
};
</script>

<style lang="scss">
.v-text-field .v-input__control .v-input__slot {
	min-height: auto !important;
	display: flex !important;
	align-items: center !important;
	width: 160px;
	height: 26px;
}

.v-list:first-of-type {
	padding-top: 30px;
}
</style>
