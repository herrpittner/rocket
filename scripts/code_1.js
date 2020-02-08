var myInterval = 20;
var myT = 0;
var myVel = 0;
var myDist = 0;
var Output1;
var Output2;
var Output3;

function RunEngine() {
	var myVar = setInterval("EngineTime()", myInterval);
}

function EngineTime() {
	myT = (myT * 1000 + myInterval) / 1000;
	myVel = myT * 9.81;
	myDist = 1/2 * 9.81 * myT * myT;

	document.getElementById("time").innerHTML = myT.toFixed(3) + " s";
	document.getElementById("velocity").innerHTML = myVel.toFixed(3)+" m/s";
	document.getElementById("distance").innerHTML = myDist.toFixed(3)+ " m";
}