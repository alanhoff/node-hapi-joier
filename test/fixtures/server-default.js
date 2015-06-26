var Hapi = require('hapi');
var Joi = require('joi');
var bluebird = require('bluebird');

module.exports = bluebird.method(function() {
  var def = bluebird.def();
  var server = new Hapi.Server();
  server.connection();

  server.route({
    method: 'POST',
    path: '/boom',
    handler: function(request, reply) {
      reply('Hello world!');
    },
    config: {
      validate: {
        payload: {
          name: Joi.string().min(10).max(40).required()
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/valid',
    handler: function(request, reply) {
      reply('Hello world!');
    }
  });

  server.register({
    register: require('../')
  }, {
    register: require('inject-then')
  }, function(err) {
    if (err)
      return def.reject(err);

    server.start(function(err) {
      if (err)
        return def.reject(err);

      def.resolve(server);
    });
  });

  return def.promise;
});
