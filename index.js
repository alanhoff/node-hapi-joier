//jshint maxcomplexity: 6
var mout = require('mout');

exports.register = function(server, options, next) {

  // Our default config get merged with user options
  var defaults = mout.object.merge({
    enable: false,
    map: function(validation) {
      if (validation.context && validation.context.value)
        delete validation.context.value;

      return validation;
    }
  }, options || {});

  // Merge defautl options with user options
  if (options) {
    for (var k in defaults) {
      if (options[k])
        defaults[k] = options[k];
    }
  }

  // Register the hook
  server.ext('onPreResponse', function(request, reply) {
    var response = request.response;

    // We need to detect if it's a Boom object and a Joi error
    if (!response.isBoom ||
      !response.data ||
      response.data.name !== 'ValidationError')
      return reply.continue();

    // Merge the default params with the route specific params
    var options = mout.object.merge(defaults,
      mout.object.get(request, 'route.settings.plugins.joier') || {});

    // Check if we are allowes to intercept this response
    if (!options.enable)
      return reply.continue();

    // Add the entire Joi validation object error to our response but remove
    // context.value as it contains the original and invalid data
    response.output.payload.validation = response.data.details
      .map(options.map);

    reply.continue();
  });

  // Tell Hapi to continue
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
