const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

// server.use(restify.plugins.bodyParser());
// server.use(restify.plugins.multipartBodyParser());
server.use(restify.plugins.urlEncodedBodyParser());

server.get('/uploads/*', restify.plugins.serveStatic({
    directory: __dirname
}))

server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true
    });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/tournaments')(server);
    require('./routes/teams')(server);
    require('./routes/players')(server);
    console.log(`server started on port ${config.PORT}`);
});