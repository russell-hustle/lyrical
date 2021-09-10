<template>
    <v-container>
        <v-container v-if="loadingSong">
            <v-progress-circular indeterminate color="green"></v-progress-circular>
        </v-container>
        <v-container id="content" v-else-if="!noSong" class="fill-height">
            <v-row style="height: 100%">
                <v-col>
                    <h1>{{ current.item.name }}</h1>
                    <p class="font-italic">
                        {{ all_artists }}
                    </p>
                    <img :src="current.item.album.images[1].url" class="my-6" />
                    <v-divider></v-divider>
                    <div v-if="loadingLyrics" class="mt-16">
                        <v-progress-circular indeterminate color="green"></v-progress-circular>
                    </div>
                    <div v-else-if="!noLyrics">
                        <div id="lyrics-container" class="my-4 py-8 rounded" :style="lyricsContainerStyle">
                            <div
                                v-for="(line, index) in lines"
                                :key="`${index}-${line.correct}-${repeats}`"
                                class="pa-4"
                            >
                                <guess-line v-if="line.guessing" @guess="score" :line="line" />
                                <p v-else>
                                    {{ line.words }}
                                </p>
                            </div>
                        </div>
                        <v-btn @click="newLyrics" class="mt-8 mb-12" elevation="4" color="green" large
                            >New Lyrics</v-btn
                        >
                    </div>
                    <div v-else class="mt-10">
                        <h1>Sorry!</h1>
                        <h3>We couldn't find any lyrics for that song.</h3>
                    </div>
                </v-col>
            </v-row>
            <v-footer fixed padless>
                <player :current="current" @changeProgress="changeProgress" @changeState="changeState" />
            </v-footer>
            <div id="score">
                <h2>Score: {{ correct }} / {{ correct + wrong }}</h2>
            </div>
        </v-container>
        <v-container v-else>
            <h1 class="text-h2 mb-6 font-weight-medium">No song detected</h1>
            <h3>Start playing music in spotify to get started</h3>
        </v-container>
        <v-dialog v-model="tokenExpired" width="500">
            <v-card raised>
                <v-card-title class="text-h4 justify-center">Please log in</v-card-title>

                <v-card-text>
                    Your spotify access token has expired. Please log in again to continue using Lyrical.
                </v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn large color="primary" elevation="4" @click="relogin">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import GuessLine from './GuessLine.vue';
import Player from './Player.vue';

import { getLyrics, parseLines } from '../scripts/getLyrics';
import { updateScore } from '../scripts/leaderboard';

export default {
    name: 'Home',
    components: {
        Player,
        GuessLine
    },
    data() {
        return {
            current: null, // Current song data from spotify
            noSong: false,
            loadingSong: true,
            noLyrics: false,
            loadingLyrics: true,
            savedLyrics: null,
            lines: [], // The lines to guess
            correct: 0,
            wrong: 0,
            repeats: 0, // For getting new lyrics for the same song, so vue updates correctly
            tokenExpired: false,
            lastScroll: 0, // Autoscroll
            timeout: 0, // To handle rate limiting
            skipCurrentInterval: 0 // for lag between api post/get
        };
    },
    computed: {
        all_artists() {
            let artists = this.current.item.artists[0].name;
            for (let index = 1; index < this.current.item.artists.length - 1; index++) {
                artists += ` | ${this.current.item.artists[index].name}`;
            }
            return artists;
        },
        lyricsContainerStyle() {
            let bgColor = this.$vuetify.theme.isDark ? '#1e1e1e' : '#eee';
            return `background-color: ${bgColor}`;
        }
    },
    methods: {
        score(correct) {
            if (correct) {
                this.correct++;
            } else {
                this.wrong++;
            }
            // Update score on DB
            updateScore(this.$store.state.spotifyID, correct);
        },
        /** Scroll with song */
        autoScroll() {
            if (!this.current || !this.current.item || !this.current.item.duration_ms) return;
            let percent = this.current.progress_ms / this.current.item.duration_ms;
            let pixelPercent = percent * document.body.scrollHeight;
            if (Math.abs(pixelPercent - this.lastScroll) > 400) {
                this.lastScroll = pixelPercent;
                window.scrollTo(0, pixelPercent);
            }
        },
        changeProgress(newPos) {
            this.current.progress_ms = newPos;
            this.skipCurrentInterval = 2;
            if (this.$store.state.autoScroll) this.autoScroll();
        },
        changeState(playing) {
            this.current.is_playing = playing;
            this.skipCurrentInterval = 2;
        },
        newLyrics() {
            this.repeats++;
            let parsedLines = parseLines(this.savedLyrics);
            if (parsedLines.length != 0) {
                this.lines = parsedLines;
            } else {
                this.noLyrics = true;
            }
            this.loadingLyrics = false;
            this.correct = 0;
            this.wrong = 0;
            window.scrollTo(0, 0);
        },
        relogin() {
            this.$router.push({ name: 'Landing' });
        },
        async getCurrentSong() {
            if (this.skipCurrentInterval > 0) {
                this.skipCurrentInterval--;
                return;
            }
            if (this.timeout <= 0) {
                try {
                    let response = await this.$spotify.http.get('/player/currently-playing');
                    this.loadingSong = false;
                    // If we exceed spotify rate limit
                    if (response.status == 429) {
                        this.timeout = this.$TIMEOUT;
                    }
                    // Only update lyrics data on song change
                    let prev = this.current == null ? 'old' : this.current.item.name;
                    this.current = response.data == '' ? null : response.data;
                    this.noSong = this.current == null;
                    if (!this.noSong) {
                        if (prev != this.current.item.name) {
                            this.songChanged();
                        }
                    }
                } catch (error) {
                    // If our token has expired
                    if (error.response.data.error.message == 'The access token expired') {
                        this.$store.dispatch('expire');
                        this.tokenExpired = true;
                    }
                }
            } else {
                this.timeout--;
            }
        },
        async songChanged() {
            this.repeats = 0;
            this.loadingLyrics = true;
            // Get lyrics data
            let lyrics = await getLyrics(this.current.item.name, this.current.item.artists[0].name);
            // Cache currently fetched lyrics in case we want to reuse
            this.savedLyrics = lyrics;
            // Parse
            let parsedLines = parseLines(lyrics);
            if (parsedLines.length != 0) {
                this.lines = parsedLines;
            } else {
                this.noLyrics = true;
            }
            this.loadingLyrics = false;
            this.correct = 0;
            this.wrong = 0;
        }
    },
    mounted() {
        let poller = setInterval(() => {
            this.getCurrentSong();
            if (this.$store.state.autoScroll) this.autoScroll();
        }, this.$POLL_RATE);
        this.$store.commit('startPolling', poller);
    }
};
</script>

<style lang="scss" scoped>
#content {
    margin-bottom: 80px;
}

#score {
    position: fixed;
    top: 0px;
    left: 2%;

    * {
        line-height: 40px;
    }
}

div::v-deep .v-dialog {
    box-shadow: 0px 2px 10px 0px #4caf4f70, 0px 4px 20px 13px #4caf4f6b, 0px 1px 10px 5px #4caf4f7a !important;
}

.v-divider {
    border-color: map-get($green, base) !important;
}
</style>
