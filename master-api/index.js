const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("./mongooseConnection");
var cors = require("cors");
const bodyparser = require("body-parser");
const port = 3000;
const users_collection = require("./userDatabase/userData");
const courseDetails = require("./CourseDatabase/coursesData");
const course_payment_details = require("./CoursePaymentRequestDatabase/coursePaymentRequestData");
const certificate_request_details = require("./RequestCertificate/certificateRequestData");
require("./mongooseConnection");
let path = require('path');
const kyc_details = require("./KYC_Details/kycDetails");
const { resetTodayEarningsJob, resetWeeklyEarningsJob, resetMonthlyEarningsJob, resetYearlyEarningsJob } = require('./cron');

resetTodayEarningsJob.start();
resetWeeklyEarningsJob.start();
resetMonthlyEarningsJob.start();
resetYearlyEarningsJob.start();


const app = express();

app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/register", (req, res) => {
  res.send("Welcome");
});

app.get("/payment_request", async (req, res) => {
  // let req_userData = new users_collection(req.body)
    const req_course_payment_data = await course_payment_details.find({});
    console.log(req_course_payment_data);
    res.send(req_course_payment_data);
     
});

app.get("/certificate_request", async (req, res) => {
  // let req_userData = new users_collection(req.body)
    const req_course_payment_data = await certificate_request_details.find({});
    console.log(req_course_payment_data);
    res.send(req_course_payment_data);
     
});

app.get('/modules/:_id', async (req, res) => {
  const module = await db.collection('module_1').findOne({_id: ObjectId(req.params._id)});
  console.log(module)
  if (!module) {
    return res.status(404).send('Module not found');
  }
  res.send(module);
});

app.get("/users", (req, res) => {
  users_collection.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);
    }
  })
});

app.get('/:referralCode', async (req, res) => {
  const referral = await users_collection.findOne({ referralCode: req.params.referralCode });
  if (!referral) {
    return res.status(404).send({ message: 'Invalid referral code' });
  }
  res.send(referral);
});



app.post("/register", async (req, res) => {
  // let req_userData = new users_collection(req.body);
  try {
    const req_userData = new users_collection(req.body);

    const existingUserEmail = await users_collection.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(409).send({ message: 'Email already exists.' });
    };
    const existingUserPhoneNumber = await users_collection.findOne({ phone: req.body.phone });
    if (existingUserPhoneNumber) {
      return res.status(409).send({ message: 'Phone number already exists.' });
    };
    // const referral = await users_collection.findOne({ referralCode: req.params.referralCode });
    // if (!referral) {
    //   return res.status(404).send({message:'Invalid referral code'});
    // }

    await req_userData.save();
    res.status(202).send({
      "message": "success",
    });


  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.put('/dpChange', (req, res) => {
  let userEmail = req.body.email;
  users_collection.findOneAndUpdate({ email: userEmail }, { dp: req.body.dp }, null, (err, data) => {
    res.send({
      "NewUrl": req.body.dp
    })
  });
})

app.post("/login", async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.pass;
  console.log(userEmail);
  let req_userData = await users_collection.findOne({ email: userEmail });

  if (req_userData != null) {
    if (req_userData.pass === userPassword) {
      res.send({
        message: true,
        referralCode: req_userData.referralCode
      });

    } else {

      res.send({
        message: false,
      });
    }
  } else {
    res.send({
      message: "invalid",
    });
  }
  // console.log(req_userData);

});

app.get('/getUser/:userEmail', async (req, res) => {
  let req_userData = await users_collection.findOne({ email: req.params.userEmail });

  res.send({
    message: req_userData
  })
});

app.get("/", (req, res) => {
  courseDetails.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);
    }
  })
});


// app.get("/topic/:id",(req, res) => {
//   console.log(req.params.id);
//   courseDetails.findById(req.params.id).then((data)=>{
//     res.status(200).send(data);
//   }).catch((err)=>{
//     res.status(500).send(err);
//   })
// })

