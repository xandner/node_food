const mongoose = require("mongoose");

const schemaComment = mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  score: { type: Number },
});

const schemaFood = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number },
  price: { type: Number, required: true },
  picture: { type: String },
  comments: [schemaComment],
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  addresse: {
    type: String,
  },
  pic: {
    type: String,
  },
  comments: [schemaComment],
  menu:schemaFood,
  adminUsername:{type:String, required: true},
  adminPassword:{type:String, required: true},
});

const model = mongoose.model("resturants", schema);
module.exports = model;
