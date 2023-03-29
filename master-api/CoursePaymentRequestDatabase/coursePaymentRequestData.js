const mongoose = require("mongoose");

const course_payment_schema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  txn_id: {
    type: String,
    required: true,
  },
  user_email:{
    type: String,
    required: true,
  }
  
});

const course_payment_details = new mongoose.model("course_payment_requests", course_payment_schema);
module.exports = course_payment_details;
