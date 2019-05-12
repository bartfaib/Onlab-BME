var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PCSchema = new Schema({
  id: Number,
  brand: String,
  cpu: String,
  memory: Number,
  type: String,
  vga: String,
  score: Number,
  title: String,
  description: String
});

var PC = mongoose.model("PC", PCSchema);
module.exports = PC;