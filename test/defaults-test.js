var expect = require('chai').expect;
var fixtures = require('./fixtures');

describe('Default settings testing', function() {
  it('Should not intercept responses from unconfigures routes', function() {
    return fixtures
      .inject('default', {
        method: 'POST',
        url: '/boom'
      })
      .then(function(res) {
        expect(res.result.validation.type).to.be.equal(undefined);
      });
  });

  it('Should intercept responses from configures routes', function() {
    return fixtures
      .inject('default', {
        method: 'POST',
        url: '/boom/configured'
      })
      .then(function(res) {
        expect(res.result.validation[0].type).to.be.a('string');
      });
  });
});
