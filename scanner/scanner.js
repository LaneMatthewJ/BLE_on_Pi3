// code came from https://github.com/sandeepmistry/node-eddystone-beacon-scanner/blob/master/examples/basic.js

function getStudentNumber(beacon) {
 try {
    var obj = JSON.parse(JSON.stringify(beacon, null, 2));

    if (Number(obj.namespace) == 7) {
      return Number(obj.instance);
    }
    // ELSE no worries because not student

  } catch (err) {
    console.log("Beacon object problem?"); 
  }

}


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}



var beaconScanner = require('eddystone-beacon-scanner');

beaconScanner.on('found', function(beacon) {
  // console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));

  var studentNumber = getStudentNumber(beacon)

  if (studentNumber) {
      console.log("Student " + studentNumber + " Found in zone X at time " + getDateTime()); 
  }

});

beaconScanner.on('updated', function(beacon) {
  // console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
  // getStudentNumber(beacon) 

});

beaconScanner.on('lost', function(beacon) {
  // console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));

   var studentNumber = getStudentNumber(beacon)

  if (studentNumber) {
      console.log("Student " + studentNumber + " exited zone X at time " + getDateTime()); 
  }

});


beaconScanner.startScanning(true);
