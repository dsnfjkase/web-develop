function clock() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ampm;
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    } else {
        ampm = "AM";
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;
    document.getElementById("ampm").innerHTML = ampm;
}
setInterval(function() {clock();}, 1000);