define(['require', '$', 'handlebars', './api'], function(require, $, Handlebars, Api) {
  'use strict';

  var albumTpl = $('#J_album').html(),
    albumCtx = Handlebars.compile(albumTpl);

  Api.getAlbums({
    name: 'qatest2',
    callback: function(data) {
      console.log(data);
      $('body').html(albumCtx(data));
    }
  });

  Api.getPhotos({
    name: 'qatest2',
    callback: function(data) {
      console.log(data);
    }
  });
});
