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
  dp:{
    type: String,
    default: "./Biz/img/pic.png",
  },
  gender:{
    type: String,
  },
  dob:{
    type: String,
  },
  city:{
    type: String,
  },
  pincode:{
    type: Number,
  },
  address:{
    type: String,
  },
  date: {
    type: String,
    default: moment().format('DD-MM-YYYY')
  },
  time: {
    type: String,
    default: moment().format('HH:mm:ss')
  },
  myCourses:[
    { 
        course_id :{type: String, required: true},
        amount_paid:{type: Number, required: true},
        certificate : {type: Boolean, default: false},
    }],
  total_income:{
    type: Number,
    default: 0
  }, 
  earnings:[
    {
      user_email :{type: String, required: true},
      commission_amount :{type: Number, required: true},
      date : {type: String , default:moment().format('MMM DD YYYY')},
      time : {type: String , default:moment().format('HH:mm:ss')},
    }
  ],
  today_earnings:{
    type: Number,
    default:0
  },
  weekly_earnings: {
    type: Number,
    default: 0
  },
  monthly_earnings: {
    type: Number,
    default: 0
  },
  yearly_earnings:{
    type: Number,
    default:0
  },

});

const users_collection = new mongoose.model("users_collection", users_schema);
module.exports = users_collection;