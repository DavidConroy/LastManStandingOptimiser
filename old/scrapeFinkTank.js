(function () {

  function gameSimUrl(n1,n2) {
    return "http://www.dectech.co.uk/football_sites/football/gamesim.php?hid=" + n1 + "&aid=" + n2;
  };

  function teamNames() {
    var homeTeamName = document.getElementsByClassName("homeTeamName")[0].innerHTML;
    var awayTeamName = document.getElementsByClassName("awayTeamName")[0].innerHTML; 
    return [homeTeamName, awayTeamName];
  };

  var env = require('jsdom').env;

  env({
    url: "http://www.dectech.co.uk/football_sites/football/gamesim.php?hid=3&aid=4",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      console.log(errors);
      var $ = require('jquery')(window);
      console.log($('.homeTeamName').text());
      }
    });
}());
