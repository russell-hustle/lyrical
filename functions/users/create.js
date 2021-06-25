const process = require('process');

const { query: q, Client } = require('faunadb');

const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
});

const DUPLICATE_USER_MSG = "user already exists";

const handler = async (event) => {
    try {
        // Parse body
        const userInfo = JSON.parse(event.body);

        // See if exists
        // Wrap int try/catch because abort throws an error
        try {
            const response = await client.query(
                q.Let({
                    userExists: q.Exists(
                        q.Match(q.Index('users'), userInfo.spotifyID)
                    )
                },
                    // If not, then create
                    q.If(
                        q.Var('userExists'),
                        q.Abort(DUPLICATE_USER_MSG),
                        q.Create(q.Collection('users'), {
                            data: {
                                points: 0,
                                accuracy: 1.0,
                                ...userInfo
                            }
                        })
                    )
                )
            );

            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        } catch (error) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    msg: DUPLICATE_USER_MSG
                }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};

module.exports = { handler };
