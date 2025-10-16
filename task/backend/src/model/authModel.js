import mongoose, { version } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String, required:true
    },
    email:{
        type:String, required:true, unique:true, trim:true
    },
    password:{
        type:String, required:true, trim:true
    },
    role:{
         type: String,
        enum:["student","admin","management"],
        default:"student"
    }
},
{
    versionKey: false,
    timestamps: true
}
);

// hash the password before saving
userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

const user = mongoose.model("user", userSchema)
export default user;

