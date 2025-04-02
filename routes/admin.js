const { Router } = require("express");

const adminRouter = Router();
const { adminModel } = require("../db");
const {courseModel}= require('../db')
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const{JWT_ADMIN_SECRET}=require('../config')
const {adminMiddelware} =require('../middleware/admin')



adminRouter.post("/signup", async (req, res) => {
// we use zod for input validation
const requestBody = z.object({
  email: z.string().trim().min(3).max(100).email(),
  password: z.string().trim().min(3).max(100),
  firstName: z.string().trim().min(3).max(100),
  lastName: z.string().trim().min(3).max(100),
});

const email = req.body.email;
const password = req.body.password;
const firstName = req.body.firstName;
const lastName = req.body.lastName;

// ye mere ek try catch ke tarah kam karega (zod)
const parseDatawithSuccess = requestBody.safeParse(req.body);

if (!parseDatawithSuccess.success) {
  res.json({
    message: "Invalid Credentaial",
    error: parseDatawithSuccess.error.issues[0].message,
  });
  return;
}

// Pehle check karo ki user exist karta hai ya nahi
const foundUserAdmin = await adminModel.findOne({ email });

if (foundUserAdmin) {
  res.json({
    message: "User already exists in the database",
  });
  return;
}

// bcrypt
const hashPassword = await bcrypt.hash(password, 5);

// Agar user nahi mila toh create karo
await adminModel.create({
  // we use shorthand property my variable name same with object key name so we use short hand property
  email: email,
  password: hashPassword,
  firstName: firstName,
  lastName: lastName,
});

res.json({
  message: "signup successed",
});
});

adminRouter.post("/signin", async(req, res) => {
  // short hand
  const { email, password } = req.body;
  // or
  // const email=req.body.email;
  // const password=req.body.password;

//   ideally password should be hashed, and hence you cant compare the user provided password and the database password 
  const admin = await adminModel.findOne({
    email,
  });

  if (!admin) {
    res.status(403).json({
      message: "Invalid credential",
    });
    return;
  }

  const passwordVerify = await bcrypt.compare(
    password,
    admin.password
  );

  if (passwordVerify) {
    // jwt
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_SECRET
    );
    res.header("token", token);

    //DO cookie logic

    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "signin endpoints you are log  in",
    });
  }
});


// course create by admin(make sure user login )
adminRouter.post("/course", adminMiddelware, async(req, res) => {
  // we get admin id this user is loggin
  const adminId=req.adminId;

  const title=req.body.title;
  const description=req.body.description;
  const imageUrl=req.body.imageUrl;
  const price=req.body.price;


  const course=await courseModel.create({
    title:title,
    description:description,
    price:price,
    imageUrl:imageUrl,
    creatorId:adminId
  })

  res.json({
    message: "Course created",
    courseId:course._id
  });
});
 
adminRouter.put("/course", (req, res) => {
  res.json({
    message: "signup endpoints",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "signup endpoints",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
