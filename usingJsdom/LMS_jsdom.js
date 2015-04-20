var $ = require('jquery');
var requirejs = require('requirejs');
requirejs.config({
  nodeRequire: require
});

requirejs(['./fixtures', 'jsdom'], function (f, jsdom) {
  var fixtures = f.fixtures();
  var teams = f.teams;
  jsdom.env({
    url: "http://www.dectech.co.uk/football_sites/football/gamesim.php",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      var $ = window.$
      $( '.homeCol .mochi-visList' )[0].click();
      $( '.submenu2h a' )[0].click();
      $( '.awayCol a' )[0].click();
      $( '.submenu2 a' )[1].click();
    }
  });
});
