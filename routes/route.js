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
  res.render('sample.html', { title: 'Registration' });
};
exports.productsPage = function(req, res){
  res.render('products.html', { title: 'products' });
};

exports.toppingsPage = function(req, res){
  res.render('toppings.html', { title: 'Toppings' });
};


