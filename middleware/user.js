const jwt = require("jsonwebtoken");
const  {JWT_USER_SECRET}=require('../config')

function userMiddelware(req,res,next){
   const token=req.headers.token
   const decodeData=jwt.verify(token,JWT_USER_SECRET)

   if(decodeData){
    req.userid=decodeData.id
    next()
   }
   else{
    res.status(403).json({
        message:'your not login / token Invalid'
    })
   }
}

module.exports={
    userMiddelware:userMiddelware
}