<template>
    <v-card id="leaderboard-modal" tile elevation="20">
        <div id="title-container">
            <v-card-title id="title">Leaderboard</v-card-title>
            <v-btn id="modal-close" icon @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <v-progress-circular v-if="loadingLeaderboardData" indeterminate color="green"></v-progress-circular>
        <v-data-table
            v-else
            :headers="leaderboardHeaders"
            :items="leaderboardData"
            no-data-text="No users yet, be the first!"
        ></v-data-table>
    </v-card>
</template>

<script>
import { getLeaderboard } from '../leaderboard';

export default {
    data() {
        return {
            leaderboardHeaders: [
                { text: 'Rank', value: 'rank', sortable: false, align: 'center' },
                { text: 'Name', value: 'name', sortable: false, searchable: true },
                { text: 'Points', value: 'points', sortable: true },
                { text: 'Accuracy', value: 'accuracy', sortable: true },
                { text: 'Overall Score (points * accuracy)', value: 'score', sortable: true }
            ],
            leaderboardData: [],
            loadingLeaderboardData: true
        };
    },
    methods: {
        async getData() {
            this.leaderboardData = [];
            const responseData = await getLeaderboard();
            console.log(responseData);
            responseData.forEach((person) => {
                this.leaderboardData.push({
                    user_id: person.user_id,
                    points: person.points,
                    efficiency: person.efficiency,
                    overall_score: person.overall_score,
                    name: person.name
                });
            });
            // sorts the leaderboard and adds the 'rank' value
            this.leaderboardData.sort(this.compare);
            for (var i = 0; i < this.leaderboardData.length; i++) {
                this.leaderboardData[i].rank = i + 1;
            }
            this.loadingLeaderboardData = false;
        },
        compare(a, b) {
            if (a.overall_score < b.overall_score) {
                return 1;
            } else {
                return -1;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style lang="scss" scoped>
#title {
    text-align: center;
    justify-content: center;
}

#modal-close {
    position: absolute;
    right: 5px;
    top: 5px;
}

#title-container {
    position: relative;
}
</style>