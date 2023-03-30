const mongoose = require("mongoose");

const kyc_details_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone:{
    type : String,
    required: true,
  },
  state :{
    type: String,
    required: true,
  },
  city:{
    type : String,
    required : true
  },
  doctype:{
    type : String,
    required : true
  },
  doc_image_front_side :{
    type : String,
  },
  doc_image_back_side :{
    type : String,
  },
  account_name:{
    type: String,
  },
  account_number:{
    type: String,
  },
  bank_name:{
    type: String,
  },
  ifsc_code:{
    type: String,
  },
  bank_statement:{
    type: String,
  },
  paytm_mobno:{
    type: String,
  },
  pan_no:{
    type: String,
  },
  panname:{
    type: String,
  },
  pan_image:{
    type: String,
  }
  
});

const kyc_details = new mongoose.model("kyc_details", kyc_details_schema);
module.exports = kyc_details;
