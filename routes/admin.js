const {Router} =require('express')

const adminRouter=Router()

adminRouter.post('/signup',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

adminRouter.post('/signin',(req,res)=>{
    res.json({
        message:'signin endpoints'
    })
})

// course create by admin 
adminRouter.post('/course',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})

adminRouter.put('/course',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})


adminRouter.get('/course/bulk',(req,res)=>{
    res.json({
        message:'signup endpoints'
    })
})


module.exports={
    adminRouter:adminRouter
}