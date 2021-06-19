# Local Development

Install [Netlify CLI](https://cli.netlify.com/)

```bash
npm i -g netlify-cli
```

## Important Notes

Netlify dev gets funky with the ports. [This article](https://cli.netlify.com/netlify-dev/) is helpful to understand.

The important thing to remember is that the URL that gets shown when the vue frontend (or react or whatever) is built is not correct and if you call netlify functions relatively from there you will 404.

http://localhost:8888/ is the correct URL. (at least for me will test and update later if it changes)


# IMPROVEMENTS

- [x] Make guessing case insensitive
- [x] Mobile friendly
- [x] Scrolling with song?
- [ ] Allow progress bar clicking (if possible using spotify API)
- [x] Handle token expiration better
- [ ] Webpack optimization errors?
- [ ] Look into [vue config](https://cli.vuejs.org/config/).
- [x] Use server better or go serverless
- [ ] Use more sites as fallback for more lyrics
- [x] Make a Leaderboard
- [ ] Optimize everything...

If we are crazy we can even do searching songs through our app and use more of the Spotify API
