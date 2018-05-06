const envConfigRegex = /\/api\/envConfig/;
const envConfigData = () => {
    return {
        auth0Domain: 'artemdemo.auth0.com',
        auth0ClientID: 'EbKzIhwydh2V5854vxlyJFWlRLBA9mkK',
        auth0Audience: 'https://artemdemo.auth0.com/api/v2/',
        auth0ResponseType: 'token id_token',
        auth0PartitionScope: 'read:current_user',
        // auth0PartitionScope: 'openid profile email',
    };
};

const apiRoutesRegex = /\/api\/routes(.*)$/;
const apiRoutesData = (url) => {
    const apiRoutesNameRegex = /\/api\/routes\/(.+)$/;
    const match = apiRoutesNameRegex.exec(url);
    if (match) {
        return require(`../source/routes/routes.${match[1]}`);
    }
    return require('../source/routes/routes');
};

module.exports = {
    '/api': {
        target: 'http://localhost:8080',
        bypass: (req, res) => {
            const testUrl = (urlRegex, method = 'GET') => urlRegex.test(req.url) && req.method === method;
            switch (true) {
                case testUrl(envConfigRegex):
                    res.json(envConfigData());
                    return true;
                case testUrl(apiRoutesRegex):
                    res.json(apiRoutesData(req.url));
                    return true;
            }
        },
    },
};
