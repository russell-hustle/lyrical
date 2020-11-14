<template>
	<v-container v-if="current != null" class="fill-height">
		<v-row style="height: 100%">
			<v-col>
				<h1>{{ current.item.name }}</h1>
				<v-btn @click="getCurrentSong">Refresh info</v-btn>

				<v-row class="mx-auto">
					<p v-for="artist in current.item.artists" :key="artist.id">
						{{ artist.name }}
					</p>
				</v-row>

				<v-list v-for="(line, index) in lines" :key="index">
					<guess-line v-if="line.guess" :line="line" />
					<p v-else>
						{{ line.words.join(" ") }}
					</p>
				</v-list>

				<v-footer fixed padless>
					<player :current="current" />
				</v-footer>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<h1>No song detected!</h1>
		<v-btn @click="getCurrentSong">Try again</v-btn>
	</v-container>
</template>

<script>
import GuessLine from "./GuessLine.vue";
import Player from "./Player.vue";

export default {
	name: "Home",
	components: {
		Player,
		GuessLine,
	},
	data() {
		return {
			lines: [
				{
					words: ["this", "is", "the", "music", "line"],
					guess: true,
					guess_index: 3,
					options: ["busic", "trusic", "nusic"],
					correct: "music",
				},
				{
					words: ["ammon", "is", "the", "whack", "line"],
					guess: false,
					guess_index: 2,
					options: ["busic", "trusic", "nusic"],
					correct: "whack",
				},
				{
					words: ["buzz", "in", "the", "whack", "line"],
					guess: false,
					guess_index: 2,
					options: ["busic", "trusic", "nusic"],
					correct: "buzz",
				},
			],
			current: null,
			lyrics: [],
			dummy:
				"I'm through with standing in line to clubs I'll never get in\nIt's like the bottom of the ninth and I'm never gonna win\nThis life hasn't turned out quite the way I want it to be\n\n(Tell me what you want)\n\nI want a brand new house on an episode of Cribs\nAnd a bathroom I can play baseball in\nAnd a king size tub big enough for ten plus me\n\n(Mmm so what you need)\n\nI'll need a, a credit card that's got no limit\nAnd a big black jet with a bedroom in it\nGonna join the mile high club at thirty-seven thousand feet\n\n(Been there, done that)\n\nI want a new tour bus full of old guitars\nMy own star on Hollywood Boulevard\nSomewhere between Cher and James Dean is fine for me\n\n(So how ya gonna do it?)\n\nI'm gonna trade this life for fortune and fame\nI'd even cut my hair and change my name\n\n'Cause we all just wanna be big rockstars\nAnd live in hilltop houses driving fifteen cars\nThe girls come easy and the drugs come cheap\nWe'll all stay skinny 'cause we just won't eat\n\nAnd we'll hang out in the coolest bars\nIn the VIP with the movie stars\nEvery good gold digger's gonna wind up there\n\nEvery Playboy bunny with her bleach blond hair\nAnd we'll, hey, hey, I wanna be a rockstar\nHey, hey, I wanna be a rockstar\n\nI wanna be great like Elvis without the tassels\nHire eight body guards that love to beat up assholes\nSign a couple autographs so I can eat my meals for free\n\n(I'll have the quesadilla, on the house)\n\nI'm gonna dress my ass with the latest fashion\nGet a front door key to the Playboy mansion\nGonna date a centerfold that loves to blow my money for me\n\n(So how ya gonna do it?)\n\nI'm gonna trade this life for fortune and fame\nI'd even cut my hair and change my name\n\n'Cause we all just wanna be big rockstars\nAnd live in hilltop houses drivin' fifteen cars\nThe girls come easy and the drugs come cheap\nWe'll all stay skinny 'cause we just won't eat\n\nAnd we'll hang out in the coolest bars\nIn the VIP with the movie stars\nEvery good gold digger's gonna wind up there\nEvery Playboy bunny with her bleach blond hair\n\nAnd we'll hide out in the private rooms\nWith the latest dictionary of today's \"Who's Who\"\nThey'll get you anything, with that evil smile\nEverybody's got a drug dealer on speed dial\nWell, hey, hey, I wanna be a rockstar\n\nI'm gonna sing those songs that offend the censors\nGonna pop my pills from a Pez dispenser\nGet washed-up singers writing all my songs\nLip sync 'em every night so I don't get 'em wrong\n\nWell, we all just wanna be big rockstars\nAnd live in hilltop houses driving fifteen cars\nThe girls come easy and the drugs come cheap\nWe'll all stay skinny 'cause we just won't eat\n\nAnd we'll hang out in the coolest bars\nIn the VIP with the movie stars\nEvery good gold digger's gonna wind up there\nEvery Playboy bunny with her bleach blond hair\n\nAnd we'll hide out in the private rooms\nWith the latest dictionary of today's \"Who's Who\"\nThey'll get you anything with that evil smile\nEverybody's got a drug dealer on speed dial\nWell, hey, hey, I wanna be a rockstar\n\nHey, hey, I wanna be a rockstar",
		};
	},
	computed: {},
	methods: {
		getCurrentSong() {
			this.$spotify
				.get("/player/currently-playing")
				.then((response) => {
					// handle success
					// console.log(response);
					// Only update lyrics data on song change
					let prev =
						this.current == null ? "old" : this.current.item.name;
					this.current = response.data == "" ? null : response.data;
					if (prev != this.current.item.name) {
						console.log("Song changed! Refreshing lyrics data!");
						this.getLyrics();
					}
				})
				.catch((error) => {
					// handle error
					console.log(error);
				})
				.then(() => {
					// always executed
				});
		},
		getLyrics() {
			this.$lyrics
				.post("/lyrics", {
					title: this.current.item.name,
					artist: this.current.item.artists[0].name,
				})
				.then((response) => {
					// handle success
					this.lyrics = response.data;
					console.log(response);
				})
				.catch((error) => {
					// handle error
					console.log(error);
				})
				.then(() => {
					// always executed
				});
		},
	},
	mounted() {
		setInterval(() => {
			this.getCurrentSong();
		}, 250);
	},
};
</script>


// data: {
// 	lines: [
// 		line: {
// 			words: []
// 			guess: true,
// 			guess_index: [],
// 			options: [].
// 			correct: word
// 		}
// 	]
// }
