const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
 
    //0pour user 1 pour vendeur
    role: {
        type: Number,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    } ],
        
      followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    } ],
    userPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    } ],
     profilPic: {
        type: String,
        default:null
    },
    
}, { timestamps: true }
)
const User = mongoose.model('User', UserSchema)
module.exports = User;