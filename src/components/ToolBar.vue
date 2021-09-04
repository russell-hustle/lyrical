<template>
    <div id="toolbar">
        <!-- MODALS -->

        <v-dialog v-model="aboutModal" eager transition="fade-transition">
            <v-card id="about-modal" tile elevation="20">
                <v-btn id="modal-close" icon @click="aboutModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-img class="mx-auto" width="60%" :src="getThemedImage" eager />
                <v-card-text class="text-h5"
                    >This web app was made for Southern Utah Code Camp 2020 Remote by team Ru$$el Hustle. It even won
                    first place in the Intermediate Division!
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="leaderboardModal" eager transition="fade-transition">
            <leaderboard @close="leaderboardModal = false" />
        </v-dialog>

        <!-- TOOLTIPS -->

        <!-- LOG OUT -->
        <ios-tooltip v-if="$store.state.authenticated" @click="logout">
            <template v-slot:icon>
                <v-icon>mdi-logout</v-icon>
            </template>
            <template v-slot:text>
                <span>Log Out</span>
            </template>
        </ios-tooltip>
        <!-- LEADERBOARD -->
        <ios-tooltip @click="leaderboardModal = true">
            <template v-slot:icon>
                <v-icon>mdi-account-group</v-icon>
            </template>
            <template v-slot:text>
                <span>Leaderboard</span>
            </template>
        </ios-tooltip>
        <!-- AUTOSCROLL -->
        <ios-tooltip @click="$store.commit('toggleAutoScroll')">
            <template v-slot:icon>
                <v-icon v-if="$store.state.autoScroll">mdi-arrow-vertical-lock</v-icon>
                <v-icon v-else>mdi-arrow-up-down</v-icon>
            </template>
            <template v-slot:text>
                <span v-if="$store.state.autoScroll">Disable Auto Scroll</span>
                <span v-else>Enable Auto Scroll</span>
            </template>
        </ios-tooltip>
        <!-- ABOUT -->
        <ios-tooltip @click="aboutModal = true">
            <template v-slot:icon>
                <v-icon>mdi-information</v-icon>
            </template>
            <template v-slot:text>
                <span>About</span>
            </template>
        </ios-tooltip>
        <!-- SOURCE CODE -->
        <ios-tooltip :href="'https://github.com/russell-hustle'">
            <template v-slot:icon>
                <v-icon>mdi-github</v-icon>
            </template>
            <template v-slot:text>
                <span>Source Code</span>
            </template>
        </ios-tooltip>
        <!-- LIGHT/DARK MODE -->
        <ios-tooltip @click="$vuetify.theme.dark = !$vuetify.theme.dark">
            <template v-slot:icon>
                <v-icon>mdi-white-balance-sunny</v-icon>
            </template>
            <template v-slot:text>
                <span v-if="$vuetify.theme.dark">Light Mode</span>
                <span v-else>Dark Mode</span>
            </template>
        </ios-tooltip>
    </div>
</template>

<script>
import IosTooltip from './IosTooltip.vue';
import Leaderboard from './Leaderboard.vue';

export default {
    name: 'ToolBar',
    components: {
        IosTooltip,
        Leaderboard
    },
    data() {
        return {
            aboutModal: false,
            leaderboardModal: false,

            ifOnIOS: this.$browserDetect.isIOS,
            darkImg: require('@/assets/codecamp-dark.png'),
            lightImg: require('@/assets/codecamp-light.png')
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('expire');
            this.$router.push({ name: 'Landing' });
        }
    },
    computed: {
        getThemedImage() {
            return this.$vuetify.theme.dark ? this.darkImg : this.lightImg;
        }
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
.v-btn:before:not(#modal-close) {
    opacity: 0 !important;
}

.v-ripple__container:not(#modal-close) {
    opacity: 0 !important;
}
</style>