require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')

const app = express()
console.log(process.env.API_KEY)
const port = 5000

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/GLASS", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
	F_name: String,
	P_number: String,
	Address: String,
	Email: String,
	Password: String,
	C_password: String
}) 
userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ['Password','C_password']})
const User = new mongoose.model("User", userSchema)


app.get('/', (req, res) => {
    return res.render('home')
})
app.get('/about', (req, res) => {
   return res.render('about')
})
app.get('/blogs', (req, res) => {
  return res.render('blogs')
})
app.get('/cart', (req, res) => {
  return res.render('cart')
})
app.get('/contact', (req, res) => {
   return res.render('contact')
})
app.get('/login', (req, res) => {
   return res.render('login')
})
app.get('/products', (req, res) => {
   return res.render('products')
})
app.get('/register', (req, res) => {
   return res.render('register')
})

app.post("/register", function(req, res){
	const newUser = new User({
		
		F_name: req.body.full_name,
		P_number: req.body.phone_number,
		Address: req.body.address,
		Email: req.body.email,
		Password: req.body.password,
		C_password: req.body.confirm_password
	});

newUser.save(function(err){
	if (err) {
		console.log(err)
	}else {
		 res.render('login');
	}
});
});

app.post('/login', function(req, res){
	const user_name =req.body.email;
	const pass_word =req.body.password;
	User.findOne({Email:user_name}, function(err, foundUser){
		if(err){
			console.log(err);
			} else {
				if(foundUser){ 
				if (foundUser.Password ===pass_word){
					res.render('secrete');
				}
			}
			}
		});
	});




app.listen(port, () => console.info(`App listening on port ${port}`))