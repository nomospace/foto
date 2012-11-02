define(function(require) {
  'use strict';
  var $ = require('$');

  window.dwr = {};
  dwr.engine = {};
  dwr.engine['_remoteHandleCallback'] = _ajaxCallback;
  function _ajaxCallback(bid, cid, data) {
//    console.log(bid, cid, data);
  }

  return {
    getAlbums: function(options) {
      $.ajax({
        'url': 'http://wap.blog.163.com/w2/dwr/call/plaincall/MobilePhotoBean.getAlbums.dwr?from=AndroidClient1.0&h=' + options.name,
        'data': {
          'callCount': 1,
          'scriptSessionId': '${scriptSessionId}190',
          'c0-scriptName': 'MobilePhotoBean',
          'c0-methodName': 'getAlbums',
          'c0-id': 0,
          'c0-param0': 1351842772593,
          'c0-param1': 200,
          'batchId': 470676
        }
      }).done(function() {
          options.callback(s0.netease.albums);
//          try {
//            !result || result.search('//#DWR') < 0
//              ? alert('返回数据不合法!')
//              : (new Function(result))();
//          } catch (e) {
//            alert(e.message);
//          }
        });
    },
    getPhotos: function(options) {
      $.ajax({
        'url': 'http://wap.blog.163.com/w2/dwr/call/plaincall/MobilePhotoBean.getPhotos.dwr?from=AndroidClient1.0&h=' + options.name,
        'data': {
          'callCount': 1,
          'scriptSessionId': '${scriptSessionId}190',
          'c0-scriptName': 'MobilePhotoBean',
          'c0-methodName': 'getPhotos',
          'c0-id': 0,
          'c0-param0': 246375414,
          'c0-param1': 1351847778646,
          'c0-param2': 200,
          'batchId': 470676
        }
      }).done(function() {
          options.callback(s0.netease.photos);
        });
    }
  }
});
