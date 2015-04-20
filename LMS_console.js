var unalteredFixtureList = [
  ["Crystal Palace v.  West Bromwich Albion",
  "Everton v.  Burnley",
  "Leicester City v.  Swansea City",
  "Stoke City v.  Southampton",
  "Chelsea v.  Manchester United",
  "Manchester City v.  West Ham United",
  "Newcastle United v.  Tottenham Hotspur",
  ],
  [
  "Southampton v.  Tottenham Hotspur",
  "Burnley v.  Leicester City",
  "Crystal Palace v.  Hull City",
  "Newcastle United v.  Swansea City",
  "Queens Park Rangers v.  West Ham United",
  "Stoke City v.  Sunderland",
  "West Bromwich Albion v.  Liverpool",
  "Manchester City v.  Aston Villa",
  "Everton v.  Manchester United",
  "Arsenal v.  Chelsea",
  "Hull City v.  Liverpool",
  "Leicester City v.  Chelsea",
  ],
  [
  "Leicester City v.  Newcastle United",
  "Aston Villa v.  Everton",
  "Liverpool v.  Queens Park Rangers",
  "Sunderland v.  Southampton",
  "Swansea City v.  Stoke City",
  "West Ham United v.  Burnley",
  "Manchester United v.  West Bromwich Albion",
  "Chelsea v.  Crystal Palace",
  "Tottenham Hotspur v.  Manchester City",
  "Hull City v.  Arsenal",
  ],
  [
  "Everton v.  Sunderland",
  "Aston Villa v.  West Ham United",
  "Hull City v.  Burnley",
  "Leicester City v.  Southampton",
  "Newcastle United v.  West Bromwich Albion",
  "Stoke City v.  Tottenham Hotspur",
  "Crystal Palace v.  Manchester United",
  "Manchester City v.  Queens Park Rangers",
  "Chelsea v.  Liverpool",
  "Arsenal v.  Swansea City",
  ],
  [
  "Southampton v.  Aston Villa",
  "Burnley v.  Stoke City",
  "Queens Park Rangers v.  Newcastle United",
  "Sunderland v.  Leicester City",
  "Tottenham Hotspur v.  Hull City",
  "West Ham United v.  Everton",
  "Liverpool v.  Crystal Palace",
  "Swansea City v.  Manchester City",
  "Manchester United v.  Arsenal",
  "West Bromwich Albion v.  Chelsea",
  "Arsenal v.  Sunderland",
  ],
  [
  "Arsenal v.  West Bromwich Albion",
  "Aston Villa v.  Burnley",
  "Chelsea v.  Sunderland",
  "Crystal Palace v.  Swansea City",
  "Everton v.  Tottenham Hotspur",
  "Hull City v.  Manchester United",
  "Leicester City v.  Queens Park Rangers",
  "Manchester City v.  Southampton",
  "Newcastle United v.  West Ham United",
  "Stoke City v.  Liverpool",
  ],
];

var separateUnalteredFixtureList = function() { return unalteredFixtureList.map(function(week) {
  return week.map(function(game) {
    return game.split('v.').map(function(s){return s.trim();});
  });
})};

var fixtures = separateUnalteredFixtureList(unalteredFixtureList);

var teams = [  
  "Chelsea",
  "Arsenal",
  "Manchester United",
  "Manchester City",
  "Liverpool",
  "Southampton",
  "Tottenham Hotspur",
  "Swansea City",
  "West Ham United",
  "Stoke City",
  "Crystal Palace",
  "Everton",
  "Newcastle United",
  "West Bromwich Albion",
  "Aston Villa",
  "Sunderland",
  "Hull City",
  "Queens Park Rangers",
  "Burnley",
  "Leicester City",
].sort();

var s = document.createElement('script');
s.setAttribute('src', 'http://code.jquery.com/jquery.js');
document.body.appendChild(s);

function teamNameToNumber(teamName) {
  return teams.indexOf(teamName);
};

function setTeams(n,m) {
  $( '.homeCol .mochi-visList' )[0].click();
  $( '.submenu2h a' )[n].click();
  $( '.awayCol a' )[0].click();
  $( '.submenu2 a' )[m].click();
};

function homeAwayWinChances() {
  return [ $( '.score4' )[0].textContent.slice(0,4)/100, $( '.score4' )[1].textContent.slice(0,4)/100 ];
  //output = [ $( '.score4' )[0].textContent.slice(0,4)/100, $( '.score4' )[1].textContent.slice(0,4)/100 ];
};

function fixtureWinChances(game) {
  var h = teamNameToNumber(game[0]);
  var a = teamNameToNumber(game[1]);
  setTeams(h, a);
  return homeAwayWinChances(); 
};

function fixtureWinChancesFromId(hid, aid) {
  setTeams(hid, aid);
  for (var i=0; i<500000; i++) {x = Math.floor(Math.random()) % 3;}     
  return homeAwayChances();
};

var seasonResult = [];
var counter = 0;

function f(season) {
  for (var week = 0; week < season.length; week++) {
    var weekResult = [];    
    for (var fixture = 0; fixture < season[week].length; fixture++) {
      counter++;
      var fixture = fixtures[week][fixture]; 
      var h = teamNameToNumber(fixture[0]);
      var a = teamNameToNumber(fixture[1]);
      setTeams(h, a);
      for (var i=0; i<500000; i++) {x = Math.floor(Math.random()) % 3;}     
      weekResult.push(homeAwayWinChances());
      for (var i=0; i<500000; i++) {x = Math.floor(Math.random()) % 3;}     
      console.log("Fixture Result: " + fixtureResult.toString());
    }
    seasonResult.push(weekResult); 
  }
  return seasonResult;
};

var x = fixtures.map(function(week){return week.map(function(fix) {return [teamNameToNumber(fix[0]), teamNameToNumber(fix[1])];});}).flatten();


var weekResult = [];    
var week = 0;
for (var f = 0; f < fixtures[week].length; f++) {
  var game = fixtures[week][f]; 
  var h = teamNameToNumber(game[0]);
  var a = teamNameToNumber(game[1]);
  setTeams(h, a);
  for (var i=0; i<500000; i++) {x = Math.floor(Math.random()) % 3;}     
  var fixtureResult = homeAwayWinChances();
  weekResult.push(fixtureResult);
}
