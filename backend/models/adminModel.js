import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const adminUserSchema = new Schema({
    adminUserName: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1677252438425-e4125f74fbbe?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
}, { timestamps: true })



adminUserSchema.pre('save', async function (next) {
    if(!this.isModified('adminPassword')) return next();
        this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
    
})

// compare function

adminUserSchema.methods.comparePassword = async function (adminPassword) {
    return await bcrypt.compare(adminPassword, this.adminPassword)
}

//JWT token
adminUserSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const adminUserModel = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);

export default adminUserModel;