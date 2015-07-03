var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var bluebird = require('bluebird');

module.exports = bluebird.method(function() {
  var def = bluebird.defer();
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
    path: '/internal',
    handler: function(request, reply) {
      reply(new Error('Do not intercept'));
    }
  });

  server.route({
    method: 'POST',
    path: '/400boom',
    handler: function(request, reply) {
      reply(Boom.badRequest('Do not intercept'));
    }
  });

  server.route({
    method: 'POST',
    path: '/valid',
    handler: function(request, reply) {
      reply('Hello world!');
    }
  });

  server.register([{
    register: require('../../'),
    options: {
      enable: true,
      map: function(detail) {
        return 'The path is ' + detail.path;
      }
    }
  }, {
    register: require('inject-then')
  }], function(err) {
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
