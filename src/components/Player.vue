<template>
    <v-container fluid class="pa-0">
        <div>
            <v-progress-linear :value="percentComplete" color="green" class="my-0" height="3"></v-progress-linear>

            <v-row>
                <v-col class="pa-0 mt-4">
                    <h2>{{ current.item.name }}</h2>
                    <em class="ma-0">{{ current.item.artists[0].name }}</em>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="pa-0 mb-4">
                    <v-hover v-slot="{ hover }">
                        <v-btn :color="hover ? 'green' : ''" icon @click="prevTrack">
                            <v-icon>mdi-skip-previous</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-hover v-if="this.current.is_playing" v-slot="{ hover }">
                        <v-btn :color="hover ? 'green' : ''" icon @click="pauseTrack">
                            <v-icon>mdi-pause</v-icon>
                        </v-btn>
                    </v-hover>

                    <v-hover v-else v-slot="{ hover }">
                        <v-btn :color="hover ? 'green' : ''" icon @click="playTrack">
                            <v-icon>mdi-play</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-btn :color="hover ? 'green' : ''" icon @click="skipTrack">
                            <v-icon>mdi-skip-next</v-icon>
                        </v-btn>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
export default {
    name: 'Player',
    props: {
        current: {
            type: Object
        }
    },
    computed: {
        percentComplete() {
            return 100 * (this.current.progress_ms / this.current.item.duration_ms);
        }
    },
    methods: {
        async playTrack() {
            try {
                await this.$spotify.http.put('/player/play');
            } catch (error) {
                console.error(error);
            }
        },
        async pauseTrack() {
            try {
                await this.$spotify.http.put('/player/pause');
            } catch (error) {
                console.error(error);
            }
        },
        async skipTrack() {
            try {
                await this.$spotify.http.post('/player/next');
            } catch (error) {
                console.error(error);
            }
        },
        async prevTrack() {
            try {
                await this.$spotify.http.post('/player/previous');
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style>
</style>