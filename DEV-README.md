# Local Development

Install [Netlify CLI](https://cli.netlify.com/)

```bash
npm i -g netlify-cli
```

## Important Notes

Netlify dev gets funky with the ports. [This article](https://cli.netlify.com/netlify-dev/) is helpful to understand.

The important thing to remember is that the URL that gets shown when the vue frontend (or react or whatever) is built is not correct and if you call netlify functions relatively from there you will 404.

http://localhost:8080/ is the correct URL, and is specified in the netlify.toml file.

### Environment Variables

Netlify dev actually reads the environment variables that are set on the Netlify Site Management website. I don't use .env files and stuff and all you should need is to run 
```bash
netlify link
```
The the netlify dev command lists all the environment variables it loaded at the start, but honestly I have no idea how it works and I have a local `.env` file too because sometimes it doesn't work.



# IMPROVEMENTS

- [?] Scrolling with song?
- [ ] Allow progress bar clicking (if possible using spotify API)
- [x] Handle token expiration better
- [ ] Hide ALL environment variables from version control (this includes retroactively erasing them)
- [ ] Better lyrics scraping for line guesses (trailing parens)
- [ ] Use edit distance for threshold guessing
- [ ] Use more sites as fallback for more lyrics
- [ ] Use localstorage to save VueX state @Mark
- [ ] Convert all .then() to async/await

If we are crazy we can even do searching songs through our app and use more of the Spotify API

It would be cool to not have to configure the spotify redirect whitelist, but I don't think we have an option there.

** May have to switch to different DB (mongo), depending on usage