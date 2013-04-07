var title = 'CollaboPlay';
fs = require('fs');


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: title, user: req.user });
};


/*
 * GET account page.
 */

exports.account = function(req, res){
	res.render('account', { title: title, user: req.user });
};


/*
 * GET file upload page.
 */

exports.fileupload = function(req, res){
	res.render('fileupload', { title: title, user: req.user });
};

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
