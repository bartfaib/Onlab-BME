const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const routes = express()
routes.use(morgan('combined'))
routes.use(bodyParser.json())
routes.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users',  { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var user = require("../models/user");

//register user
routes.post('/', (req, res) => {
  var db = req.db;
  
  var new_user = new user({
    username: req.body.username,
    password: req.body.password,
    admin: 0,
  })

  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'user saved successfully!',
      user: req.body
    })
  })
})

// Fetch single user
routes.get('/:id', (req, res) => {
  var db = req.db;
  user.find(req.params.id, 'username password admin', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
})

routes.get('/', (req, res) => {
  user.find({}, 'username password admin', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
})

// Update a user
routes.put('/:id', (req, res) => {
  var db = req.db;
  user.findById(req.params.id, 'username password admin', function (error, user) {
    if (error) { console.error(error); }
    user.username= req.body.username,
    user.password= req.body.password,
    user.admin= 0,
    user.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})


// Delete a post
routes.delete('/:id', (req, res) => {
  var db = req.db;
  user.remove({
    _id: req.params.id
  }, function(err, user){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

module.exports = routes;