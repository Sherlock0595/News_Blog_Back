import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        default: ''
    },

    tags: {
        type: Array,
        default: [],
    },

    passwordHash: {
        type: String,
        // default: true,
        // required: true,
    },

    viewsCount: {
        type: Number,
        default: 0,
    },

    commentsCount: {
        type: Number,
        default: 0,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    avatarUrl: String,
},
    {
        timestamps: true,
    },
)

export default mongoose.model('Post', postSchema);


