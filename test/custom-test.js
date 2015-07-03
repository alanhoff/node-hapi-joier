var expect = require('chai').expect;
var fixtures = require('./fixtures');

describe('Custom settings testing', function() {
  it('Should intercept all Boom + Joi erros when globally enabled', function() {
    return fixtures
      .inject('global', {
        method: 'POST',
        url: '/boom'
      })
      .then(function(res) {
        expect(res.result.validation).to.be.an('array');
      });
  });

  it('Should use custom map function', function() {
    return fixtures
      .inject('global', {
        method: 'POST',
        url: '/boom'
      })
      .then(function(res) {
        expect(res.result.validation[0]).to.be.equal('The path is name');
      });
  });

  it('Should not intercept other types of erros', function() {
    return fixtures
      .inject('global', {
        method: 'POST',
        url: '/internal'
      })
      .then(function(res) {
        expect(res.result.validation).to.be.equal(undefined);
      });
  });

  it('Should not intercept non Boom + Joi errors', function() {
    return fixtures
      .inject('global', {
        method: 'POST',
        url: '/400boom'
      })
      .then(function(res) {
        expect(res.result.validation).to.be.equal(undefined);
      });
  });
});
