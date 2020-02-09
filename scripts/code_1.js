var myTime = 0;
var xVel = 20;
var yVel = 100;
var xPos = 50;
var yPos = 100;
var Pitch = 0;
const g = -9.81;
var myVel = 0;
var myTick = null;

window.onload = SetInitDriverPosition;

var HorVelDelta = 0;
var VerVelDelta = 0;
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
			HorVelDelta = HorVelDelta - 1;
			break;
        case 38:
            // alert('up');
			VerVelDelta = VerVelDelta + 1;
			break;
        case 39:
            // alert('right');
            HorVelDelta = HorVelDelta + 1;
			break;
		case 40:
            // alert('down');
            VerVelDelta = VerVelDelta - 1;
			break;
		}
};

const myInterval = 10; //ms
const secInt = myInterval/1000;
function RunEngine() {
	myTick = setInterval("EngineTimeTick()", myInterval);
}

function SetInitDriverPosition() {
	document.getElementById("driver").style.bottom = yPos + "px";
	document.getElementById("driver").style.left = xPos + "px";
}

var yDist = 0;
var xDist = 0;

function EngineTimeTick() {
	// do calculations on physical quantities
	myTime = (myTime + secInt);
	xVel = xVel;
	yVel = yVel + (secInt * g);
	yPos = yPos + secInt * yVel;
	xPos = xPos + secInt * xVel;
	yDist = yDist + Math.abs(secInt * yVel);
	xDist = xDist + Math.abs(secInt * xVel);
	Pitch = Math.atan(yVel/xVel) * 180 / Math.PI;
	myVel = Math.sqrt((yVel*yVel) + (xVel*xVel));

	// print it to telemetry table
	document.getElementById("time").innerHTML = myTime.toFixed(3) + " s";
	document.getElementById("Vel").innerHTML = myVel.toFixed(3)+ " m/s";
	document.getElementById("Alt").innerHTML = yPos.toFixed(3)+ " m";
	document.getElementById("Vvel").innerHTML = yVel.toFixed(3)+" m/s";
	document.getElementById("Hvel").innerHTML = xVel.toFixed(3)+" m/s";
	document.getElementById("Vdist").innerHTML = yDist.toFixed(3)+ " m";
	document.getElementById("Hdist").innerHTML = xDist.toFixed(3)+ " m";
	document.getElementById("Pitch").innerHTML = Pitch.toFixed(3)+ " deg";

	// move the driver
	document.getElementById("driver").style.bottom = yPos + "px";
	document.getElementById("driver").style.left = xPos + "px";

	// stop engine when altitude is 0
	if (yPos < 0) {
		clearInterval(myTick);
	}
}
