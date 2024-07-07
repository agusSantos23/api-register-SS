import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true,"Username is required"],
        trim: true,
        uppercase: true,
        minlength: 3
    },
    email:{
        type: String,
        require: [true,"Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password:{ 
        type: String,
        require: [true,"Password is required"]
    }
},{
    timestamps: true
})


userSchema.pre('save', async function (next){

    if(!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)

        this.password = bcrypt.hash(this.password,salt)
        
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(`Error comparing passwords: ${error}`);
    }
  };
export default mongoose.model("User", userSchema)