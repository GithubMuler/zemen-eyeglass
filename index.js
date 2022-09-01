require('dotenv').config();
const express = require('express')
const expressValidator = require('express-validator');
const https=require("https");
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session =require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const formidableMiddleware = require('express-formidable');
const slug = require('slugify')
//const fileUpload = require("express-fileupload");
const path = require("path");
const connection  = require('./DB/db');
const adminCategory = require('./routes/admin/category.js')
const adminProduct = require('./routes/admin/product.js')
const adminAbout = require('./routes/admin/about.js')
const adminPosts = require('./routes/admin/posts.js')


connection();
const app = express();

app.use(express.static('about_images'))
app.use(express.static('post_images'))
app.use(express.static('product_images'))

// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))

// set global variable
app.locals.errors = null;
// set express-fileuploader middleware
//app.use(fileUpload());
app.set('views', './views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(express.json());
// express session middle ware
app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	//cookie: { secure:true }
}));
// express validator middle ware
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.')
			, root = namespace.shift()
			, formParam = root;
		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	},
	customValidators: {
		isImage: function (value, filename) {
			var extension = (path.extname(filename)).toLowerCase();
			switch (extension) {
				case '.jpg':
					return '.jpg';
				case '.jpeg':
					return '.jpeg';
				case '.png':
					return '.png';
				case '':
					return '.jpg';
				default:
					return false;
			}
		}
	}
}));
//var app = express.Router();

// express validator middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
	app.use((req, res, next) => {
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
});
app.use(passport.initialize());
app.use(passport.session());
const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	googleId: String
}) 
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: "http://localhost:5000/auth/google/secrete",
	userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
function(accessToken, refreshToken, profile, cb){
	User.findOrCreate({googleId: profile.id }, function (err, user){
		return cb(err, user);
	});
}
));
// signup with google
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] })
);
app.get('/auth/google/secrete',
passport.authenticate('google', { failureRedirect: '/login'}), 
 function(req, res){
	res.redirect('/secrete');
 });
// filenames  from router folder
 app.use(require('./routes/about'));
app.use(require('./routes/blog/blogs'));
app.use(require('./routes/cart'));
app.use(require('./routes/contact'));
app.use(require('./routes/products'));
app.use(require('./routes/blog/post'));
app.use(require('./routes/admin/admin'));
app.use('/admin/category', adminCategory);
app.use('/admin/product', adminProduct);
app.use('/admin/about', adminAbout);
app.use('/admin/posts', adminPosts);


app.get('/', (req, res) => {
    return res.render('home')
})
app.get('/login', (req, res) => {
   return res.render('login')
})
app.get('/register', (req, res) => {
   return res.render('register')
})
app.get('/secrete', function(req, res){
	if (req.isAuthenticated()){
		res.render('secrete');
	}else {
		res.redirect('/login');
	}
});
app.get('/logout', function(req, res, next) {
	req.logout(function(err) {
	  if (err) { return next(err); }
	  res.redirect('/');
	});
  });
  //post
app.post("/register", function(req, res){
	User.register({username: req.body.username}, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			res.redirect('/register');
}else {
	passport.authenticate('local')(req, res, function(){
		res.redirect('/secrete');
	} );
}
	});
});
app.post('/login', function(req, res){
	const user = new User({
		username: req.body.username,
		password: req.body.password
	});
	req.login(user, function(err){
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function(){
				res.redirect('/secrete');
			});
		}
	});
});
	// mail chimp start
app.post("/subscribe",function(req,res){
      const Email=req.body.email;
      const data={
         members:[{
               email_address:Email,
               status:"subscribed",
               merge_fields:{}
                 }]};
          const jsonData=JSON.stringify(data);
          const url="https://us12.api.mailchimp.com/3.0/lists/6e49207688";
          const options={
            method:"POST",
            auth: "mulersoft:2d0be77edcf9a28b1f1bc57cc0bba94a-us12"
                        }
      const request= https.request(url,options,function(response){
         if(response.statusCode===200){
         res.render("subscribe/success");
         }
         else{
            res.render("subscribe/failure");
         }
         })
         request.write(jsonData);    
         request.end();
      });
        app.post("/failure",function(req,res){
                     res.redirect("/")
                  }   )
	// mail chimp end

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => console.info(`server has been started successfully on port ${port}`))
