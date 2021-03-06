define({
  fixtureList: [
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
  ],
  fixtures: function() { return this.fixtureList.map(function(week) {
    return week.map(function(game) {
      return game.split('v.').map(function(s){return s.trim();});
    });
  })},
  teams: [  
    "Chelsea",
    "Arsenal",
    "Man United",
    "Man City",
    "Liverpool",
    "Southampton",
    "Tottenham",
    "Swansea City",
    "West Ham",
    "Stoke City",
    "Crystal Palace",
    "Everton",
    "Newcastle",
    "West Brom",
    "Aston Villa",
    "Sunderland",
    "Hull City",
    "QPR",
    "Burnley FC",
    "Leicester City",
   ].sort(),
});



/*
testFixture = function (hteam, ateam) {
  $( '.mochi-vislist' )[0].click();
  $( 'a', $( '.submenu2h' ).children[0] )[teamToNum[hteam]].click();
};
*/
