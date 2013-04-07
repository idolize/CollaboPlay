var title = 'CollaboPlay';


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
