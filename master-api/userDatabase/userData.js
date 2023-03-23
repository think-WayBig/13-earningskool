const mongoose = require("mongoose");
const moment = require('moment');

const users_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  confirmemail: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true,
  },
  state:{
    type: String
  },
  referredByCode:{
    type: String
  },
  referralCode:{
    type: String,
    unique: true,
  },
  date: {
    type: String,
    default: moment().format('DD-MM-YYYY')
  },
  time: {
    type: String,
    default: moment().format('HH:mm:ss')
  }
  
});


const users_collection = new mongoose.model("users_collection", users_schema);
module.exports = users_collection;
