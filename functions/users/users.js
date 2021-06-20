const createRoute = require('./create');
const readAllRoute = require('./get-all');
const updateRoute = require('./update');

// ENDPOINT: /.netlify/functions/users

const handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
  const segments = path.split('/').filter(Boolean);

  // Router
  switch (event.httpMethod) {
    case 'GET':
      // GET /.netlify/functions/users
      return readAllRoute.handler(event, context);

    case 'POST':
      // POST /.netlify/functions/users 
      // Body contains spotifyID and name
      // Only for first time users, initializes points to 0 and accuracy to 1.0
      return createRoute.handler(event, context);

    case 'PUT':
      // PUT /.netlify/functions/users/<spotify_id> 
      // JSON body with if guess was correct boolean

      if (segments.length === 1) {
        const [id] = segments;
        event.id = id;
        return updateRoute.handler(event, context);
      }


      return updateRoute.handler(event, context);

    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT',
      };
  }
};

module.exports = { handler };
