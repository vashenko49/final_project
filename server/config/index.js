module.exports = {
    JWT_SECRET: 'verysecret',
    mogodbURL:"mongodb+srv://sergey:vashenko@cluster0-zdqsh.mongodb.net/finalproject?retryWrites=true&w=majority",
    usersIdSecret:"userscreate",
    orderIdSecret:"orderscreate",
    oauth: {
        google: {
            clientID: '265989474253-6frqdlrfjt641v8banje7i3pfpijnk6s.apps.googleusercontent.com',
            clientSecret: 'fYmxpHjx_0gsCV2Offzoag7e'
        },
        facebook: {
            clientID: '431291340757545',
            clientSecret: '0a92793be8faed627444e692d1e6cdce'
        },
        github:{
            clientID: 'a9d3b6300fd90b5d527d',
            clientSecret: '9a67a7d69acb39f1bec95223b7d8bc51c5f4b773'
        }
    }
};