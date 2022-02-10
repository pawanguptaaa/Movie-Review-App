const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:250,
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024,
    },
    gender:{
        type:String,
    },
    isAdmin: { type: Boolean, default: false }
});
    module.exports = mongoose.model('User', userSchema);