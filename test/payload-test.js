var expect = require('chai').expect;
var fixtures = require('./fixtures');

describe('Default settings testing', function() {
  it('Should add the source to the message', function() {
    return fixtures
      .inject('default', {
        method: 'POST',
        url: '/boom/configured'
      })
      .then(function(res) {
        expect(res.result.validation[0].source).to.be.a('string');
      });
  });
});
