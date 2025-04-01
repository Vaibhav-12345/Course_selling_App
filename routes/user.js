// const express=require('express');
// const Router=express.Router;
// or 
const {Router} =require('express')

const userRouter=Router()

const {userModel} =require('../db')

userRouter.post('/signup',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

userRouter.post('/signin',(req,res)=>{
    res.json({
        message:'signin endpoints'
    })
})


userRouter.get('/purchases',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

module.exports={
    userRouter:userRouter
}