//create global GameManager

processMochiTAL = function (dom, data, bigChance) {
	if (dom.nodeType != 1) {
		return;
	}
	
	var attr;
	
	// handle repeat tags
	attr = getAttribute(dom, "mochi:repeat");
	if (attr) {
		dom.removeAttribute("mochi:repeat");
		var parent = dom.parentNode;
		attr = attr.split(" ");
		var name = attr[0];
		var lst = valueForKeyPath(data, attr[1]);
		
		if (!lst) {	
			return;
		}
		
		var length = lst.length;
		if (attr[2] != null)
			length = attr[2];
			
		for (var i=0; i<length; ++i) {
			data[name] = lst[i];
			var newDOM = dom.cloneNode(true);
			processMochiTAL(newDOM, data, bigChance);
			parent.insertBefore(newDOM, dom);
		}
		
		parent.removeChild(dom);
		return;
	}
	
	// handle size/width tag -- basically sort out the width compared with the probability
	
	attr = getAttribute(dom, "mochi:size");
	if (attr) {
		dom.removeAttribute("mochi:size");
		var smallChance  = valueForKeyPath(data, attr)
		var width = numberFormatter("#%")((smallChance * 0.7)/ bigChance)
		//dom.setAttribute("style", "width: " + width + ";");
		var myStyle = {"width": width};
		setStyle(dom, myStyle);
		//dom.style = {"width": width};
		return;
	}
	
	// handle content tags
	attr = getAttribute(dom, "mochi:content");
	if (attr) {
		dom.removeAttribute("mochi:content");
		replaceChildNodes(dom, valueForKeyPath(data, attr));
		return;
	}
	

	attr = getAttribute(dom, "mochi:formattedContent");
	if (attr) {
		dom.removeAttribute("mochi:formattedContent");
		var format = getAttribute(dom, "mochi:format");
		if (format) {
			replaceChildNodes(dom, 	numberFormatter(format)(valueForKeyPath(data, attr)));
		} else {
			replaceChildNodes(dom, 	numberFormatter("#%")(valueForKeyPath(data, attr)));
		}		
		return;
	}
	
	// make a shallow copy of the child nodes - in case it changes due to repeat attr
	var nodes = list(dom.childNodes);
	
	// now iterate through them and continue the processing
	for (var i=0; i<nodes.length; ++i) {
		processMochiTAL(nodes[i], data, bigChance);
	}	
};


toggleDivTypeVisibility = function (ev) {
	ignoreEvent(ev);
	log ("toggle div vis");
	closeTeamPanels();
	var hiddenLinks = getElementsByTagAndClassName(null, "mochi-visList_bottom");
	var myListID = getAttribute(this, "mochi:listID");
	
	for (var i=0; i<hiddenLinks.length; ++i) {
		if(getAttribute(hiddenLinks[i], "mochi:parentID") == myListID) {
			// now toggel the attribute...
			var vis = hiddenLinks[i].style;

			if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
				vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
			vis.display = (vis.display==''||vis.display=='block')?'none':'block';			
		} else {
			setStyle(hiddenLinks[i], {"display": "none"});
		}
	}
	
};


toggleTeamVisibility = function (ev) {
	ignoreEvent(ev);
	var hiddenLinks = getElementsByTagAndClassName(null, "submenu2h");
	var myListID = getAttribute(this, "mochi:listID");
	
	for (var i=0; i<hiddenLinks.length; ++i) {
		if(getAttribute(hiddenLinks[i], "mochi:listID") == myListID) {
			// now toggel the attribute...
			var vis = hiddenLinks[i].style;

			if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
				vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
			vis.display = (vis.display==''||vis.display=='block')?'none':'block';			
		} else {
			setStyle(hiddenLinks[i], {"display": "none"});
		}
	}
	
	// now for away
	var hiddenLinks = getElementsByTagAndClassName(null, "submenu2");
	var myListID = getAttribute(this, "mochi:listID");
	
	for (var i=0; i<hiddenLinks.length; ++i) {
		if(getAttribute(hiddenLinks[i], "mochi:listID") == myListID) {
			// now toggel the attribute...
			var vis = hiddenLinks[i].style;

			if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
				vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
			vis.display = (vis.display==''||vis.display=='block')?'none':'block';			
		} else {
			setStyle(hiddenLinks[i], {"display": "none"});
		}
	}	
	
};

toggleNeutralVenue = function (ev) {
	log ("neutral Toggled");
	//ignoreEvent(ev);
	
	if (this.checked) 
		simManager.neutralState = 1;
	else
		simManager.neutralState = 0;
		
		
	simManager.simulateLastVars();
};

