var myInterval = 20;
var myT = 0;
var myVel = 0;
var myVerDist = 0;
var myHorDist = 0;
var g = -9.81;


function RunEngine() {
	var myVar = setInterval("EngineTimeTick()", myInterval);
}

function EngineTimeTick() {
	// do calculations on Physical quantities
	myT = (myT * 1000 + myInterval) / 1000;
	myVel = myT * g;
	myVerDist = 1/2 * g * myT * myT;
	myHorDist = 20 * myT;


	// print it to telemetry table
	document.getElementById("time").innerHTML = myT.toFixed(3) + " s";
	document.getElementById("velocity").innerHTML = myVel.toFixed(3)+" m/s";
	document.getElementById("distance").innerHTML = myVerDist.toFixed(3)+ " m";

	// move the driver
	document.getElementById("driver").style.bottom = 440 + myVerDist + "px";
	document.getElementById("driver").style.left = myHorDist + "px"
}