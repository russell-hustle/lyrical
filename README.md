![Travis CI](https://travis-ci.org/russell-hustle/lyrical.svg?branch=main) [![Netlify Status](https://api.netlify.com/api/v1/badges/c43063cc-a07c-4eb4-ab82-99ee4f1f82e2/deploy-status)](https://app.netlify.com/sites/spotify-lyrical/deploys)

# Spotify Lyrics Guesser

### Ammon Taylor, Mark Abraham, Will Dickinson, Hunter Nielson

---

## Frontend

Technologies
- Vue & plugins like vue-router and vuex
- Axios
- Vuetify

Integrates with the Spotify API

## Backend

A Flask app that gets song requests and tries to find lyrics through a the Genius API.

A server was only necessary to bypass CORS, so thanks a lot CORS...

We parse the lyrics and return data in a specific format to create a lyrics guessing game.

---

# IMPROVEMENTS

- [x] Make guessing case insensitive
- [x] Mobile friendly
- [x] Scrolling with song?
- [ ] Allow progress bar clicking (if possible using spotify API)
- [ ] Handle token expiration better
- [ ] Webpack optimization errors?
- [ ] Look into [vue config](https://cli.vuejs.org/config/).
- [ ] Use server better or go serverless
- [ ] Use more sites as fallback for more lyrics
- [ ] Optimize everything...

If we are crazy we can even do searching songs through our app and use more of the Spotify API
