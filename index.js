const express=require('express')
const app=express()

app.post('/user/signup',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

app.post('/user/signin',(req,res)=>{
    res.json({
        message:'signin endpoints'
    })
})


app.get('/user/purchases',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

app.post('/course/purchase',(req,res)=>{
    //you would expect the user to pay 
    res.json({
        message:'signup endpoints'
    })
})

app.get('/courses',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

app.listen(3000);