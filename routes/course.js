const {Router} =require('express')

const courseRouter=Router()

courseRouter.post('/course/purchase',(req,res)=>{
    //you would expect the user to pay 
    res.json({
        message:'signup endpoints'
    })
})

courseRouter.get('/courses',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})


module.exports={
    courseRouter:courseRouter
}