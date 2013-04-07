var title = 'CollaboPlay';
fs = require('fs');


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: title, user: req.user });
};

exports.users = function(req, res){
  res.render('users', { title: title, user: req.user });
};
exports.users = function(req, res){
  res.render('project_list', { title: title, user: req.user });
};


/*
 * GET account page.
 */

exports.account = function(req, res){
	res.render('account', { title: title, user: req.user });
};


/*
 * GET project page.
 */

exports.project = function(req, res){
	res.render('project', { title: title, req: req, user: req.user });
};

/*
 * GET file upload page.
 */
exports.fileupload = function(req, res){
	res.render('fileupload', { title: title, user: req.user });
};

exports.new_project = function(req, res){
	res.render('new_project', {title:title, user: req.user })
}

/*
 * POST of uploaded file
 */
 exports.upload = function(req, res){
 	fs.readFile(req.files.audioFile.path, function (err, data) {
 		var newPath = __dirname + '/../uploads/'+ req.files.audioFile.name;
 		console.log(__dirname + '/../uploads/'+ req.files.audioFile.name);
 		fs.writeFile(newPath, data, function (err) {
 			res.redirect('back');
 		});
 	});
 }

/*
 * POST of uploaded file
 */
 exports.new_projectPOST = function(req, res){
 	var params = {
 		"title": req.param("title"),
 		"userId": req.user.id,
 		"description": req.param('description')
 	}
 	addProject(params);
 	res.redirect('/');
 }

