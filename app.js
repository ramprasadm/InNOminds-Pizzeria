// bcrypt
//var bcrypt = require("bcrypt");

// body-parser
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

// express
var express = require("express");
var app = express();
var path = require('path'),
http = require('http')
    fs = require('fs');

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
    dbName: 'my_sample_db'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
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
//app.use(express.static(path.join(__dirname, 'public')));
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
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });

    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();
app.get('/', function(req, res){
    res.render('index.html');
});
//app.get('/', routes.index);

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
           console.log("user registered");
        }

        response.sendFile(path.join(__dirname, '/views', 'regSuccess.html'));
			//response.sendFile( __dirname +"/views/regSuccess.html");
        response.end();
    });
			
		} else if (request.body.regOrLogin=="Login") {
			var  body = request.body;
			console.log(body.username+": username");

			db.find({selector:{username:body.username}}, function(er, result) {
  if (er) {
    throw er;
  }

  console.log('Found %d documents with name Alice', result.docs.length);
  for (var i = 0; i < result.docs.length; i++) {
    console.log('  Doc id: %s', result.docs[i]._id);
  }
});
			
		}
	}
});

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
