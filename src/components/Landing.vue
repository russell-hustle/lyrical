<template>
    <v-container>
        <h1 id="title" class="mb-16 text-h1 font-weight-black">Lyrical</h1>
        <v-btn :href="spotify_url" elevation="10" color="green" x-large>Login With Spotify</v-btn>
    </v-container>
</template>

<script>
export default {
    name: 'Landing',
    data() {
        return {};
    },
    computed: {
        spotify_url() {
            const encodedParams = new URLSearchParams({
                response_type: 'token',
                client_id: this.$spotify.client_id,
                redirect_uri: this.$spotify.redirect_uri,
                scope: this.$spotify.scopes
            }).toString();
            return `https://accounts.spotify.com/authorize?${encodedParams}`;
        }
    },
    methods: {},
    mounted() {}
};
</script>

<style lang="scss">
</style>