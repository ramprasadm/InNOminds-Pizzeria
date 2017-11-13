// bcrypt
//var bcrypt = require("bcrypt");

// body-parser
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

// express
var express = require("express")
const compression = require('compression');
var app = express();
var path = require('path'),

http = require('http'),
routes = require('./routes/route'),

fs = require('fs');

var watson = require('watson-developer-cloud');
var url = require('url');
var BLUEMIX_USERNAME = '95412f49-7457-4e6e-8e80-15bd715e4277';
var BLUEMIX_PASSWORD = '8DQQa1bzvjFt';

/*var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');*/

//var app = express();

var db;

var cloudant;



var dbCredentials = {

    dbName: 'my_cloudant1_db'


};



var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.use(compression());
app.set('port', process.env.PORT || 3010);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api/speech-to-text/', require('./js/lib/stt-token.js'));

//app.use(require('express-spa-router')(app, express.static(path.join(__dirname, '/views/styles/'))));
//app.use('/', express.static(path.join(__dirname, '/views/styles')));
var router = express.Router();
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/js'));
//app.use(express.static(path.join(__dirname, '/css/')));
//app.use('/style', express.static(path.join(__dirname, '/views/style')));*/

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
  }

    cloudant = require('cloudant')(dbCredentials.url);

    // check if DB exists if not create
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {

        	console.log(err);
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
		console.log(res);


    });

    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();


router
.get('/', routes.register);


//app.get('/', routes.index);
// using express for post method

// using express for post method
app.post("/authPage", urlEncodedParser, function(request, response) {
	if(request.url!="/favicon.ico") {
		if(request.body.regOrLogin=="Register") {

var body = request.body;

					var date = new Date();
					var currentDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
			    db.insert({
        username: body.username,
		password:body.pwd,
		dob:body.dob,
		reg_date:currentDate

    },  function(err, doc) {
        if (err) {
            console.log(err);
           return response.sendStatus(500);

        } else {

           console.log("user registered", doc);
		  // response.sendFile( __dirname +"/views/regSuccess.html");
        }
         response.render('regSuccess');
       // response.sendFile(path.join(__dirname, '/views', 'regSuccess.html'));
		//	response.sendFile( __dirname +"/views/regSuccess.html");
        //response.end();

           console.log("user registered");
        }


			//response.sendFile( __dirname +"/views/regSuccess.html");
       // response.end();

    );

		} else if (request.body.regOrLogin=="Login") {
			var  body = request.body;

			console.log(body);

			console.log(body.username+": username");

			db.find({selector:{username:body.username}}, function(er, result) {
				if (er) {
					console.log(er);
                 throw er;
               }
			   else{

				   console.log(result);
				   console.log('Found %d documents with name Alice', result.docs.length);
                   for (var i = 0; i < result.docs.length; i++) {
				   if(result.docs[i].password === body.pwd){
                   console.log('  Doc id: %s', result.docs[i]._id);
				   response.sendFile(path.join(__dirname, '/views', 'authorised.html'));
				   }
				   else{
					   console.log(result);
					    response.sendFile(path.join(__dirname, '/views', 'unauthorised.html'));
				   }}
			   }

});

		}
	}
});

app.post("/goToRegistration", urlEncodedParser, function(request, response) {
     response.render('registration');
});

app.post("/saveRegistration", urlEncodedParser, function(request, response) {
     var body = request.body;
	db.insert({
        username: body.username,
		password:body.pwd,
		lastname:body.lastname,
		dob:body.dob,
		sex:body.sex,
		email:body.email,
		phone:body.phone

    },function(err, doc) {
        if (err) {
            console.log(err);
           return response.sendStatus(500);

        } else {
           console.log("user registered", doc);	  
        }
        response.send({"exist":true});
         console.log("user registered");
        }

    );
});

app.post("/regPreAuth", urlEncodedParser, function(request, response) {
       var  body = request.body;
			
			
			console.log(body.email);

			//console.log(body.username+": username");

			db.find({selector:{email:body.email}}, function(er, result) {
				if (er) {
					console.log(er);
                 throw er;
                }
			   else{
				   		if(result.docs.length){
							response.send({"exist":true});
						}
						else{
							
							response.send({"exist":false});
							
						}
				   
			   }
		});
			
});

app.post("/customerAuthPage", urlEncodedParser, function(request, response) {
     var  body = request.body;
			
			
			console.log(body.username);

			//console.log(body.username+": username");

			db.find({selector:{email:body.username}}, function(er, result) {
				if (er) {
					console.log(er);
                 throw er;
                }
			   else{
				   console.log(result);
				   console.log('Found %d documents with name Alice', result.docs.length);
                     for (var i = 0; i < result.docs.length; i++) {
						if(result.docs[i].password === body.pwd){
							console.log('  Doc id: %s', result.docs[i]._id);
                            //response.render('products');
                            response.send({customerId:result.docs[i]._id,"exist":true});
							
						}
						else{
							console.log(result);
							response.send({"exist":false});
							//response.render('login');
							//response.sendFile(path.join(__dirname, '/views', 'unauthorised.html'));
						}
				   }
			   }
		});
			
});

