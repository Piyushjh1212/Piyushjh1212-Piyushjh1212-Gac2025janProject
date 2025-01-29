import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already taken']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    city: {
        type: String,
        required: [true, 'city should be required']
    },
    country: {
        type: String,
        required: [true, 'Contry should be required']
    },
    phone: {
        type: String,
        required: [true, 'phone should be required']
    },
    profilePic: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    }
}, { timestamps: true });

// hashpassword function

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
    
})

// compare function

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}

//JWT token
userSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}
const userModel = mongoose.model('User', userSchema);

export default userModel;