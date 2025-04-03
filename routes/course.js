const { Router } = require("express");

const courseRouter = Router();

const { purachaseModel, courseModel } = require("../db");
const { userMiddelware } = require("../middleware/user");

courseRouter.post("/purchase", userMiddelware, async (req, res) => {
  //you would expect the user to pay you money

  const userId = req.userId;
  const courseId = req.body.courseId;

  console.log(typeof userId)

  //1- put condition like avoid to buy again this course check point condition add so user not buy this course again

  // 2- should check that the user has actually paid the price

  await purachaseModel.create({
    userId,
    courseId
  });

  res.json({
    message: "You have successfuly bought this course",
  });
});

courseRouter.get("/preview", async (req, res) => {
  const course = await courseModel.find({});

  res.json({
    course,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
