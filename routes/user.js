// const express=require('express');
// const Router=express.Router;
// or
const { Router } = require("express");
const userRouter = Router();

const { userModel, purachaseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  {JWT_USER_SECRET}=require('../config')
const {userMiddelware}=require('../middleware/user')

userRouter.post("/signup", async (req, res) => {
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
  const foundUser = await userModel.findOne({ email });

  if (foundUser) {
    res.json({
      message: "User already exists in the database",
    });
    return;
  }

  // bcrypt
  const hashPassword = await bcrypt.hash(password, 5);

  // Agar user nahi mila toh create karo
  await userModel.create({
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

userRouter.post("/signin", async (req, res) => {
  // short hand
  const { email, password } = req.body;
  // or
  // const email=req.body.email;
  // const password=req.body.password;

//   ideally password should be hashed, and hence you cant compare the user provided password and the database password 
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(403).json({
      message: "Invalid credential",
    });
    return;
  }

  const passwordVerify = await bcrypt.compare(
    password,
    user.password
  );

  if (passwordVerify) {
    // jwt
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER_SECRET
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

userRouter.get("/purchases",userMiddelware,async (req, res) => {

  const userId=req.userId;

  // put condition like avoid to buy again this course check point condition add so user not buy this course again

  const purchase=await purachaseModel.findOne({
    userId,
  })

  res.json({
    message: "users purchase only course",
    purchase
  });
});

module.exports = {
  userRouter: userRouter,
};
