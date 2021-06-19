exports.handler = function (event, context, callback) {
    console.log("qs paramters:", event.queryStringParamters);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: "Hello World!", ...event.queryStringParamters }),
    });
}