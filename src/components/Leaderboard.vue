<template>
    <v-card id="leaderboard-modal" tile>
        <div id="title-container">
            <v-btn :disabled="refreshTimeout" id="refresh" icon @click="getData">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
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
        >
            <!-- Format decimal places -->
            <template v-slot:[`item.accuracy`]="{ item }">
                <!-- Convert to percent -->
                <span>{{ (item.accuracy * 100).toFixed(1) + '%' }}</span>
            </template>
            <template v-slot:[`item.score`]="{ item }">
                <span>{{ item.score.toFixed(2) }}</span>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { getLeaderboard } from '../scripts/leaderboard';

const LEADERBOARD_TIMEOUT = 10 * 1000;

export default {
    data() {
        return {
            leaderboardHeaders: [
                { text: 'Rank', value: 'rank', sortable: false, align: 'center' },
                { text: 'Name', value: 'name', sortable: false, searchable: true },
                { text: 'Overall Score (Points * Accuracy)', value: 'score', sortable: true },
                { text: 'Points', value: 'points', sortable: true },
                { text: 'Accuracy', value: 'accuracy', sortable: true }
            ],
            leaderboardData: [],
            loadingLeaderboardData: false,
            refreshTimeout: false
        };
    },
    methods: {
        async getData() {
            this.loadingLeaderboardData = true;
            this.leaderboardData = await getLeaderboard();
            this.loadingLeaderboardData = false;
            this.refreshTimeout = true;
            setTimeout(() => {
                this.refreshTimeout = false;
            }, LEADERBOARD_TIMEOUT);
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

#refresh {
    position: absolute;
    left: 5px;
    top: 5px;
}

#modal-close {
    position: absolute;
    right: 5px;
    top: 5px;
}

#title-container {
    position: relative;
}

#leaderboard-modal {
    box-shadow: 0px -4px 20px 3px #4caf4f69 !important;
}
</style>