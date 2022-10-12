import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose
const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
         
    },
    lastName: {
        type: String,
        require: true,
         
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    google: {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
);
//* This is a pre-save hook that will run before the user is saved to the database. It will hash the password before saving it to the database.
userSchema.pre('save', async function (next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("User", userSchema);
