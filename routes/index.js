var title = 'Music App';


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CollaboPlay', user: req.user });
};


/*
 * GET account page.
 */

exports.account = function(req, res){
	res.render('account', { title: title, user: req.user});
};

/*
 * Testing new jade files
 */

exports.addNewProject = function(req, res){
    res.render('addNewProject', { title: title, user: req.user});

}; 
