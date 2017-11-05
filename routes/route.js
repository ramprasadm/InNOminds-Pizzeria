exports.regSuccess = function(req, res){
  res.render('regSuccess.html', { title: 'Login' });
};

exports.authorised = function(req, res){
  res.render('authorised.html', { title: 'Success' });
};

exports.unauthorised = function(req, res){
  res.render('unauthorised.html', { title: 'Failure' });
};
exports.register = function(req, res){
  res.render('index.html', { title: 'Registration' });
};
