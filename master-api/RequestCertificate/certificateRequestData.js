const mongoose = require("mongoose");

const certificate_request_schema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  user_email:{
    type: String,
    required: true,
  }
  
});

const certificate_request_details = new mongoose.model("certificate_requests", certificate_request_schema);
module.exports = certificate_request_details;
