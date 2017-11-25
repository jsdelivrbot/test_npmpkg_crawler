var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    host: process.env.OPENSHIFT_NODEJS_IP || 'localhost'
});

server.register(require('inert'), function (e) {

    if (e) {

        console.log(e);

    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    });

    /*
    server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
    reply('Hello, world!');
    }
    });
     */

    server.start(function (e) {

        if (e) {

            console.log(e);

        } else {

            console.log('hapi server up:');
            console.log('port: ' + server.info.port);
            console.log('uri: ' + server.info.uri);
            console.log('');
            console.log('process.env:');
            console.log(process.env);

        }

    });

});
