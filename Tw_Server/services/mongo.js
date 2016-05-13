var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      callback(db);
    });
};

exports.collection = function(name){
    if (!connected) {
      throw new Error('Connect to Mongo first');
    } 
    return db.collection(name);
  
};