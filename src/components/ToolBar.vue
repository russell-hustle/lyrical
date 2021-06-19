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
            <leaderboard @close="leaderboardModal = false" />
        </v-dialog>

        <v-tooltip v-if="!ifOnIOS" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-5" @click="leaderboardModal = true" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-account-group</v-icon>
                </v-btn>
            </template>
            <span>View Player Leaderboard</span>
        </v-tooltip>
        <v-tooltip v-else bottom style="display: none">
            <template v-slot:activator="{}">
                <v-btn class="pa-5" @click="leaderboardModal = true" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-account-group</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-tooltip v-if="!ifOnIOS" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-5" @click="$store.commit('toggleAutoScroll')" icon v-bind="attrs" v-on="on">
                    <v-icon v-if="$store.state.autoScroll">mdi-arrow-vertical-lock</v-icon>
                    <v-icon v-else>mdi-arrow-up-down</v-icon>
                </v-btn>
            </template>
            <span v-if="$store.state.autoScroll">Disable auto scroll</span>
            <span v-else>Enable auto scroll</span>
        </v-tooltip>
        <v-tooltip v-else bottom style="display: none">
            <template v-slot:activator="{}">
                <v-btn class="pa-5" @click="$store.commit('toggleAutoScroll')" icon v-bind="attrs" v-on="on">
                    <v-icon v-if="$store.state.autoScroll">mdi-arrow-vertical-lock</v-icon>
                    <v-icon v-else>mdi-arrow-up-down</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-tooltip v-if="!ifOnIOS" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-5" @click="aboutModal = true" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-information</v-icon>
                </v-btn>
            </template>
            <span>About</span>
        </v-tooltip>
        <v-tooltip v-else bottom style="display: none">
            <template v-slot:activator="{}">
                <v-btn class="pa-5" @click="aboutModal = true" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-information</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-tooltip v-if="!ifOnIOS" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon href="https://github.com/russell-hustle" v-bind="attrs" v-on="on">
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </template>
            <span>Source Code</span>
        </v-tooltip>
        <v-tooltip v-else bottom style="display: none">
            <template v-slot:activator="{}">
                <v-btn icon href="https://github.com/russell-hustle" v-bind="attrs" v-on="on">
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </template>
        </v-tooltip>

        <v-tooltip v-if="!ifOnIOS" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-5" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-white-balance-sunny</v-icon>
                </v-btn>
            </template>
            <span v-if="$vuetify.theme.dark">Light Mode</span>
            <span v-else>Dark Mode</span>
        </v-tooltip>
        <v-tooltip v-else bottom style="display: none">
            <template v-slot:activator="{}">
                <v-btn class="pa-5" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-white-balance-sunny</v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </div>
</template>

<script>
import Leaderboard from './Leaderboard.vue';

export default {
    name: 'ToolBar',
    components: {
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
.v-btn:before {
    opacity: 0 !important;
}

.v-ripple__container {
    opacity: 0 !important;
}
</style>