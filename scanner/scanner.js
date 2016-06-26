// code came from https://github.com/sandeepmistry/node-eddystone-beacon-scanner/blob/master/examples/basic.js

var zone = "X";  // or zone Y depending ( this is the only change the pi needs to make for its location)



var mongoose = require('mongoose'); 
var Student = mongoose.model('Student', {id: Number, name: String, path: String, age: Number, learningStyle: String, comments: String});


// filter beacons and parse the data
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


// get the time
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


// log the path taken by the students into the database: 
function logPath(studentNumber, studentPath){

        mongoose.connect('mongodb://134.124.248.19/studentDB'); 

        /**
         * Lets define our Model for User entity. This model represents a collection in the database.
         * We define the possible schema of User document and data types of each field.
         * */

        var s = new Student(); 

        //Lets try to Find a user
        Student.findOne({id: studentNumber}, function (err, studentObj) {
          if (err) {
            console.log(err);
          } else if (studentObj) {
            console.log('Found:', studentObj);

            //For demo purposes lets update the user on condition.
              //Some demo manipulation
              studentObj.path += studentPath;

              //Lets save it
              studentObj.save(function (err) {
                if (err) {
                  console.log("ERROR:: " + err);

                } else {

                  console.log('Updated', studentObj);
                  mongoose.disconnect(); 

                }
              });
          } else {
            console.log('User not found!');
          }
        });
}



var beaconScanner = require('eddystone-beacon-scanner');

beaconScanner.on('found', function(beacon) {
  // console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));

  var studentNumber = getStudentNumber(beacon)

  if (studentNumber) {
      // console.log("Student " + studentNumber + " Found in zone X at time " + getDateTime()); 
      
      var studPath = "Entered zone "+ zone +" at time " + getDateTime() + "\n" ; 
     logPath (studentNumber, studPath); 

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
      // console.log("Student " + studentNumber + " Found in zone X at time " + getDateTime()); 
     
     var studPath = "Exited zone "+ zone +" at time " + getDateTime() + "\n" ; 
     logPath (studentNumber, studPath); 

  }

});


beaconScanner.startScanning(true);
