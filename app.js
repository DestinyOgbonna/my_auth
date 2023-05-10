const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../my_auth/myroutes/authroutes');
const cookieParser =require('cookie-parser');

const app = express();
//WHAT IS A MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://Destiny:Destan123@authmode.b2fktdj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//Page ROUTES

app.get('/',(req,res)=> res.render('home'));
app.get('/smoothies',(req,res)=> res.render('smoothies'));

//Authentication ROutes
app.use(authRoutes);