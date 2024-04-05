
import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import expressLayout from 'express-ejs-layouts'
import bodyParser from 'body-parser';
import cookieParser from'cookie-parser'
import session from 'express-session'
import main from './route/main.js';
import admin from './route/admin.js'
import methodOverride from 'method-override';

dotenv.config()




const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));


// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// app.use('/', mainRoute);
app.use('/admin', admin);
app.use('/', main);




// Connecting to mongoDB
const URI = "mongodb+srv://Samuel:Proxynet83@cluster0.kcvkra5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

// Add session middleware
app.use(session({
  secret: 'proxynetgroup',
  resave: false,
  saveUninitialized: true
}));




// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   stores: mongoose.connect({
//     mongoUrl: "mongodb+srv://Samuel:Proxynet83@cluster0.kcvkra5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   }),
//   //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
// }));

function isActiveRoute(route, currentRoute) {
  return route === currentRoute ? 'active' : '';
}

app.isActiveRoute = isActiveRoute; 


const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})