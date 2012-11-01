var http = require('http'),
  buffer = require('buffer'),
  iconv = require('iconv').Iconv,
  url = require('url').parse('http://photo.163.com/qatest2');

http.get(url, function(res) {
  var html = '';
  res.setEncoding('binary');//or hex
  res.on('data', function(chunk) {
    html += chunk;
  });
  res.on('end', function() {
    console.log((new iconv('GBK', 'UTF-8')).convert(new Buffer(html, 'binary')).toString());
  });
});
