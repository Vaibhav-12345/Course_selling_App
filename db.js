const mongoose=require('mongoose')
console.log('connected to')
mongoose.connect('mongodb+srv://vaibhavmgs99:vaibhav12345@cluster0.gsenu21.mongodb.net/coursera-app')

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;


const UserSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const AdminSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const CourseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
})



const PurchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId,
})

const userModel=mongoose.model('user',UserSchema);
const adminModel=mongoose.model('admin',AdminSchema);
const courseModel=mongoose.model('course',CourseSchema);
const purachaseModel=mongoose.model('purchase',PurchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purachaseModel
}


