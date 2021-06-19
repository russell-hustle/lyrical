<template>
    <v-container>
        <v-row>
            <v-col>
                <v-data-table :headers="leaderboardHeaders" :items="leaderboardData"> </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="getLeaderboard">Read</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="addUser">Create</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="updateUser">Update</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="myHello">My hello</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="theirHello">Their hello</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field placeholder="ID" v-model="updateUserID"></v-text-field>
                <v-text-field placeholder="Name" v-model="newUser.name"></v-text-field>
                <v-text-field placeholder="Points" v-model="newUser.points"></v-text-field>
                <v-text-field placeholder="Efficiency" v-model="newUser.efficiency"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            leaderboardHeaders: [
                { text: 'Rank', value: 'rank', sortable: false, align: 'center' },
                { text: 'Name', value: 'name', sortable: false, searchable: true },
                { text: 'Points', value: 'points', sortable: true },
                { text: 'Efficiency', value: 'efficiency', sortable: true },
                { text: 'Overall Score (points * efficiency)', value: 'score', sortable: true },
                { text: 'id', value: 'id', sortable: true }
            ],
            leaderboardData: [],
            newUser: {},
            updateUserID: null
        };
    },
    methods: {
        async myHello() {
            let { response } = await this.$functions('/hello-world', {
                params: {
                    color: 'red',
                    age: 42,
                    name: 'Ammon'
                }
            });
            console.log(response.data);
        },
        async theirHello() {
            let response = await this.$functions('/a', {
                params: {
                    color: 'red',
                    age: 42,
                    name: 'Ammon'
                }
            });
            console.log(response.data);
        },
        async getLeaderboard() {
            try {
                let response = await this.$functions('/users');
                console.log(response.data);
                this.leaderboardData = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addUser() {
            try {
                let response = await this.$functions.post(`/users/${this.updateUserID}`, {
                    ...this.newUser
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async updateUser() {
            try {
                let response = await this.$functions.put('/users', {
                    ...this.newUser
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style>
</style>