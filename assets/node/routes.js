var express = require('express');
var crypto = require('crypto');
var path = require('path');
var config = require('./config');

module.exports = function(app) {
  // url routes
  app.get('/api/index', function(req, res) {
    var token = req.query.token, uid = req.query.uid;
    if (token) {
      afterSignin({uid: uid, access_token: token}, res);
    }
    res.partial('../README.md');
  });

  app.get('/api/signin', function(req, res) {
  });

  app.post('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
    res.send({data: '123456post'});
  });

  app.get('/', function(req, res) {
    res.send({data: '654321get'});
  });

  app.get('*', function(req, res) {
    res.render('index.html');
  });
};

function callback(res, err, data) {
  if (err) {
    res.send(err.data);
  }
  else {
    res.send(data);
  }
}

function afterSignin(result, res) {
  var uid = result.uid, token = result.access_token;
  genSession({token: token, uid: uid}, res);
}

function genSession(data, res) {
  var token = encrypt(data.token + '\t' + data.uid, config.session_secret);
  // cookie 有效期 10 天
  res.cookie(config.auth_cookie_name, token, {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 10
  });
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}
