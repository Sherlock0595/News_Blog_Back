import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    avatarUrl:{
        type: String,
        default: '',
    },

    passwordHash: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    },
)

export default mongoose.model('User', userSchema);


