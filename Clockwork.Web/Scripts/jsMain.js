UserGetAllRecords();
function UserGetTime() {
	var xhttp = new XMLHttpRequest();
	var TimeZone = document.getElementById("timezone").value;
	xhttp.addEventListener("load", parseGetTime);
	/*xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("output").innerHTML = this.responseText;
		}
	};*/
	xhttp.open("GET", "http://localhost:60556/api/currenttime/" + TimeZone);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();


}
function UserGetAllRecords() {
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", parseGetAllRecords);
	/*xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("output").innerHTML = this.responseText;
		}
	};*/
	xhttp.open("GET", "http://localhost:60556/api/timerecord", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();


}

function parseGetTime() {
	document.getElementById("currentTime").innerHTML = this.responseText;
	var httpResponse = JSON.parse(this.responseText);
	//httpResponse = JSON.parse(this.responseText);


	document.getElementById("utc").innerHTML = "<b>Server Time:&nbsp;</b>" + httpResponse.utcTime;
	document.getElementById("servertime").innerHTML = "<b>Server Time:&nbsp;</b>" + httpResponse.time;
	document.getElementById("ip").innerHTML = "<b>IP Address:&nbsp;</b>" + httpResponse.clientIp;

	UserGetAllRecords();
}

function parseGetAllRecords() {
	document.getElementById("currentTime").innerHTML = this.responseText;
	var httpResponse = JSON.parse(document.getElementById("currentTime").innerHTML);
	
	var tr;
	var td1;
	var td2;
	var td3;
	var td4;
	var val1;
	var val2;
	var val3;
	var val4;
	var tblRec = document.getElementById("timelogs");
	var elmtTable = document.getElementById('timelogs');
	var tableRows = elmtTable.getElementsByTagName('tr');
	var rowCount = tableRows.length;

	for (var x = rowCount - 1; x > 0; x--) {
		elmtTable.removeChild(tableRows[x]);
	}

	for (var rowindex = 0; rowindex < httpResponse.length; rowindex++) {

		tr = document.createElement("tr");
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		td4 = document.createElement("td");

		val1 = document.createTextNode(httpResponse[rowindex].utcTime);
		val2 = document.createTextNode(httpResponse[rowindex].clientIp);
		val3 = document.createTextNode(httpResponse[rowindex].time);
		if (httpResponse[rowindex].timeZone.substring(0, 1) == "m") val4 = document.createTextNode("GMT -" + httpResponse[rowindex].timeZone.replace("m", ""));
		if (httpResponse[rowindex].timeZone.substring(0, 1) == "p") val4 = document.createTextNode("GMT +" + httpResponse[rowindex].timeZone.replace("p", ""));

		td1.appendChild(val1);
		td2.appendChild(val2);
		td3.appendChild(val3);
		td4.appendChild(val4);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		tblRec.appendChild(tr);
	}
}