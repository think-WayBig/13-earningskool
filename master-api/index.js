const express = require("express");
var cors = require("cors");
const bodyparser = require("body-parser");
const port = 3000;
const users_collection = require("./userDatabase/userData");
const courseDetails = require("./CourseDatabase/coursesData");
require("./mongooseConnection");
let path = require('path');

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

  // Find the users who have used the referral code
  const users = await users_collection.find({ referredByCode: referralCode });
  console.log(users);
  // Return the user's details as a response
  res.send({ user, users });
})

app.listen(port, () => {
  console.log(`listening on port ${port} :- http://localhost:${port}`);
});