app.post("/savePizzaSelection", urlEncodedParser, function(request, response) {
     response.render('toppings');
});

app.post("/saveToppings", urlEncodedParser, function(request, response) {
     response.render('reviewOrder');
});

app.post("/modifyOrder", urlEncodedParser, function(request, response) {
     response.render('products');
});

app.post("/customerAuthPageProceedOrder", urlEncodedParser, function(request, response) {
     response.render('billingInformation');
});
app.post("/goToOrders", urlEncodedParser, function(request, response) {
    db.find({selector:{customerId:request.body.customerId,name:"order"}}, function(er, result) {
        if (er) {
            console.log(er);
         throw er;
       }
       try{
            response.render('orders',{orders:result.docs});
        }catch(err){
            console.log("error >>>>",err);
        }
    });
    
});

app.post("/ordersearch", urlEncodedParser, function(request, response) {
    db.find({selector:{name:"order",_id:request.body.orderid}}, function(er, result) {
        if (er) {
            console.log(er);
            throw er;
       }
       try{
            response.render('order',{order:result.docs[0] == undefined ? {} : result.docs[0]});
        }catch(err){
            console.log("error >>>>",err);
        }
    });
});

app.post("/goToContactus", urlEncodedParser, function(request, response) {
    response.render('contactus');
});

app.post("/updateOrder", urlEncodedParser, function(request, response) {
    console.log("update called %s", JSON.stringify(request.body));
    db.find({selector:{_id:request.body.orderId,name:"order"}}, function(er, result) {
        if (er) {
            console.log(er);
         throw er;
       }
       try{
        console.log(JSON.stringify(result.docs[0]));
        result.docs[0].orderStatus = request.body.status;
        db.insert(result.docs[0]);
        }catch(err){
            console.log("error >>>>",err);
        }
    });
    
});

app.post("/goToBilling", urlEncodedParser, function(request, response) {
    db.find({selector:{customerId:request.body.customerId,name:"address"}}, function(er, result) {
        if (er) {
            console.log(er);
         throw er;
       }
       else{
        //response.send(result.docs);
        response.render('billingInformation',{
            id:result.docs[0]._id,
            rev:result.docs[0]._rev,
            address1:result.docs[0].address1,
            address2:result.docs[0].address2,
            state:result.docs[0].state,
            country:result.docs[0].country,
            zip:result.docs[0].zip,
            city:result.docs[0].city,
        });
       }
   
    });
});

app.post("/saveBilling", urlEncodedParser, function (request, response) {
    var body = request.body;
    //console.log("addressid::::::::::::%s,%s",body.address.id,body.address.rev);
    var orderId = ""+ Math.floor(Math.random()*89999+10000);   
    db.insert({
        name: "order",
        customerId: body.customerId,
        selectedPizzas: body.selectedPizzas,
        selectedToppings: body.selectedToppings,
        _id:orderId,
        deliveryDate : body.deliveryDate,
        orderStatus: "Pending Payment"
    },function (err, doc) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);

        } else {
            db.insert({
                name: 'address',
                customerId: body.customerId,
                address1: body.address.address1,
                address2: body.address.address2,
                state: body.address.state,
                country: body.address.country,
                zip: body.address.zip,
                city: body.address.city,
                _id:body.address.id,
                _rev:body.address.rev
            }, function (err, doc) {
                if (err) {
                    console.log(err);
                    return response.sendStatus(500);
        
                } else {
                    response.render('payment',{orderId:orderId}); 
                }
            });
             
        }
    });
});

app.post("/saveOrder", urlEncodedParser, function(request, response) {
     response.render('orderSummary');
});
app.post("/newOrder", urlEncodedParser, function(request, response) {
     response.render('products');
});

app.post("/goToProducts", urlEncodedParser, function(request, response) {
     response.render('products');
});

app.post("/goToLogin", urlEncodedParser, function(request, response) {
     response.render('login');
});

app.get('/api/speak', function(req, res) {
  var query = url.parse(req.url, true).query;

  var text_to_speech = watson.text_to_speech({
    username: BLUEMIX_USERNAME,
    password: BLUEMIX_PASSWORD,
    version: 'v1',
    url: 'https://stream.watsonplatform.net/text-to-speech/api'
  });

  var params = {
    text: query.text,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  text_to_speech.synthesize(params).pipe(res);  
});

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
