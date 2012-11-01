define(function(require) {
  var $ = require('$');

  $.ajax({
    'type': 'post',
    'url': 'http://photo.163.com/share/jinlu_hz/dwr/call/plaincall/PictureSetBean.getPictureSetsWithCover.dwr',
    'data': {
      'callCount': 1,
      'scriptSessionId': '${scriptSessionId}187',
      'c0-scriptName': 'PictureSetBean',
      'c0-methodName': 'getPictureSetsWithCover',
      'c0-id': 0,
      'c0-param0': 0,
      'c0-param1': 5,
      'c0-param2': false,
      'batchId': 470676
    }
  }).done(function(result) {
      try {
        !result || result.search('//#DWR') < 0
          ? alert('返回数据不合法!')
          : (new Function(result))();
      } catch (e) {
        alert(e.message);
      }
    });
});
