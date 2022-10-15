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
    //* knowledges and skills for helping the refugee 
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    }],
    date_of_birth: {
        type: Date,
    },
    password: {
        type: String,
        required: true
    },
    smsVerificationCode: {
        type: Number,
        require: true,
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    //* availability for helping the refugee
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    google: {
        id: {
            type: String,
        },
        displayName: {
            type: String,
        },
        name: {
            type: Object,
        },
        emails: {
            type: Array,
        },
        photos: {
            type: Array,
        },
    },
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
