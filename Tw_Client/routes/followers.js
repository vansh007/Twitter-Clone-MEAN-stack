var mq_client = require('../rpc/client');

function follower_operations(req, res)
{
	
	console.log("In followers function");
	
	var type = req.param("type");
	var username = req.session.username;
	var msg_payload = {};
	
	if (req.param("type") === "S"){ // S --> Search User
		var searchName = req.param("name");
		msg_payload = { "username": username, "searchName": searchName, "type": type};
		console.log("User Found");
	}
	
	else if (req.param("type") === "P"){ // Follow the user 
		var destination = req.param("destination");
		msg_payload = { "username": username, "destination": destination, "type": type};
	}
	
	
	else if (req.param("type") === "SF"){ // SF - Show followers
		msg_payload = { "username": username, "type": type};
	}
	else if (req.param("type") === "SF1"){ // SF1 - Show following
		msg_payload = { "username": username, "type": type};
	}
	
	mq_client.make_request('follower_queue',msg_payload, function(err,results){
		
		console.log(results);
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Followers Operation performed successfully");
				res.end(JSON.stringify(results));
			}
			else if (results.code == 0){    
				
				console.log("Failed in performing Followers operation");
				res.end();
			}
		}  
	});
}


exports.follower_operations=follower_operations;