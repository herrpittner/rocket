const myInterval = 20; //ms
var myT = 0;
var myHorVel = 0;
var myHorDist = 0;
var myVerDist = 0;
var myHorDist = 0;
var myPitch = 0;
const g = -9.81;
var myVel = 0;
var myAltitude = 0;
var initAltitude = 50;
var myTick = null;

function RunEngine() {
	myTick = setInterval("EngineTimeTick()", myInterval);
}

function EngineTimeTick() {
	// do calculations on physical quantities
	myT = (myT * 1000 + myInterval) / 1000;
	myHorVel = 50;
	myVerVel = myT * g;
	myVerDist = 1/2 * myVerVel * myT;
	myHorDist = myHorVel * myT;
	myPitch = Math.atan(myVerVel/myHorVel) * 180 / Math.PI;
	myVel = Math.sqrt(myVerVel*myVerVel + myHorVel*myHorVel);
	myAltitude = initAltitude + myVerDist;

	// print it to telemetry table
	document.getElementById("time").innerHTML = myT.toFixed(3) + " s";
	document.getElementById("Vvel").innerHTML = myVerVel.toFixed(3)+" m/s";
	document.getElementById("Vdist").innerHTML = myVerDist.toFixed(3)+ " m";
	document.getElementById("Hvel").innerHTML = myHorVel.toFixed(3)+" m/s";
	document.getElementById("Hdist").innerHTML = myHorDist.toFixed(3)+ " m";
	document.getElementById("Vel").innerHTML = myVel.toFixed(3)+ " m/s";
	document.getElementById("Pitch").innerHTML = myPitch.toFixed(3)+ " deg";
	document.getElementById("Alt").innerHTML = myAltitude.toFixed(3)+ " m";

	// move the driver
	document.getElementById("driver").style.bottom = myAltitude + "px";
	document.getElementById("driver").style.left = myHorDist + "px"

	// stop engine when altitude is 0
	if (myAltitude < 0) {
		clearInterval(myTick);
	}
}
