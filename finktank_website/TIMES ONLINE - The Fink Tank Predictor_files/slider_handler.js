// slider functions

var sHAtk = null;
var sHDef = null;
var sAAtk = null;
var sADef = null;
var hasChanged = false;

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

DragManager = function() {
	bindMethods(this);
}

DragManager.prototype = {
	"register": function() {
		new Draggable("myWindow", {"handle": "handle"});

		sHAtk = new Slider(getElement("slider-homeAtk"),
				   getElement("slider-input-homeAtk"));

		sHDef = new Slider(getElement("slider-homeDef"),
				   getElement("slider-input-homeDef"));

		sAAtk = new Slider(getElement("slider-awayAtk"),
				   getElement("slider-input-awayAtk"));

		sADef = new Slider(getElement("slider-awayDef"),
				   getElement("slider-input-awayDef"));

		sHAtk.onchange = function() {
			var val=getElement("value1");
			swapDOM(val, SPAN({"id": "value1"}, roundNumber(ConvSlidersToReal(this.getValue()),2) ));
			hasChanged = true;
		};

		sHDef.onchange = function() {
			var val=getElement("value2");
			swapDOM(val, SPAN({"id": "value2"}, roundNumber(ConvSlidersToReal(this.getValue()),2) ));
			hasChanged = true;
		};

		sAAtk.onchange = function() {
			var val=getElement("value3");
			swapDOM(val, SPAN({"id": "value3"}, roundNumber(ConvSlidersToReal(this.getValue()),2) ));
			hasChanged = true;
		};

		sADef.onchange = function() {
			var val=getElement("value4");
			swapDOM(val, SPAN({"id": "value4"}, roundNumber(ConvSlidersToReal(this.getValue()),2) ));
			hasChanged = true;
		};

		var done = getElement("done");
		done.onclick = function() {
			if (hasChanged == true) {
				simManager.simulateWithVars(
					ConvSlidersToReal(sHAtk.getValue()),
					ConvSlidersToReal(sHDef.getValue()),
					ConvSlidersToReal(sAAtk.getValue()),
					ConvSlidersToReal(sADef.getValue())
				);
			}

			var win = getElement("myWindow");
			setStyle(win, {"display": "none"});
		}

		var open = getElement("open");

		open.onclick = function() {
			log ("clicked");
			var win = getElement("myWindow");
			setStyle(win, {"display": "block"});
			hasChanged = false;
			ReCalcSliders();
		}

		var update = getElement("update");

		update.onclick = function() {
			log("update click");
			if (hasChanged == true) {
				simManager.simulateWithVars(
					ConvSlidersToReal(sHAtk.getValue()),
					ConvSlidersToReal(sHDef.getValue()),
					ConvSlidersToReal(sAAtk.getValue()),
					ConvSlidersToReal(sADef.getValue())
				);
			}
			hasChanged = false;
		}

		var defaultBtn = getElement("default");

		defaultBtn.onclick = function() {
			log("default click");
			simManager.simulateDefaultVars();
			hasChanged = false;
		}
		
		sAAtk.onchange();
		sHAtk.onchange();
		sADef.onchange();
		sHDef.onchange();
		
		hasChanged = false;
		//var win = getElement("myWindow");
		//setStyle(win, {"display": "block"});

	}

};

ConvSlidersToReal = function(oldValue) {
	var newValue = ((oldValue * 7) * 0.004) + 0.2;
	return newValue;
}

ReCalcSliders = function() {
	sHAtk.recalculate();
	sHDef.recalculate();
	sAAtk.recalculate();
	sADef.recalculate();
}


onStart = function (draggable) {
var s = MochiKit.Style.getStyle;
	log("onStart", parseInt(s(draggable.element, 'left') || '0'));
}

onEnd = function (draggable) {
var s = MochiKit.Style.getStyle;
	log("onEnd", parseInt(s(draggable.element, 'left') || '0'));
}

var dm = new DragManager();
connect(window,"onload", dm, "register");
connect(Draggables, 'start', onStart);
connect(Draggables, 'end', onEnd);

