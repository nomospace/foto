/**
 * User: nomospace
 * Date: 5/6/12
 * Time: 11:06 PM
 */
define(function(require, exports, module) {
    $ = require('$');

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
            debugger;
            try {
                !result || result.search('//#DWR') < 0
                    ? console.log('返回数据不合法!')
                    : (new Function(result))();
            } catch (e) {
                console.log(e.message);
            }
        });
});
