/**
 * 读取远程文件到指定路径并提供回调
 * @param url string 待读取的资源路径
 * @param targetPath string 资源本地存储路径，类型自行判断，无法根据 content-type 判断可伪装
 * @param callback function 回调函数，写入完成或者出错时回调 callback(info,error)
 *    回调数据出错时为空对象 {}，成功时为 {targetPath:targetPath,picUrl:picUrl}
 * @author Thanks to xinyu198736@gmail.com
 * @source https://github.com/xinyu198736/readOnlineFile/blob/master/lib/readOF.js
 *
 * @todo 文件编码自动识别并转换
 * @todo 文件类型自行判断
 */
'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var noop = function() {
};

exports.read = function(sourceUrl, targetPath, callback) {
    callback || (callback = noop);

    var urlData = url.parse(sourceUrl);
    var request = http.createClient(80, urlData.host).request('GET', urlData.pathname, {
        'host': urlData.host
    });

    request.on('response', function(res) {
        if (res.statusCode != '200') {
            callback.call(res, {}, {
                error: '404 request at ' + sourceUrl
            });
            return;
        }
        var resultBuffer = new Buffer(res.headers['content-length'] * 1 + 2);
        var buffers = [];
        res.on('end', function() {
            var i = 0, size = buffers.length, pos = 0;
            for (i = 0; i < size; i++) {
                buffers[i].copy(resultBuffer, pos);
                pos += buffers[i].length;
            }
            try {
                fs.writeFile(targetPath, resultBuffer, function(e) {
                    if (e) {
                        callback.call(res, {}, {
                            error: 'error: ' + e
                        });
                    }
                    callback.call(res, {
                        targetPath: targetPath,
                        url: sourceUrl
                    });
                });
            } catch (e) {
                callback.call(res, {}, {
                    error: 'error: ' + e
                });
            }
        });
        res.on('data', function(chunk) {
            if (res.statusCode == 200) {
                buffers.push(new Buffer(chunk));
            }
        });
    });
    request.end();
};

