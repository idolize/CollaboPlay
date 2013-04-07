var title = 'Music App';



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
 * GET project page.
 */

exports.project = function(req, res){
	res.render('project', { title: title, req: req, user: req.user });
};
