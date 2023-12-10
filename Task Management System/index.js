const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser=require('cookie-parser')
const ejs = require('ejs');
const app = express();
const path=require("path")

// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Mongos Connected to TaskAPI")
});


// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(cookieParser())
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
