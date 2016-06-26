//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://134.124.248.19:27017/studentDB';



var findStudents = function(db, callback) {
   var cursor =db.collection('students').find( );
   cursor.each(function(err, doc) {
      if (doc != null) {
         console.log(doc);
      } else {
         callback();
      }
   });
};

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    // var collection = db.find('students');
    
    findStudents(db, function() {
        db.close();
    });

  }
});