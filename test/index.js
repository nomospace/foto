var rf = require('./remote-file');
var http = require('http');

rf.read('http://s3.ph.126.net/95AxmoHspNEBjGsp_hTIDg==/644859171652174479.js', 'test/data',
  function(data, error) {
    console.log(data, error);
  });
