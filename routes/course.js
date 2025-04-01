const {Router} =require('express')

const courseRouter=Router()

courseRouter.post('/purchase',(req,res)=>{
    //you would expect the user to pay 
    res.json({
        message:'signup endpoints'
    })
})

courseRouter.get('/preview',(req,res)=>{
    res.json({
        message:'all course preview endpoint we see here'
    })
})


module.exports={
    courseRouter:courseRouter
}