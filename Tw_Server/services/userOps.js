
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter_db";


function search_user(msg, callback){
	
	var res = {};
	var searchName = msg.searchName;
	var username = msg.username;
	
	mongo.connect(mongoURL, function(){
		
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user_info');
				
		coll.findOne({"first_name": searchName}, {"_id":1, "first_name": 1, "last_name": 1}, function(err, user){ 
			
			if (err){
				console.log("Error");
				res.code = "0";
			}
			else if (user) {
				
				var coll = mongo.collection('tweethandle');
				var JSON_Obj = {"source_id": username, "destination_id": user._id};
				
				coll.findOne(JSON_Obj, function(err, user1){
					
					if (err){
						res.code = "0";
					}
					else {						
						res.code = "200";
						res.data = user;
						res.data1 = user1;
					}
					callback(null, res);
				});
			}
			
		});
		
	});

}


function follow_user(msg, callback){

	var res = {};
	var destination = msg.destination;
	var username = msg.username;
	var JSON_Obj = {};
	
	mongo.connect(mongoURL, function(){
		
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('tweethandle');
		JSON_Obj = {"source_id": username, "destination_id": destination, "status": "A"};
		
		coll.insert(JSON_Obj, function(err, user){
			
			if (err){
				
				res.code = "0";
			}
			else if (user) {
					coll = mongo.collection('user');
				JSON_Obj = {"source_id": destination, "destination_id": username, "status": "A"};
				
				coll.insert(JSON_Obj, function(err, user1){ 
					
					if (err){
				
						res.code = "0";
					}
					else {						
				
						res.code = "200";
						res.data = user;
						res.data1 = user1;
					}
					callback(null, res);
				});
			}
			
		});
		
	});

}



function show_my_followers(msg, callback){

	var res = {}, i;
	var username = msg.username;
	var dest_email = [], dest_names = [];
	
	mongo.connect(mongoURL, function(){
		
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('tweethandle');
				
		coll.find({"source_id": username, "status": "A"}, {"destination_id": true}).toArray(function(err, user){ 
			
			if (err){
			
				res.code = "0";
			}
			else if (user) {
				
				for (i=0; i < user.length; i++){
					dest_email.push(user[i].destination_id);
				}
				
				coll = mongo.collection('user_info');
				
				coll.find({"_id": {$in: dest_email}}, {"first_name": true, "last_name": true, "_id": false}).toArray(function(err, user1){
				
					if (err){
						console.log("Error fetching Name details of my followers");
						res.code = "0";
					}
					else {	
						res.code = "200";
						
						for (i=0; i < user1.length; i++){
							dest_names.push(user1[i].first_name + " " + user1[i].last_name);
						}
						res.data = dest_names; 
						callback(null, res);
					}
				});
			}
			
		});
		
	});

}




function handle_request(msg, callback){
	
	console.log("In handle request of userOps");
	
	if (msg.type == "S"){ 
		search_user(msg, callback);
	}
	
	if (msg.type == "P"){ 
		follow_user(msg, callback);
	}
	
	if (msg.type == "SF"){ 
		show_my_followers(msg, callback);
	}
}

exports.handle_request = handle_request;