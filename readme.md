# Hapi Joier
[![Coverage Status](https://coveralls.io/repos/alanhoff/node-hapi-joier/badge.svg?branch=master)][2]
[![Travis](https://travis-ci.org/alanhoff/node-hapi-joier.svg)][1]

Better Joi error messages for your 400 responses.

### Usage

Just register `hapi-joier` and be hapi.

```javascript
server.register({
  register: require('hapi-joier'),
  options: {
    enabled: true
  }
})
```

Now your 400 replies should have better information about the invalid data.

```json
{
  "statusCode":400,
  "error":"Bad Request",
  "message":"child \"name\" fails because [\"name\" length must be at least 10 characters long]",
  "validation":[
    {
      "message":"\"name\" length must be at least 10 characters long",
      "path":"name",
      "type":"string.min",
      "context":{
        "limit":10,
        "key":"name"
      }
    }
  ]
}
```

As you can see, we can now detect which test failed, this is much better to
display the correct error on the frontend.

### Installation

Install this module with the command `npm install --save hapi-joier`, after that
you are ready to register this module as a Hapi plugin.

### Testing

Type the following lines inside your command line.

```bash
git clone git@github.com:alanhoff/node-hapi-joier.git
cd node-hapi-joier
npm install
npm test
```

### Configuration

Every configuration can be made when you `server.register` or individually on
each route.

* __enable__ `Boolean` Enable hapi-joier, if used in the `server.register` it
  will enable the plugin for every route. Default: `false`
* __map__ `Function` The function used to construct each validation object
inside de response. It receives a Joi detail as the first parameter.

### Examples

Enable hapi-joi for only one route:

```javascript
// Do not pass "enable" as a option, so it won't be globally enabled
server.register(require('hapi-joi'), function()...);

server.route({
  method: 'GET',
  path: '/upload',
  method: function(request, reply){
    reply('Hello world!');
  },
  config: {
    plugins: {
      joier: {
        enabled: true
      }
    }
  }
});
```

Change the response object with a custom map

```javascript
// Do not pass "enable" as a option, so it won't be globally enabled
server.register(require('hapi-joi'), function()...);

server.route({
  method: 'GET',
  path: '/upload',
  method: function(request, reply){
    reply('Hello world!');
  },
  config: {
    plugins: {
      joier: {
        enabled: true,
        map: function(detail){
          return 'Something is wrong with ' + detail.path;
        }
      }
    }
  }
});
```

### License MIT

Copyright (c) 2015, Alan Hoffmeister <alanhoffmeister@gmail.com>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.



