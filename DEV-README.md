# Local Development

Install [Netlify CLI](https://cli.netlify.com/)

```bash
npm i -g netlify-cli
```

## Important Notes

Netlify dev gets funky with the ports. [This article](https://cli.netlify.com/netlify-dev/) is helpful to understand.

The important thing to remember is that the URL that gets shown when the vue frontend (or react or whatever) is built is not correct and if you call netlify functions relatively from there you will 404.

http://localhost:8888/ is the correct URL, and is specified in the netlify.toml file.

### Environment Variables

Netlify dev actually reads the environment variables that are set on the Netlify Site Management website. I don't use .env files and stuff and all you should need is to run 
```bash
netlify link
```
and after the the netlify dev command it should list all the environment variables it loaded.


# IMPROVEMENTS

- [x] Mobile friendly
- [x] Scrolling with song?
- [ ] Allow progress bar clicking (if possible using spotify API)
- [x] Handle token expiration better
- [ ] Webpack optimization errors?
- [ ] Look into [vue config](https://cli.vuejs.org/config/).
- [-] Use server better or go serverless
- [ ] Use more sites as fallback for more lyrics
- [ ] Use localstorage to save VueX state @Mark

If we are crazy we can even do searching songs through our app and use more of the Spotify API
