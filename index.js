const express = require("express");
// adding the db so wait the connect the mongodb
const mongoose =require('mongoose');


// Routing in express, the express Router
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin");;
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    console.log('connected to')
    await mongoose.connect('mongodb+srv://vaibhavmgs99:vaibhav12345@cluster0.gsenu21.mongodb.net/coursera-app')
    app.listen(3000);
    console.log('listing on port on 3000')
}
main()