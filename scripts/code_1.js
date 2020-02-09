var myTime = 0;
var xVel = 0;
var yVel = 0;
var xPos = 200;
var yPos = 300;
var Pitch = 0;
const g = -9.81; // m/s2
var myVel = 0;
var myTick = null;

window.onload = SetInitDriverPosition;

var xAcc = 0;
var yAcc = 0;
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
			xAcc = -1;
			break;
        case 38:
            // alert('up');
			yAcc = +1;
			break;
        case 39:
            // alert('right');
            xAcc = +1;
			break;
		case 40:
            // alert('down');
            yAcc = -1;
			break;
		case 32:
			// alert('space');
			RunEngine();
		break;
		}
};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
			xAcc = 0;
			break;
        case 38:
            // alert('up');
			yAcc = 0;
			break;
        case 39:
            // alert('right');
            xAcc = 0;
			break;
		case 40:
            // alert('down');
            yAcc = 0;
			break;
		}
};

const myInterval = 10; //ms
const gameSpeed = 5;
const secInt = myInterval / 1000 * gameSpeed;
function RunEngine() {
	myTick = setInterval("EngineTimeTick()", myInterval);
	document.getElementById("LaunchButton").style.visibility = "hidden";
}

function SetInitDriverPosition() {
	document.getElementById("driver").style.bottom = yPos + "px";
	document.getElementById("driver").style.left = xPos + "px";
}

var vehAcc = 15; // m/s2
var yDist = 0;
var xDist = 0;

function EngineTimeTick() {
	// do calculations on physical quantities
	myTime = myTime + secInt;
	xVel = xVel + vehAcc * xAcc * secInt;
	yVel = yVel + (secInt * g) + vehAcc * yAcc * secInt;
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

	// stop engine when out of the window
	if (yPos < 0 || yPos > 665 || xPos < 0 || xPos > 1190) {
		clearInterval(myTick);
	}
}
