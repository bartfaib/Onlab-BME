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
  PC.findById(req.params.id, 'brand cpu memory type vga', function (error, pc) {
    if (error) { console.error(error); }
    if(!!req.body.brand)pc.brand =req.body.brand
    if(!!req.body.cpu)pc.cpu = req.body.cpu
    if(!!req.body.memory)pc.memory = req.body.memory
    if(!!req.body.type)pc.type = req.body.type
    if(!!req.body.vga)pc.vga = req.body.vga
    console.log(req.body.brand);
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