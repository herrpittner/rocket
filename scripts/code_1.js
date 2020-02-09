var myTime = 0;
var xVel = 500;
var yVel = 500;
var xPos = 10;
var yPos = 10;
var Pitch = 0;
const g = -9.81; // m/s2
var Vel = 0;
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
			if (engineRunning == false) {
				RunEngine();
			}
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

const myInterval = 1000/50; //ms
const gameSpeed = 1;
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
var dragAcc = 0;
var xDragAcc = 0;
var yDragAcc = 0;
const Ro = 1.3; // air density
const Cd = 0.47; //sphere drag coeficient
const sphDia = 10 // sphere diameter [m]
const sphMass = 10000 //sphere mass [kg]
var engineRunning = false;
var tickCount = 0;

function EngineTimeTick() {
	// do calculations on physical quantities
	engineRunning = true;
	tickCount ++
	myTime = myTime + secInt;
	dragAcc = Ro * Cd * (Math.PI * sphDia * sphDia / 4) / 2 / sphMass * Vel * Vel;
	xVel = xVel + vehAcc*xAcc*secInt - xDragAcc * secInt;
	yVel = yVel + (secInt * g) + vehAcc*yAcc*secInt  - yDragAcc * secInt;
	yPos = yPos + secInt * yVel;
	xPos = xPos + secInt * xVel;
	yDist = yDist + Math.abs(secInt * yVel);
	xDist = xDist + Math.abs(secInt * xVel);
	Pitch = Math.atan(yVel/Math.abs(xVel)) * 180 / Math.PI;
	Vel = Math.sqrt((yVel*yVel) + (xVel*xVel));
	xDragAcc = dragAcc * xVel/Vel;
	yDragAcc = dragAcc * yVel/Vel;

	// print it to telemetry table
	document.getElementById("time").innerHTML = (myTime/gameSpeed).toFixed(3) + " s";
	document.getElementById("Vel").innerHTML = Vel.toFixed(3)+ " m/s";
	document.getElementById("Alt").innerHTML = yPos.toFixed(3)+ " m";
	document.getElementById("Vvel").innerHTML = yVel.toFixed(3)+" m/s";
	document.getElementById("Hvel").innerHTML = xVel.toFixed(3)+" m/s";
	document.getElementById("Vdist").innerHTML = yDist.toFixed(3)+ " m";
	document.getElementById("Hdist").innerHTML = xDist.toFixed(3)+ " m";
	document.getElementById("Pitch").innerHTML = Pitch.toFixed(3)+ " deg";
	document.getElementById("Drag").innerHTML = dragAcc.toFixed(3)+ "";
	document.getElementById("xDrag").innerHTML = xDragAcc.toFixed(3)+ "";
	document.getElementById("yDrag").innerHTML = yDragAcc.toFixed(3)+ "";

	// print traces of driver
	if ((tickCount % 10) == 0) {
		var para = document.createElement("DIV");
		// para.innerHTML = "This is a trace." + tickCount;
		para.className = "trace"
		document.getElementById("game_window").appendChild(para);
		para.style.bottom = yPos + 5 + "px";
		para.style.left = xPos + 5 + "px";
	}

	// move the driver
	document.getElementById("driver").style.bottom = yPos + "px";
	document.getElementById("driver").style.left = xPos + "px";

	// stop engine when out of the window
	if (yPos < 0 || yPos > 665 || xPos < 0 || xPos > 1190) {
		clearInterval(myTick);
		engineRunning = false;
	}
}
