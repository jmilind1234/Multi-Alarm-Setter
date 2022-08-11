var id;

var currTime;
class alarmTimer {
    constructor(id, time, meridian) {
        this.id = id;
        this.time = time;
        this.meridian = meridian;
    }
}
var x = document.getElementById("myAudio");

//check whether the alarm-list is already created in localStorage "alarms"
//if present than set ID for new alarm as well.

var localStorageAlarms;

var parsedAlarms;

function checkLocalStorageAndShowAlarms() {
    localStorageAlarms = localStorage.getItem("alarms");
    if (localStorageAlarms === null) {
        localStorage.setItem("alarms", JSON.stringify(new Array()));
    }
    else {
        parsedAlarms = JSON.parse(localStorage.getItem("alarms"));
        id = parsedAlarms.length;

        var j;
        for (j = 0; j < id; j++) {
            if (parsedAlarms[j] !== null) {
                var li = document.createElement("li");
                var time = document.createTextNode(parsedAlarms[j].time + " " + parsedAlarms[j].meridian);
                li.appendChild(time);

                li.setAttribute("id", parsedAlarms[j].id.toString());

                li.setAttribute("class", "alarm-item");

                var delbtn = document.createElement("button");

                var deleteText = document.createTextNode("Delete");

                delbtn.appendChild(deleteText);

                delbtn.setAttribute("class", "delete");

                li.appendChild(delbtn);

                var ul = document.getElementById("alarm-lists");
                ul.appendChild(li);
            }
        }

    }
}

checkLocalStorageAndShowAlarms();



//providing delete functionality

function deleteTheAlarm(event) {
    var li = event.target.parentElement;
    var deleteId = li.id;
    li.style.display = "none";
    parsedAlarms[deleteId] = null;
    localStorage.setItem("alarms", JSON.stringify(parsedAlarms));
    x.pause();
}

var delBtns = document.getElementsByClassName("delete");
var k;
for (k = 0; k < delBtns.length; k++) {
    delBtns[k].onclick = deleteTheAlarm;
}

function getCurrentTime() {
    var d1 = new Date();
    let hrs = d1.getHours();
    let mins = d1.getMinutes();
    var meridian = "am";
    if (hrs > 12) {
        hrs = hrs % 12;
        meridian = "pm";
    }
    var time = document.getElementById("currentTimer")
    time.innerText = hrs + " " + ":" + " " + mins + " " + meridian;
    currTime = hrs + " " + ":" + " " + mins + " " + meridian;
}

function addAlarm() {
    var hr = document.getElementById("hrs").value;
    var mins = document.getElementById("mins").value;
    var meridian = document.getElementById("meridian").value;
    if(hr.length==0 || mins.length==0 || meridian==0){
        alert("bhak bhudhu ");
    }
    else{
        console.log(hr===null);
        console.log(mins);
        console.log(meridian);
        var ctime = hr + " " + ":" + " " + mins;
        let alarmObj = new alarmTimer(id, ctime, meridian);
        parsedAlarms[id] = alarmObj;
        localStorage.setItem("alarms", JSON.stringify(parsedAlarms));
        var li = document.createElement("li");
        var time = document.createTextNode(alarmObj.time + " " + alarmObj.meridian);
        li.appendChild(time);
        li.setAttribute("id", alarmObj.id.toString());
        li.setAttribute("class", "alarm-item");
        var delbtn = document.createElement("button");
        var deleteText = document.createTextNode("Delete");
        delbtn.appendChild(deleteText);
        delbtn.setAttribute("class", "delete");
        li.appendChild(delbtn);
        var ul = document.getElementById("alarm-lists");
        ul.appendChild(li);
        id++;
        var delBtns = document.getElementsByClassName("delete");
        var k;
        for (k = 0; k < delBtns.length; k++) {
            delBtns[k].onclick = deleteTheAlarm;
        }
    }
    
}

document.getElementById("add").onclick = addAlarm;

setInterval(getCurrentTime, 1000);

setInterval(function () {
    var alarms;
    for (alarms = 0; alarms < parsedAlarms.length; alarms++) {
        if (parsedAlarms[alarms] !== null) {
            var ringTime = parsedAlarms[alarms].time + " " + parsedAlarms[alarms].meridian;
            if (ringTime === currTime) {
                x.play();
            }
        }
    }
}, 1000);