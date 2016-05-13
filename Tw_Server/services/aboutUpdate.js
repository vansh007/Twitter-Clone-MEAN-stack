// DB: twitter_db
//Collection: user_info
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter_db";

function update_contact_info(msg, callback){
	
	var res = {};
	var phone = msg.phone;
	var address = msg.address;
	var username = msg.username;
	
	mongo.connect(mongoURL, function(){
		
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user_info');
		var JSON_Doc = {"address_info": {"phone": phone, "address": address}};
		
		coll.update({"_id": username}, 
					{ $set: JSON_Doc}, 
					function(err, user){
			
			if (err){
				console.log("Error");
				res.code = "0";
			}
			else if (user) {
				
				console.log("Updated Successfully");
				res.code = "200";
							
			} 			
			callback(null, res);
		});
		
	});

}

function update_work_edu_info(msg, callback){
	
	var res = {};
	var univ_name = msg.univ_name;
	var univ_location = msg.univ_location;
	var company_name = msg.company_name;
	var company_location = msg.company_location;
	var Designation = msg.Designation;
	var username = msg.username;
	
	mongo.connect(mongoURL, function(){
		
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user_info');
		var JSON_Doc = {"work_edu_info": {"univ_name": univ_name, "univ_location": univ_location, "company_name": company_name, 
						"company_location": company_location, "Designation": Designation}};
		
		coll.update({"_id": username}, 
					{ $set: JSON_Doc}, 
					function(err, user){
			
			if (err){
				console.log("Error");
				res.code = "0";
			}
			else if (user) {
				
				console.log("Updated Successfully");
				res.code = "200";
							
			} 			
			callback(null, res);
		});
		
	});

}


function handle_request(msg, callback){
	
	console.log("In ABOUT_UPDATE choose type");
	
	var result = {};
	
	if (msg.about_type == "C"){
		update_contact_info(msg, callback);
	}
	
	else if (msg.about_type == "W"){
		update_work_edu_info(msg, callback);
	}
	
}

exports.handle_request = handle_request;