
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter_db";
function get_overview(msg, callback){

	mongo.connect(mongoURL, function(){
		
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('user_info');
	var username = msg.username; 
	var res = {};
	
	coll.findOne({"_id": username}, function(err, user){
			
		if (err){
			res.code = "0";
		}
		else if (user) {
			res.code = "200";
			res.data = user;
		} 			
		callback(null, res);
	});
		
});

}



function handle_request(msg, callback){
	
	console.log("In handle request of ABOUT_GET");
	
	console.log("Get Type: " + msg.infoType);
	if (msg.infoType == "O"){ // O --> Overview
		//similar to feedOps
		get_overview(msg, callback);
	}
	
}

exports.handle_request = handle_request;