const express = require('express')
const routes = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp',  { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var PC = require("../models/PC");

routes.post('/', (req, res) => {
  
  var new_PC = new PC({
    id: req.body.id,
    brand: req.body.brand,
    cpu: req.body.cpu,
    memory: req.body.memory,
    type: req.body.type,
    vga: req.body.vga,
    score: 0,
    title: req.body.title,
    description: req.body.description
  })

  new_PC.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'PC saved successfully!',
      PC: req.body
    })
  })
})

routes.get('/', (req, res) => {
  PC.find({}, 'id brand cpu memory type vga score title description', function (error, PCs) {
    if (error) { console.error(error); }
    res.send({
      PCs: PCs
    })
  }).sort({_id:-1})
})
// Fetch single post
routes.get('/:id', (req, res) => {

  PC.findById(req.params.id, 'id brand cpu memory type vga score title description', function (error, PCs) {
    if (error) { console.error(error); }
    res.send(PC)
  })
})

// Update a PC

routes.put('/:id', (req, res) => {
 /*mongoose.set('useFindAndModify', false);
  PC.findbyIdAndUpdate(
    { 'title': req.body.title }, 
    { '$set': {'description': req.body.description} },
    {'new': true },
    function(err, PC) {
        if (err) {
          console.log('ERROR WHILE PUT EMAIL');
            throw (err);
        } else {
            console.log('Succes set');
            res.status(200).send(PC)
        }
    }
  );*/
  PC.findById(req.params.id, 'title description', function (error, pc) {
    if (error) { console.error(error); }

    pc.title = req.body.title
    pc.description = req.body.description
    console.log(pc);
    pc.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'PC saved successfully!',
        PC: req.body
      })
    })
  })
})

// Delete a post
routes.delete('/:id', (req, res) => {

  PC.remove({
    _id: req.params.id
  }, function(err, PC){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

module.exports = routes;