var myInterval = 20;
var myT = 0;
var myVel = 0;
var myDist = 0;


function RunEngine() {
	var myVar = setInterval("EngineTimeTick()", myInterval);
}

function EngineTimeTick() {
	// do calculations on Physical quantities
	myT = (myT * 1000 + myInterval) / 1000;
	myVel = myT * 9.81;
	myDist = 1/2 * 9.81 * myT * myT;


	// print it to telemetry table
	document.getElementById("time").innerHTML = myT.toFixed(3) + " s";
	document.getElementById("velocity").innerHTML = myVel.toFixed(3)+" m/s";
	document.getElementById("distance").innerHTML = myDist.toFixed(3)+ " m";

	// move the driver
	document.getElementById("driver").style.top = myDist + "px"
}