selectTeamAndSimulate = function (ev) {
	ignoreEvent(ev);
	
	var homeTeamID = getAttribute(this, "mochi:homeTeamID");
	var homeTeamName = getAttribute(this, "mochi:homeTeamName");
	var awayTeamID = getAttribute(this, "mochi:awayTeamID");
	var awayTeamName = getAttribute(this, "mochi:awayTeamName");
	
	if (homeTeamID) {
		simManager.homeTeamID = homeTeamID;
		simManager.homeTeamName = homeTeamName;
	}
	
	if (awayTeamID) {
		simManager.awayTeamID = awayTeamID;
		simManager.awayTeamName = awayTeamName;
	}
	
	// hide this panel now
	closeTeamPanels();
	
	// and simulate the game

	simManager.simulateGivenGame();
};

closeTeamPanels = function() {
	var hiddenLinks = getElementsByTagAndClassName(null, "submenu2h");

	for (var i=0; i<hiddenLinks.length; ++i) {
		setStyle(hiddenLinks[i], {"display": "none"});
//		hiddenLinks[i].setAttribute("style", "display: none;");
	}

	var hiddenLinks = getElementsByTagAndClassName(null, "submenu2");

	for (var i=0; i<hiddenLinks.length; ++i) {
		setStyle(hiddenLinks[i], {"display": "none"});
//		hiddenLinks[i].setAttribute("style", "display: none;");
	}

};

changeResultPageLinks = function() {
	var links = getElementsByTagAndClassName(null, "changeResultPageBtn");
	
	for (var i=0; i<links.length; ++i) {
		var tempHref = links[i].getAttribute("mochi:link") + "?";
		tempHref = tempHref + "hid=" + simManager.homeTeamID + "&";
		tempHref = tempHref + "aid=" + simManager.awayTeamID + "&";
		tempHref = tempHref + "neu=" + simManager.neutralState;
		
		links[i].href = tempHref;
	}
};

changeResultPageLinksCustom = function(hAtk, hDef, aAtk, aDef) {
	var links = getElementsByTagAndClassName(null, "changeResultPageBtn");
	
	for (var i=0; i<links.length; ++i) {
		var tempHref = links[i].getAttribute("mochi:link") + "?";
		tempHref = tempHref + "hid=" + simManager.homeTeamID + "&";
		tempHref = tempHref + "aid=" + simManager.awayTeamID + "&";
		tempHref = tempHref + "neu=" + simManager.neutralState + "&"
		tempHref = tempHref + "hAtk=" +  hAtk + "&";
		tempHref = tempHref + "hDef=" +  hDef + "&";
		tempHref = tempHref + "aAtk=" +  aAtk + "&";
		tempHref = tempHref + "aDef=" +  aDef;
		
		links[i].href = tempHref;
	}
};

ignoreEvent = function(ev) {
	if (ev && ev.preventDefault) {
		ev.preventDefault();
		ev.stopPropagation();
	} else if (typeof(event) != 'undefined') {
		event.cancelBubble = false;
		event.returnValue = false;
	}
};

getAttribute = function (dom, key) {
	try {
		return dom.getAttribute(key);
	} catch (e) {
		return null;
	}
};

valueForKeyPath = function (data, keyPath) {
	var chunks = keyPath.split(".");
	while (chunks.length && data) {
		data = data[chunks.shift()];
	}
	
	return data;
};

SortTransforms = {
	"str": operator.identity,
	"isoDate": isoDate
};

DatabaseManager = function() {
	bindMethods(this);
};

DatabaseManager.prototype = {
	"initialize": function() {
		log ("database Initialize");
	},
	
	"getTeamNameFromID": function(id) {
		if (id == 0) 
			return "Team A";
		if (id == 1) 
			return "Team B";
		if (id == 2) 
			return "Team C";
		if (id == 3) 
			return "Team D";
		else	
			return "Team E";
	}
};

SimManager = function() {
	this.defaultHomeID = -1;
	this.defaultAwayID = -1;
	this.defaultNeutral = 0;
	this.scriptName = "/cgi-bin/GetEuroIntlSimulated.pl";
	this.templates = [];
	this.deferred = null;
	this.data = null;
	this.homeTeamID = -1;
	this.awayTeamID = -1;
	this.neutralState = 0;
	this.homeTeamName = "Select Home Team";
	this.awayTeamName = "Select Away Team";
	this.databaseManager = null;
	
	this.lastHAtk = -1;
	this.lastHDef = -1;
	this.lastAAtk = -1;
	this.lastADef = -1;
	
	this.vsOn = SPAN({"id": "vs"}, "Vs");
	this.vsOff = SPAN({"id": "vs"}, "-");
	
	bindMethods(this);
};

