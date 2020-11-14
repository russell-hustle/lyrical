<template>
	<div class="option_line">
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
};
</script>
