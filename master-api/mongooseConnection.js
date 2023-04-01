const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://muskan:muskan@express-api-practice.9w7ohwg.mongodb.net/Express-API-Practice?retryWrites=true&w=majority').then(()=> console.log("success")).catch((e)=>{console.log(e)});

module.exports = mongoose.connection;