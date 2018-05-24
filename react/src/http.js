const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'mail@mail.com';
const password = 'password1';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsQG1haWwuY29tIiwibmFtZSI6IkpvaG5ueSBEb2V5In0.j86z6Ax2vB3kbuyPOmAZv538GqMTfT9LEksVe7Jf0to';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const data = JSON.parse(config.data);

    if(username === data.body.username && password === data.body.password) {
        return [200, {token}]
    } else {
        return [401, { error : 'invalid login credentials'}]
    }
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers //object

    } = config;

    if(headers.Authorization === `Bearer ${token}`){
        return [200, {friends}]
    } else if(!headers) {
        return [400, {error: 'No Authorization Header'}]
    } else if(headers.Authorization !== `Bearer ${token}`) {
        return [401, {error: 'Unauthorized token'}]
    }


});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;