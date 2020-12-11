const mongoose = require('mongoose')

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:2
    },
    date:{
        type:String,
        default:(new Date()).toLocaleDateString()
    }
})

module.exports=mongoose.model('User',schema)