app.post("/courses", async (req, res) => {
  let req_userData = new courseDetails(req.body);
  try {
    await req_userData.save();
    res.status(202).send({
      "message": "success",
    });
  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.get('/courseDetail/:course', async (req, res) => {
  const { course } = req.params.course;

  const id = await courseDetails.findById(req.params.course);
  res.send(id);
});

app.post('/affiliate', async (req, res) => {
  const { email, referralCode } = req.body;
  
  // Find the user with the matching email address
  const user = await users_collection.findOne({ email });
  
  if (!user) {
    // Handle user not found
    return res.status(404).send('User not found');
  }

  // // Find the users who have used the referral code
  // const users = await users_collection.find({ referredByCode: referralCode });

  // Find the user who referred the current user
  const referrer = await users_collection.findOne({referralCode: user.referredByCode});

  console.log(referrer);
  // Return the user's details as a response
  res.send({ user, referrer});
})

app.post('/user_leads', async (req, res) => {
  const { referralCode } = req.body;
  
  // Find the users who have used the referral code
  const users = await users_collection.find({ referredByCode: referralCode, myCourses: { $elemMatch: { course_id: { $exists: true } } } });

  // Return the user's details as a response
  res.send({ users});
})

app.put('/userDetails/:email', async (req, res) => {
  let userEmail = req.body.email;
  let state = req.body.state;
  let gender = req.body.gender;
  let dob = req.body.dob
  let city = req.body.city;
  let pincode = req.body.pincode;
  let address = req.body.address;

  try{
    let result = await users_collection.findOneAndUpdate({ email: userEmail }, {state:state,gender:gender,dob:dob,city:city,pincode:pincode,address:address}, { returnOriginal: false, upsert: true });
    
    console.log("User details updated successfully")

        if (!userEmail) {
          console.log("User not found");
          return res.status(404).send('User not found');
        }
    return res.send({"message":'success'});
  }
  catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

app.put('/changePassword/:email', async (req, res) => {
  let userEmail = req.body.email;
  let { oldPassword, newPassword, repeatNewPassword } = req.body;

  try {
    // Find user by email
    const user = await users_collection.findOne({ email : userEmail });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if old password matches
    if (user.pass !== oldPassword) {
      return res.status(401).send({'message':'Invalid old password'});
    }

    if (repeatNewPassword !== newPassword) {
      return res.status(401).send({'message':'Passwords do not match'});
    }

    // Update password
    const result = await users_collection.findOneAndUpdate({ email : userEmail }, { pass: newPassword }, { new: true });

    console.log('Password updated successfully');
    console.log(result);

    return res.send({'message':'Password updated successfully'});
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

app.post("/payment_request", async (req, res) => {
  // let req_userData = new users_collection(req.body);

  try {
    const req_course_payment_data = new course_payment_details(req.body);
    await req_course_payment_data.save();
    res.status(202).send({
      "message": "success",
    });


  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.post("/certificate_request", async (req, res) => {
  // let req_userData = new users_collection(req.body);

  try {
    const req_course_payment_data = new certificate_request_details(req.body);
    await req_course_payment_data.save();
    res.status(202).send({
      "message": "success",
    });


  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.post("/kyc_details", async (req, res) => {
  // let req_userData = new users_collection(req.body);

  try {
    const req_course_payment_data = new kyc_details(req.body);
    await req_course_payment_data.save();
    res.status(202).send({
      "message": "success",
    });


  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.put("/approvedCourse/:email", async (req, res) => {
  // let req_userData = new users_collection(req.body);
  let userEmail = req.body.email;
  let mycourses = req.body.course_id;
  let amount_paid = req.body.amount_paid;
  console.log(userEmail);
  console.log(mycourses);

  try {
    
    let req_course_payment_data = await users_collection.findOneAndUpdate({email : userEmail} ,{ $addToSet: {myCourses:{course_id: mycourses, certificate: false, amount_paid: amount_paid}} } ,{ returnOriginal: false, upsert: true });
    console.log(req_course_payment_data);

    let user = await users_collection.findOne({ email: userEmail });
    // retrieve course package of purchased course
    let purchasedCourse = await courseDetails.findOne({ _id: mycourses });
    console.log(purchasedCourse);

    // if (user.referredByCode) {
    //   let commissionPercentage = 0;
    //   if (purchasedCourse.title == "Silver Package") {
    //     commissionPercentage = 0.7;
    //   } else if (purchasedCourse.title == "Gold Package") {
    //     commissionPercentage = 0.85;
    //   } else if (purchasedCourse.title == "Diamond Package") {
    //     commissionPercentage = 0.9;
    //   }
    //   console.log(commissionPercentage);

    //   let courseDetails = user.myCourses.find((course) => course.course_id === mycourses);
    //   console.log(courseDetails.amount_paid);

    //   let commissionAmount = Math.round(courseDetails.amount_paid * commissionPercentage);
    //   console.log(commissionAmount);

      
    //   let referredByCodeUser = await users_collection.findOneAndUpdate(
    //     { referralCode: user.referredByCode },
    //     { $inc: {total_income: commissionAmount, today_earnings: commissionAmount, weekly_earnings : commissionAmount, monthly_earnings : commissionAmount, yearly_earnings : commissionAmount}, $addToSet: { earnings:{user_email: userEmail, commission_amount: commissionAmount} } },
    //     { returnOriginal: false, upsert: true }
    //   );
    //   console.log(referredByCodeUser);
    // }
    if (user.referredByCode) {
      let commissionPercentage = 0;
      let referredByUser = await users_collection.findOne({ referralCode: user.referredByCode });
      let referredByUserCourse = referredByUser.myCourses.find(course => course.course_id === "6426cede12f49a9c236dbc5c" || course.course_id === "6426ced612f49a9c236dbc5b" || course.course_id === "6426cea812f49a9c236dbc5a");
      if (referredByUserCourse) {
        let course = await courseDetails.findOne({ _id: referredByUserCourse.course_id });
        switch (course.title) {
          case "Silver Package":
            commissionPercentage = 0.7;
            break;
          case "Gold Package":
            commissionPercentage = 0.85;
            break;
          case "Diamond Package":
            commissionPercentage = 0.9;
            break;
          default:
            commissionPercentage = 0.7;
        }
        console.log(commissionPercentage);
    
        let courseDetail = user.myCourses.find((course) => course.course_id === mycourses);
        console.log(courseDetail.amount_paid);
    
        let commissionAmount = Math.round(courseDetail.amount_paid * commissionPercentage);
        console.log(commissionAmount);
    
        let referredByCodeUser = await users_collection.findOneAndUpdate(
          { referralCode: user.referredByCode },
          { $inc: {total_income: commissionAmount, today_earnings: commissionAmount, weekly_earnings : commissionAmount, monthly_earnings : commissionAmount, yearly_earnings : commissionAmount}, $addToSet: { earnings:{user_email: userEmail, commission_amount: commissionAmount} } },
          { returnOriginal: false, upsert: true }
        );
        console.log(referredByCodeUser);
      }
    }
    
    res.status(202).send({
      "message": "success",
    });

  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.delete('/payment_request/:id/:courseId/:transactionId', async (req, res) => {
  try {
    const result = await course_payment_details.findOneAndDelete({
      course_id: req.body.course_id,
      email: req.body.email,
      txn_id: req.body.txn_id
    });
    if (!result) {
      return res.status(404).send('Data not found');
    }
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.put("/certificateSend/:email", async (req, res) => {
  // let req_userData = new users_collection(req.body);
  let userEmail = req.body.email;
  let mycourseid = req.body.course_id;
  console.log(userEmail);
  console.log(mycourseid);

  try {
    let req_course_payment_data = await users_collection.findOneAndUpdate({email : userEmail, "myCourses.course_id": mycourseid } ,{  $set: { "myCourses.$.certificate": true } } ,{ returnOriginal: false, upsert: true });
    console.log(req_course_payment_data);
    res.status(202).send({
      "message": "success",
    });

  } catch (err) {
    res.send({
      "error": err,
      "message": "invalid"
    });
  }
});

app.delete('/certificate_request/:courseId/:email', async (req, res) => {
  try {
    const result = await certificate_request_details.findOneAndDelete({
      course_id: req.body.course_id,
      email: req.body.email,
    });
    if (!result) {
      return res.status(404).send('Data not found');
    }
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port} :- http://localhost:${port}`);
});
