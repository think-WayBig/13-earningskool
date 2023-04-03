const mongoose = require("mongoose");

const courses_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  detailed_description: {
    type: String,
    required: true,
  },
  courseContent:[
    { 
        heading :{type: String, required: true},
        videoid :{type: Number, required: true}
    },
    { 
        heading :{type: String, required: true},
        videoid :{type: Number, required: true}
    },
    { 
        heading :{type: String, required: true},
        videoid :{type: Number, required: true}
    }],
    price:{
      type: Number,
    }
  
});

const courseDetails = new mongoose.model("courseDetails", courses_schema);
module.exports = courseDetails;
