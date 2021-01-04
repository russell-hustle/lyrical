<template>
	<div id="toolbar">
		<v-dialog v-model="aboutModal" eager transition="fade-transition">
			<v-card id="about-modal" tile elevation="20">
				<v-btn id="modal-close" icon @click="aboutModal = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-img class="mx-auto" width="60%" :src="getThemedImage" eager />
				<!-- <v-img class="mx-auto" width="60%" :src="require('getThemedImage()')" /> -->
				<v-card-text class="text-h5"
					>This web app was made for Southern Utah Code Camp 2020 Remote by team Ru$$el Hustle. It even won
					first place in the Intermediate Division!
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="leaderboardModal" eager transition="fade-transition">
			<v-card id="leaderboard-modal" tile elevation="20">
				<v-btn id="modal-close" icon @click="leaderboardModal = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<div v-if="loadingLeaderboardData" class="mt-16">
					<v-progress-circular indeterminate color="green"></v-progress-circular>
				</div>
				<div v-else>
					<v-card-title>Leaderboard</v-card-title>
					<v-data-table :headers="leaderboardHeaders" :items="leaderboardData"></v-data-table>
				</div>
			</v-card>
		</v-dialog>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="getData" icon v-bind="attrs" v-on="on">
					<v-icon >mdi-account-group</v-icon>
				</v-btn>
			</template>
			<span>View Player Leaderboard</span>
		</v-tooltip>
		<v-tooltip bottom>

			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="$store.commit('toggleAutoScroll')" icon v-bind="attrs" v-on="on">
					<v-icon v-if="$store.state.autoScroll">mdi-arrow-vertical-lock</v-icon>
					<v-icon v-else>mdi-arrow-up-down</v-icon>
				</v-btn>
			</template>
			<span v-if="$store.state.autoScroll">Disable auto scroll</span>
			<span v-else>Enable auto scroll</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="aboutModal = true" icon v-bind="attrs" v-on="on">
					<v-icon>mdi-information</v-icon>
				</v-btn>
			</template>
			<span>About</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon href="https://github.com/russell-hustle" v-bind="attrs" v-on="on">
					<v-icon>mdi-github</v-icon>
				</v-btn>
			</template>
			<span>Source Code</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="pa-5" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon v-bind="attrs" v-on="on">
					<v-icon>mdi-white-balance-sunny</v-icon>
				</v-btn>
			</template>
			<span v-if="$vuetify.theme.dark">Light Mode</span>
			<span v-else>Dark Mode</span>
		</v-tooltip>
	</div>
</template>

<script>

import { getLeaderboardData } from '../getLeaderboard';

export default {
	name: 'ToolBar',
	data() {
		return {
			aboutModal: false,
			leaderboardModal: false,
			leaderboardHeaders: [ 
				{ text: "Rank", value: "rank", sortable: false, align: "center"},
				{ text: "Name", value: "name", sortable: false, searchable: true },
				{ text: "Points", value: "points", sortable: true  },
				{ text: "Efficiency", value: "efficiency", sortable: true },
				{ text: "Overall Score (points * efficiency)", value: "overall_score", sortable: true },
			],
			leaderboardData: [],
			loadingLeaderboardData: true,	
			darkImg: require('@/assets/codecamp-dark.png'),
			lightImg: require('@/assets/codecamp-light.png')
		};
	},
	computed: {
		getThemedImage() {
			return this.$vuetify.theme.dark ? this.darkImg : this.lightImg;
		}
	},
	methods : {
		async getData() {
			this.leaderboardModal = true;
			this.leaderboardData = [];
			const responseData = await getLeaderboardData()
			responseData.forEach(person => {
				this.leaderboardData.push({
					user_id: person.user_id,
					points: person.points,
					efficiency: person.efficiency,
					overall_score: person.overall_score,
					name: person.name,
				})
			})
			// sorts the leaderboard and adds the 'rank' value
			this.leaderboardData.sort(this.compare)
			for(var i = 0; i < this.leaderboardData.length; i++) {
				this.leaderboardData[i].rank = i + 1
			}
			this.loadingLeaderboardData = false;
		},
		compare(a, b) {
			if (a.overall_score < b.overall_score) {
				return 1;
			} else {
				return -1;
			}
		},
	}
};
</script>

<style lang="scss" scoped>
#about-modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	margin: auto;
}
#leaderboard-modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	margin: auto;
}
#modal-close {
	position: absolute;
	right: 0;
}

// Get ride of ripple effect lingering
.v-btn:before {
	opacity: 0 !important;
}

.v-ripple__container {
	opacity: 0 !important;
}

</style>