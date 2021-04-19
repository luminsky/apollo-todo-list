exports.queryHandler = async (event) => {
    const {body, httpMethod, path} = event;
    if (httpMethod !== 'GET' || httpMethod !== 'POST') {
        throw new Error(`graphql only accepts POST and GET methods, you tried: ${httpMethod} method.`);
    }

    console.log('received:', JSON.stringify(event));

    const response = {
        statusCode: 200,
        body: JSON.parse(body),
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