SimManager.prototype = {
	"initialize": function() {
		log("initializing");

		// initialise the databaseManager first
		this.databaseManager = new DatabaseManager();
		this.databaseManager.initialize();

		// remove the examples
		var examples = getElementsByTagAndClassName(null, "mochi-example");
		while (examples.length) {
			swapDOM(examples.pop(), null);
		}
		
		// grab the template divs, and then remove their temp class
		var templates = getElementsByTagAndClassName(null, "mochi-template");
		
		for (var i=0; i<templates.length; ++i) {
			var template = templates[i];
			var proto = template.cloneNode(true);
			removeElementClass(proto, "mochi-template");
			this.templates.push({"template": proto, "node": template});
		}
				
		// go through and find the mochi-list links
		var teamLinks = getElementsByTagAndClassName(null, "mochi-visList");
		
		for (var i=0; i<teamLinks.length; ++i) {
			var listID = getAttribute(teamLinks[i], "mochi:listID");

			if (listID) {
				teamLinks[i].onclick = toggleTeamVisibility;
			}			
		}

		var divTypeLinks = getElementsByTagAndClassName(null, "mochi-visList_top");
		
		for (var i=0; i<divTypeLinks.length; ++i) {
			var listID = getAttribute(divTypeLinks[i], "mochi:listID");

			if (listID) {
				divTypeLinks[i].onclick = toggleDivTypeVisibility;
			}			
		}
				
		// go through and get the team links
		var links = getElementsByTagAndClassName("a", null);
		
		for (var i=0; i<links.length; ++i) {
			var homeTeamID = getAttribute(links[i], "mochi:homeTeamID");
			var awayTeamID = getAttribute(links[i], "mochi:awayTeamID");
			
			if (homeTeamID || awayTeamID) {
				links[i].onclick = selectTeamAndSimulate;
			}				
		}
		
		// set the neutral venue buttons
		var neutralCntl = getElementsByTagAndClassName(null,"mochi-neutralVenueCntl");
		
		for (var i=0; i<neutralCntl.length; ++i) {
			neutralCntl[i].onclick = toggleNeutralVenue;
		}
		
		if (PHP_getHomeID != -1) {
			this.homeTeamID = PHP_getHomeID;
			this.homeTeamName = PHP_getHomeName;
		} else
			this.homeTeamID = this.defaultHomeID;

		if (PHP_getAwayID != -1) {
			this.awayTeamID = PHP_getAwayID;
			this.awayTeamName = PHP_getAwayName;
		} else
			this.awayTeamID = this.defaultAwayID;
			
		if (PHP_getNeutral != -1)
			this.neutralState = PHP_getNeutral;
		else
			this.neutralState = this.defaultNeutral;
		
		var vsDOM = getElement("vs");
		
		if ((this.homeTeamID == -1) || (this.awayTeamID == -1)) {
			swapDOM(vsDOM, this.vsOff);
		} else {
			swapDOM(vsDOM, this.vsOn);
		}		
		
		log ("globals", PHP_getHomeAtk);
		
		if ((PHP_getHomeAtk != -1) &&
		  (PHP_getHomeDef != -1) &&
		  (PHP_getAwayAtk != -1) &&
		  (PHP_getAwayDef != -1))
			this.simulateWithVars(PHP_getHomeAtk, PHP_getHomeDef, PHP_getAwayAtk, PHP_getAwayDef);		
		else
			this.simulateGivenGame();		
		
	},
	
	"simulateLastVars": function() {
		log("sim with last vars");
		
		if ((this.lastHAtk != -1) &&
		  (this.lastHDef != -1) &&
		  (this.lastAAtk != -1) &&
		  (this.lastADef != -1)) 
			this.simulateWithVars(this.lastHAtk, this.lastHDef, this.lastAAtk, this.lastADef);
		else
			this.simulateGivenGame();
	},
	
	"simulateWithVars": function(hAtk, hDef, aAtk, aDef) {
		log("sim with vars", hAtk, hDef, aAtk, aDef);
		changeResultPageLinksCustom(hAtk, hDef, aAtk, aDef);
		
		if ((this.homeTeamID == -1) || (this.awayTeamID == -1)) {
			this.displayNotEnoughTeams();
		} else {
			this.lastHAtk = hAtk;
			this.lastHDef = hDef;
			this.lastAAtk = aAtk;
			this.lastADef = aDef;

			this.loadFromURL(this.scriptName,  {homeID: this.homeTeamID, 
				awayID: this.awayTeamID, 
				neutral: this.neutralState, 
				homeAtt: hAtk,
				homeDef: hDef,
				awayAtt: aAtk,
				awayDef: aDef,
				homeType: 0,
				awayType: 0}
			);
		}
	},
	
	"simulateDefaultVars": function() {
		changeResultPageLinks();
		
		this.lastHAtk = -1;
		this.lastHDef = -1;
		this.lastAAtk = -1;
		this.lastADef = -1;
	
		this.loadFromURL(this.scriptName, {homeID: this.homeTeamID, 
			awayID: this.awayTeamID, 
			neutral: this.neutralState,
			homeType: 0,
			awayType: 0}
		);
	},
		
	"simulateGivenGame": function() {
		log("standard Sim");
		// simulates the game with the ID's we're holding
		changeResultPageLinks();
		
		if ((this.homeTeamID == -1) || (this.awayTeamID == -1)) {
			this.displayNotEnoughTeams();
		} else {
			this.lastHAtk = -1;
			this.lastHDef = -1;
			this.lastAAtk = -1;
			this.lastADef = -1;
	
			this.loadFromURL(this.scriptName, {homeID: this.homeTeamID, awayID: this.awayTeamID, neutral: this.neutralState, homeType: 0, awayType: 0});
		}
	},
	
	"loadFromURL": function(url, vars) {
		log("loadFromURL", url, vars.homeID, vars.awayID, vars.homeAtt, vars.homeType, vars.awayType);
		var d;
		if (this.deferred) {
			this.deferred.cancel();
		}
		
		d = loadJSONDoc(url, vars);
		
		this.deferred = d;
		var self = this;
		
		d.addBoth(function (res) {
			self.deferred = null;
			log('loadFromURL success');
			return res;
		});
		
		d.addCallback(this.initWithData);
		
		d.addErrback(function(err) {
			if (err instanceof CancelledError) {
				return;
			}
			
			logError(err);
		});
		return d;
	},
	
	"initWithData": function(data) {
		log("initWithData", data);
		
		// have to store goals in a nice array - so we can sort by chance
		// Also, we have to create a text of the goals, as well as a better chance variable
		
		var rows = data.goals;
		var outcomes = [];
		for (var i=0; i<rows.length; ++i) {
			var tempRow = {};
			tempRow.score = rows[i].homeGoal + " - " + rows[i].awayGoal;
			tempRow.pr = numberFormatter("#.#%")(rows[i].chance);

			tempRow.homeGoal = rows[i].homeGoal;		
			tempRow.awayGoal = rows[i].awayGoal;
			tempRow.chance = rows[i].chance;
			
			outcomes.push(tempRow);
		}

		// store data for later
		data.outcomes = outcomes;
		this.data = data;
		
		
		
		// display the rows
		this.sortOutcomes();
	},
	
	"sortOutcomes": function () {
		// sort out the sort columns
		var forward = false;
		// apply sort transform to imaginary column
		// then do the sort
		
		var sortfunc = operator.identity;
		if (!sortfunc) {
			throw new TypeError("unsupported sort style" + repr(sortstyle));
		}
		
		var outcomes = this.data.outcomes;
		for (var i=0; i<outcomes.length; ++i) {
			var outcome = outcomes[i];
			outcome.__sort__ = sortfunc(outcome["chance"]);
		}
		
		// now do the sort
		var cmp = (forward? keyComparator: reverseKeyComparator);
		outcomes.sort(cmp("__sort__"));
		
		// now get the largest value to scale against
		this.data.largestChance = outcomes[0].chance;
		
		this.displayBarChart();
		this.displayNames();
		this.setSliderMarks();
	},
	
	"displayBarChart": function () {
		log("displayBarChart");		
		for (var i=0; i<this.templates.length; ++i) {
			var template = this.templates[i];
			var dom = template.template.cloneNode(true);
			processMochiTAL(dom, this.data, this.data.largestChance);
			template.node = swapDOM(template.node, dom);
		}
	},
	
	"displayLabels": function () {
	}, 
	
	"displayNotEnoughTeams": function() {
		log ("not enough teams");
		this.displayNames();
		this.hideChart();
	},
	
	"convertToSliderValue": function(str, prevMarks) {
		// normalises from 0.2 - 3.00 to 0 - 200
		var tmpVal = str - 0.2;
		tmpVal = tmpVal * 500 / 7;
		var fixedVal = Math.floor(tmpVal) * 2;
		
		// the final conversion taking mark width into account
		var convertedVal = fixedVal + 4 - prevMarks;
		
		return convertedVal;
	},
	
	"convertToSliderKnob": function(str) {
		var tmpVal = str - 0.2;
		tmpVal = tmpVal * 250 / 7;
		
//		log("conv:", str, tmpVal);
		return tmpVal;
	},
	
	"setSliderMarks": function() {
//		log("marks1", this.data.AtkMinH, this.data.AtkMaxH);
//		log("marks2", this.data.AtkMinA, this.data.AtkMaxA);
//		log("marks3", this.data.DefMinH, this.data.DefMaxH);
//		log("marks4", this.data.DefMinA, this.data.DefMaxA);
		
		// ***
		// set the sliders
		
		// attack Home
		var atkHMin = getElement("homeAtk-minMark");
		
		var tmpPos = this.convertToSliderValue(this.data.AtkMinH, 0);
		var tmpStr = tmpPos + "px";
		
		setStyle(atkHMin, {"left": tmpStr, "display": "block"});

		var atkHMax = getElement("homeAtk-maxMark");

		tmpPos = this.convertToSliderValue(this.data.AtkMaxH, 1);
		tmpStr = tmpPos + "px";
		
		setStyle(atkHMax, {"left": tmpStr, "display": "block"});

		// defence home
		var defHMin = getElement("homeDef-minMark");
		
		var tmpPos = this.convertToSliderValue(this.data.DefMinH, 0);
		var tmpStr = tmpPos + "px";
		
		setStyle(defHMin, {"left": tmpStr, "display": "block"});

		var defHMax = getElement("homeDef-maxMark");

		tmpPos = this.convertToSliderValue(this.data.DefMaxH, 1);
		tmpStr = tmpPos + "px";
		
		setStyle(defHMax, {"left": tmpStr, "display": "block"});
	
		// ***
		// now for away team

		var atkAMin = getElement("awayAtk-minMark");
		
		var tmpPos = this.convertToSliderValue(this.data.AtkMinA, 0);
		var tmpStr = tmpPos + "px";
		
		setStyle(atkAMin, {"left": tmpStr, "display": "block"});

		var atkAMax = getElement("awayAtk-maxMark");

		tmpPos = this.convertToSliderValue(this.data.AtkMaxA, 1);
		tmpStr = tmpPos + "px";
		
		setStyle(atkAMax, {"left": tmpStr, "display": "block"});

		// defence away
		var defAMin = getElement("awayDef-minMark");
		
		var tmpPos = this.convertToSliderValue(this.data.DefMinA, 0);
		var tmpStr = tmpPos + "px";
		
		setStyle(defAMin, {"left": tmpStr, "display": "block"});

		var defAMax = getElement("awayDef-maxMark");

		tmpPos = this.convertToSliderValue(this.data.DefMaxA, 1);
		tmpStr = tmpPos + "px";
		
		setStyle(defAMax, {"left": tmpStr, "display": "block"});

		// ***
		// Now set the actual slider positions
			
		sHAtk.setValue(this.convertToSliderKnob(this.data.AtkCurH));
		sHDef.setValue(this.convertToSliderKnob(this.data.DefCurH));
		sAAtk.setValue(this.convertToSliderKnob(this.data.AtkCurA));
		sADef.setValue(this.convertToSliderKnob(this.data.DefCurA));
		hasChanged = false;
		
	},
	
	"hideChart": function() {
		log("hiding chart");
		var rows = getElementsByTagAndClassName(null, "mochi-hide");
		
		for (var i=0; i<rows.length; ++i) {
			setStyle(rows[i], {"display": "none"});
//			rows[i].setAttribute("style", "display: none;");
		}
	},
	
	"displayNames": function() {
		var homeTags = getElementsByTagAndClassName(null, "homeTeamName");
		var awayTags = getElementsByTagAndClassName(null, "awayTeamName");
		
		var homeTeamName = this.homeTeamName;
		var awayTeamName = this.awayTeamName;
		
		log (homeTeamName);
		for (var i=0; i<homeTags.length; ++i) {
			replaceChildNodes(homeTags[i], homeTeamName); 
		}
		
		for (var i=0; i<awayTags.length; ++i) {
			replaceChildNodes(awayTags[i], awayTeamName); 
		}

		var vsDOM = getElement("vs");
		
		if ((this.homeTeamID == -1) || (this.awayTeamID == -1)) {
			swapDOM(vsDOM, this.vsOff);
		} else {
			swapDOM(vsDOM, this.vsOn);
		}		
		
	}

};

simManager = new SimManager();
addLoadEvent(simManager.initialize);
