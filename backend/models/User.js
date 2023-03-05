// User Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // passwordChangedAt:{
    //     type:Date
    // },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next()
    }
    const salt =await bcrypt.genSalt(12)
    this.password= await bcrypt.hash(this.password,salt)
    next()
})


userSchema.methods.comparePassword=async(bodyPwd,dbPwd)=>{
    return await bcrypt.compare(bodyPwd,dbPwd)
   }
   


module.exports = mongoose.model('User', userSchema);
