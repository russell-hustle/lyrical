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

- Make guessing case insensitive
- Handle token expiration better
- Webpack optimization errors?
- Look into [vue config](https://cli.vuejs.org/config/).
- Use server better
- Fix everything I hacked together to get it deployed
- Scrolling with song???
- Handle no lyrics found better
- Optimize everything...


If we are crazy we can even do searching songs through our app and use more of the Spotify API
