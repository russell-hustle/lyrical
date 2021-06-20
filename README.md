[![Netlify Status](https://api.netlify.com/api/v1/badges/c43063cc-a07c-4eb4-ab82-99ee4f1f82e2/deploy-status)](https://app.netlify.com/sites/spotify-lyrical/deploys)

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

We have transition to use Netlify Functions (through AWS Lambda) with FaunaDB for a complete serverless experience.

We use FaunaDB for the leaderboard along with Netlify Functions 

For getting lyrics, we use the Genius API and then scrape the lyrics page.
