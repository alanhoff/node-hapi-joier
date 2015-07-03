var bluebird = require('bluebird');

exports.inject = bluebird.method(function(server, inject) {
  var def = bluebird.defer();

  require('./server-' + server)().then(function(server) {
    server
      .injectThen(inject)
      .then(function(result) {
        return bluebird.resolve().then(function() {
          server.stop(function(err) {
            if (err)
              return def.reject(err);

            def.resolve(result);
          });
        });
      }).catch(function(err) {
        def.reject(err);
      });
  });

  return def.promise;
});
