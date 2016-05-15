exports.index = function(req, res){
  console.log("Inside INDEX function");
  res.render('index');
};


function home(req, res){
	
	console.log("Inside HOME function..");
	
	if (req.session.username){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("home");
	}
	else{
		res.redirect('/');
	}
	
}

function about(req, res){
	
	console.log("Inside ABOUT function..");
	
	if (req.session.username){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("about");
	}
	else{
		res.redirect('/');
	}
	
}


function workEduInfo(req, res){
	
	console.log("Inside WORK_EDU_INFO function..");
	
	if (req.session.username){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("workEdu");
	}
	else{
		res.redirect('/');
	}
	
}




function followers(req, res){
	
	console.log("Insid followers function..");
	
	if (req.session.username){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("friends");
	}
	else{
		res.redirect('/');
	}
	
}


function contactInfo(req, res){
	
	console.log("Inside CONTACTINFO function..");
	
	if (req.session.username){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("contactInfo");
	}
	else{
		res.redirect('/');
	}
	
}

exports.logout = function(req,res)
{
	console.log("Inside LOGOUT function...");
	req.session.destroy();
	res.end();
};


exports.home=home;
exports.about=about;
exports.contactInfo=contactInfo;
exports.workEduInfo=workEduInfo;
exports.followers=followers;
