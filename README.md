[![Build Status](https://travis-ci.org/russell-hustle/lyrical.svg?branch=main)](https://travis-ci.org/russell-hustle/lyrical) [![Netlify Status](https://api.netlify.com/api/v1/badges/c43063cc-a07c-4eb4-ab82-99ee4f1f82e2/deploy-status)](https://app.netlify.com/sites/spotify-lyrical/deploys)

# Spotify Lyrics Guesser

### Ammon Taylor, Mark Abraham, Will Dickinson, Hunter Nielson

---

Lyrical is a web-app created for playing a game with your favorite songs. If you have a spotify account you can login and then start playing a song. Lyrical will show the lyrics to the corresonding song in a way that gamifies the experience. It gives real time feedback that tells you whether your guess was right or not. Check out the leaderboard to see how you're comparing to other players.

![alt text][demo]

[demo]: https://github.com/russell-hustle/lyrical/blob/main/LyricalDemo.gif


## Frontend

Technologies
- Vue & plugins like vue-router and vuex
- Axios
- Vuetify

Integrates with the Spotify API

## Backend

A Flask app that gets song requests and tries to find lyrics through a the Genius API. It also performs queries on an AWS database to manage our leaderboard data.

A server was only necessary to bypass CORS, so thanks a lot CORS...

We parse the lyrics and return data in a specific format to create a lyrics guessing game.

---

# IMPROVEMENTS

- [x] Make guessing case insensitive
- [x] Mobile friendly
- [x] Scrolling with song?
- [ ] Allow progress bar clicking (if possible using spotify API)
- [x] Handle token expiration better
- [ ] Webpack optimization errors?
- [ ] Look into [vue config](https://cli.vuejs.org/config/).
- [ ] Use server better or go serverless
- [ ] Use more sites as fallback for more lyrics
- [x] Make a Leaderboard
- [ ] Optimize everything...

If we are crazy we can even do searching songs through our app and use more of the Spotify API
