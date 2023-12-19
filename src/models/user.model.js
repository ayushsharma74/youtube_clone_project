import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true //for searching
        },
        email: {
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true //for searching
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type : String
        },
        watchHistory: [
            {
                type : Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required : [true, 'password is required']
        },
        refreshToken: {
            type : String
        }

    },{timestamps: true}
    
)

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,8)
        next()      
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
    return Jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expirersIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return Jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expirersIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User" , userSchema)
